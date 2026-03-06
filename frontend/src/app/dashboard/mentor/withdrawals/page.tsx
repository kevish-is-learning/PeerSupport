'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { mentorService } from '@/services/mentor.service';
import { Withdrawal, WithdrawalStatus, DashboardStats } from '@/types';

export default function MentorWithdrawalsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: '',
    bankDetails: {
      accountNumber: '',
      ifscCode: '',
      accountHolderName: '',
      bankName: '',
    },
    upiId: '',
    paymentMethod: 'bank' as 'bank' | 'upi',
  });

  const MIN_WITHDRAWAL = 500;

  useEffect(() => {
    if (user?.role !== 'MENTOR') {
      router.push('/dashboard');
      return;
    }
    loadData();
  }, [user, router]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [withdrawalsRes, statsRes] = await Promise.all([
        mentorService.getWithdrawals(),
        mentorService.getDashboardStats(),
      ]);
      setWithdrawals(withdrawalsRes.data?.withdrawals || []);
      setStats(statsRes.data || null);
    } catch (error: any) {
      console.error('Error loading withdrawals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestWithdrawal = async () => {
    const amount = parseFloat(withdrawalForm.amount);
    
    if (!amount || amount < MIN_WITHDRAWAL) {
      setMessage({ type: 'error', text: `Minimum withdrawal amount is ₹${MIN_WITHDRAWAL}` });
      return;
    }

    if (amount > (stats?.availableBalance || 0)) {
      setMessage({ type: 'error', text: 'Insufficient balance' });
      return;
    }

    if (withdrawalForm.paymentMethod === 'bank') {
      const { accountNumber, ifscCode, accountHolderName, bankName } = withdrawalForm.bankDetails;
      if (!accountNumber || !ifscCode || !accountHolderName || !bankName) {
        setMessage({ type: 'error', text: 'Please fill all bank details' });
        return;
      }
    } else if (!withdrawalForm.upiId) {
      setMessage({ type: 'error', text: 'Please enter UPI ID' });
      return;
    }

    setIsRequesting(true);
    setMessage(null);

    try {
      await mentorService.requestWithdrawal({
        amount,
        paymentMethod: withdrawalForm.paymentMethod === 'bank' ? 'bank_transfer' : 'upi',
        bankDetails: withdrawalForm.paymentMethod === 'bank' ? withdrawalForm.bankDetails : undefined,
        upiId: withdrawalForm.paymentMethod === 'upi' ? withdrawalForm.upiId : undefined,
      });
      
      setMessage({ type: 'success', text: 'Withdrawal request submitted successfully!' });
      setShowRequestModal(false);
      setWithdrawalForm({
        amount: '',
        bankDetails: {
          accountNumber: '',
          ifscCode: '',
          accountHolderName: '',
          bankName: '',
        },
        upiId: '',
        paymentMethod: 'bank',
      });
      loadData();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to request withdrawal',
      });
    } finally {
      setIsRequesting(false);
    }
  };

  const getStatusBadge = (status: WithdrawalStatus) => {
    switch (status) {
      case WithdrawalStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case WithdrawalStatus.APPROVED:
        return 'bg-blue-100 text-blue-800';
      case WithdrawalStatus.PROCESSING:
        return 'bg-purple-100 text-purple-800';
      case WithdrawalStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case WithdrawalStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Withdrawals</h1>
          <p className="text-gray-600">Request payouts to your bank account</p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          disabled={(stats?.availableBalance || 0) < MIN_WITHDRAWAL}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Request Withdrawal
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90">Available Balance</p>
          <p className="text-3xl font-bold mt-1">₹{stats?.availableBalance?.toLocaleString() || 0}</p>
          <p className="text-sm opacity-75 mt-2">Ready to withdraw</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90">Pending Withdrawals</p>
          <p className="text-3xl font-bold mt-1">₹{stats?.pendingWithdrawals?.toLocaleString() || 0}</p>
          <p className="text-sm opacity-75 mt-2">Processing</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90">Total Withdrawn</p>
          <p className="text-3xl font-bold mt-1">
            ₹{withdrawals
              .filter((w) => w.status === WithdrawalStatus.COMPLETED)
              .reduce((sum, w) => sum + w.amount, 0)
              .toLocaleString()}
          </p>
          <p className="text-sm opacity-75 mt-2">All time</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h3 className="font-semibold text-blue-800">Withdrawal Information</h3>
            <ul className="text-blue-700 text-sm mt-2 list-disc list-inside space-y-1">
              <li>Minimum withdrawal amount: ₹{MIN_WITHDRAWAL}</li>
              <li>Withdrawals are typically processed within 2-3 business days</li>
              <li>Please ensure your bank details are correct to avoid delays</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Withdrawals List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h3 className="font-semibold">Withdrawal History</h3>
        </div>
        {withdrawals.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-6xl">🏦</span>
            <h2 className="text-xl font-semibold mt-4">No withdrawals yet</h2>
            <p className="text-gray-600 mt-2">Request your first withdrawal when you have earnings</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {withdrawals.map((withdrawal) => (
              <div key={withdrawal.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💸</span>
                      <div>
                        <h3 className="font-semibold">₹{withdrawal.amount.toLocaleString()}</h3>
                        <p className="text-sm text-gray-500">{formatDate(withdrawal.createdAt)}</p>
                      </div>
                    </div>
                    {withdrawal.bankDetails && (
                      <p className="text-sm text-gray-600 mt-2">
                        To: {withdrawal.bankDetails.accountHolderName} - {withdrawal.bankDetails.bankName}
                      </p>
                    )}
                    {withdrawal.upiId && (
                      <p className="text-sm text-gray-600 mt-2">
                        UPI: {withdrawal.upiId}
                      </p>
                    )}
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusBadge(withdrawal.status)}`}>
                    {withdrawal.status}
                  </span>
                </div>
                {withdrawal.rejectionReason && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg text-sm text-red-700">
                    <strong>Rejection Reason:</strong> {withdrawal.rejectionReason}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Request Withdrawal</h2>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Balance Display */}
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600">Available Balance</p>
                <p className="text-2xl font-bold text-green-700">
                  ₹{stats?.availableBalance?.toLocaleString() || 0}
                </p>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={withdrawalForm.amount}
                  onChange={(e) => setWithdrawalForm((prev) => ({ ...prev, amount: e.target.value }))}
                  placeholder={`Minimum ₹${MIN_WITHDRAWAL}`}
                  min={MIN_WITHDRAWAL}
                  max={stats?.availableBalance || 0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={withdrawalForm.paymentMethod === 'bank'}
                      onChange={() => setWithdrawalForm((prev) => ({ ...prev, paymentMethod: 'bank' }))}
                      className="text-indigo-600"
                    />
                    Bank Account
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={withdrawalForm.paymentMethod === 'upi'}
                      onChange={() => setWithdrawalForm((prev) => ({ ...prev, paymentMethod: 'upi' }))}
                      className="text-indigo-600"
                    />
                    UPI
                  </label>
                </div>
              </div>

              {/* Bank Details */}
              {withdrawalForm.paymentMethod === 'bank' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={withdrawalForm.bankDetails.accountHolderName}
                      onChange={(e) =>
                        setWithdrawalForm((prev) => ({
                          ...prev,
                          bankDetails: { ...prev.bankDetails, accountHolderName: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={withdrawalForm.bankDetails.bankName}
                      onChange={(e) =>
                        setWithdrawalForm((prev) => ({
                          ...prev,
                          bankDetails: { ...prev.bankDetails, bankName: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={withdrawalForm.bankDetails.accountNumber}
                      onChange={(e) =>
                        setWithdrawalForm((prev) => ({
                          ...prev,
                          bankDetails: { ...prev.bankDetails, accountNumber: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={withdrawalForm.bankDetails.ifscCode}
                      onChange={(e) =>
                        setWithdrawalForm((prev) => ({
                          ...prev,
                          bankDetails: { ...prev.bankDetails, ifscCode: e.target.value.toUpperCase() },
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              )}

              {/* UPI */}
              {withdrawalForm.paymentMethod === 'upi' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={withdrawalForm.upiId}
                    onChange={(e) => setWithdrawalForm((prev) => ({ ...prev, upiId: e.target.value }))}
                    placeholder="yourname@upi"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {/* Error Message in Modal */}
              {message && message.type === 'error' && (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg">
                  {message.text}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestWithdrawal}
                  disabled={isRequesting}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isRequesting ? 'Processing...' : 'Request Withdrawal'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
