'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { mentorService } from '@/services/mentor.service';
import { Transaction, TransactionType, TransactionStatus } from '@/types';

export default function MentorTransactionsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<TransactionType | 'all'>('all');

  useEffect(() => {
    if (user?.role !== 'MENTOR') {
      router.push('/dashboard');
      return;
    }
    loadTransactions();
  }, [user, router, filter]);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await mentorService.getTransactions(
        filter !== 'all' ? { type: filter } : undefined
      );
      setTransactions(response.data?.transactions || []);
    } catch (error: any) {
      console.error('Error loading transactions:', error);
    } finally {
      setIsLoading(false);
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

  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.EARNING:
        return '💰';
      case TransactionType.WITHDRAWAL:
        return '🏦';
      case TransactionType.PAYOUT:
        return '💸';
      case TransactionType.REFUND:
        return '↩️';
      case TransactionType.INCENTIVE:
        return '🎁';
      case TransactionType.PLATFORM_FEE:
        return '📊';
      default:
        return '💳';
    }
  };

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case TransactionStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case TransactionStatus.FAILED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isCredit = (type: TransactionType) => {
    return [TransactionType.EARNING, TransactionType.PAYOUT, TransactionType.INCENTIVE].includes(type);
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
      <div>
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-gray-600">Complete history of all financial activities</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            filter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {Object.values(TransactionType).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === type
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getTypeIcon(type)} {type}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {transactions.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-6xl">📊</span>
            <h2 className="text-xl font-semibold mt-4">No transactions found</h2>
            <p className="text-gray-600 mt-2">
              {filter !== 'all' ? `No ${filter.toLowerCase()} transactions` : 'Your transaction history will appear here'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{getTypeIcon(transaction.type)}</span>
                    <div>
                      <h3 className="font-semibold">{transaction.type}</h3>
                      <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                      {transaction.description && (
                        <p className="text-sm text-gray-600 mt-1">{transaction.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      isCredit(transaction.type) ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isCredit(transaction.type) ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </p>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs ${getStatusBadge(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
                {transaction.referenceId && (
                  <div className="mt-3 text-xs text-gray-400">
                    Reference: {transaction.referenceId}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {transactions.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Total Credits</p>
              <p className="text-2xl font-bold text-green-700">
                ₹{transactions
                  .filter((t) => isCredit(t.type) && t.status === TransactionStatus.COMPLETED)
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600">Total Debits</p>
              <p className="text-2xl font-bold text-red-700">
                ₹{transactions
                  .filter((t) => !isCredit(t.type) && t.status === TransactionStatus.COMPLETED)
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">Total Transactions</p>
              <p className="text-2xl font-bold text-blue-700">{transactions.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
