"use client";

import { useEffect, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  Clock,
  CheckCircle,
  XCircle,
  Gift,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useMentorStore } from "../../../stores/mentorStore";
import { api } from "../../../lib/api";
import { formatCurrency, formatDate, formatDateTime } from "../../../lib/utils";
import { Spinner } from "../../../components/ui/spinner";
import { toast } from "sonner";

export default function EarningsPage() {
  const {
    earnings,
    earningsLoading,
    fetchEarnings,
    transactions,
    transactionsLoading,
    fetchTransactions,
    withdrawals,
    withdrawalsLoading,
    fetchWithdrawals,
    incentives,
    incentivesLoading,
    fetchIncentives,
  } = useMentorStore();

  const [withdrawDialog, setWithdrawDialog] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("BANK_TRANSFER");
  const [accountDetails, setAccountDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEarnings();
    fetchTransactions({});
    fetchWithdrawals({});
    fetchIncentives({});
  }, [fetchEarnings, fetchTransactions, fetchWithdrawals, fetchIncentives]);

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > (earnings?.balance || 0)) {
      toast.error("Insufficient balance");
      return;
    }

    setSubmitting(true);
    try {
      await api.mentor.requestWithdrawal({
        amount: parseFloat(amount),
        method,
        accountDetails,
      });
      toast.success("Withdrawal request submitted successfully");
      fetchEarnings();
      fetchWithdrawals({});
      setWithdrawDialog(false);
      setAmount("");
      setAccountDetails("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to request withdrawal");
    } finally {
      setSubmitting(false);
    }
  };

  const stats = [
    {
      title: "Total Earnings",
      value: formatCurrency(earnings?.totalEarnings || 0),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Available Balance",
      value: formatCurrency(earnings?.balance || 0),
      icon: Wallet,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pending",
      value: formatCurrency(earnings?.pendingEarnings || 0),
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Total Withdrawn",
      value: formatCurrency(earnings?.totalWithdrawn || 0),
      icon: ArrowUpCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
      case "APPROVED":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "PENDING":
        return <Clock className="h-4 w-4 text-orange-600" />;
      case "REJECTED":
      case "FAILED":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <p className="mt-1 text-gray-600">
            Track your income and manage withdrawals
          </p>
        </div>
        <Button
          onClick={() => setWithdrawDialog(true)}
          className="gap-2"
          disabled={!earnings?.balance || earnings.balance <= 0}
        >
          <ArrowUpCircle className="h-4 w-4" />
          Withdraw
        </Button>
      </div>

      {/* Stats Grid */}
      {earningsLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-xl p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          <TabsTrigger value="incentives">Incentives</TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              {transactionsLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : transactions.length === 0 ? (
                <div className="py-8 text-center">
                  <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-600">No transactions yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                          <ArrowDownCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{tx.description || "Session Payment"}</p>
                          <p className="text-sm text-gray-600">
                            {formatDateTime(tx.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusIcon(tx.status)}
                        <span className="font-semibold text-green-600">
                          +{formatCurrency(tx.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Withdrawals Tab */}
        <TabsContent value="withdrawals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal History</CardTitle>
            </CardHeader>
            <CardContent>
              {withdrawalsLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : withdrawals.length === 0 ? (
                <div className="py-8 text-center">
                  <Wallet className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-600">No withdrawals yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {withdrawals.map((withdrawal) => (
                    <div
                      key={withdrawal.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                          <ArrowUpCircle className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {withdrawal.method?.replace("_", " ") || "Withdrawal"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDateTime(withdrawal.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            withdrawal.status === "COMPLETED"
                              ? "success"
                              : withdrawal.status === "PENDING"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {withdrawal.status}
                        </Badge>
                        <span className="font-semibold text-purple-600">
                          -{formatCurrency(withdrawal.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Incentives Tab */}
        <TabsContent value="incentives" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Incentives & Bonuses</CardTitle>
            </CardHeader>
            <CardContent>
              {incentivesLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : incentives.length === 0 ? (
                <div className="py-8 text-center">
                  <Gift className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-600">No incentives yet</p>
                  <p className="text-sm text-gray-500">
                    Complete more sessions to unlock bonuses!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {incentives.map((incentive) => (
                    <div
                      key={incentive.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                          <Gift className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">{incentive.title}</p>
                          <p className="text-sm text-gray-600">
                            {incentive.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(incentive.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusIcon(incentive.status)}
                        <span className="font-semibold text-orange-600">
                          +{formatCurrency(incentive.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialog} onOpenChange={setWithdrawDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Withdrawal</DialogTitle>
            <DialogDescription>
              Available balance: {formatCurrency(earnings?.balance || 0)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                max={earnings?.balance || 0}
                min={1}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="method">Withdrawal Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="PAYPAL">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="account">Account Details</Label>
              <Input
                id="account"
                placeholder={
                  method === "UPI"
                    ? "Enter UPI ID"
                    : method === "PAYPAL"
                    ? "Enter PayPal email"
                    : "Enter account number"
                }
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleWithdraw} disabled={submitting}>
              {submitting ? "Processing..." : "Request Withdrawal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
