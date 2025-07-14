import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

const TrialBalance = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const trialBalanceData = [
    { account: 'Cash', accountType: 'Asset', debit: 4914.50, credit: 0 },
    { account: 'Accounts Receivable', accountType: 'Asset', debit: 8500.00, credit: 0 },
    { account: 'Office Equipment', accountType: 'Asset', debit: 2500.00, credit: 0 },
    { account: 'Accounts Payable', accountType: 'Liability', debit: 0, credit: 1200.00 },
    { account: 'Owner\'s Equity', accountType: 'Equity', debit: 0, credit: 10000.00 },
    { account: 'Revenue', accountType: 'Revenue', debit: 0, credit: 25000.00 },
    { account: 'Consulting Revenue', accountType: 'Revenue', debit: 0, credit: 8500.00 },
    { account: 'Office Expenses', accountType: 'Expense', debit: 1850.50, credit: 0 },
    { account: 'Software Expenses', accountType: 'Expense', debit: 450.99, credit: 0 },
    { account: 'Rent Expense', accountType: 'Expense', debit: 2400.00, credit: 0 },
    { account: 'Internet Expense', accountType: 'Expense', debit: 180.00, credit: 0 },
    { account: 'Professional Development', accountType: 'Expense', debit: 750.00, credit: 0 },
    { account: 'Marketing Expenses', accountType: 'Expense', debit: 320.50, credit: 0 },
    { account: 'Bank Service Charges', accountType: 'Expense', debit: 45.50, credit: 0 },
  ];

  const totalDebits = trialBalanceData.reduce((sum, item) => sum + item.debit, 0);
  const totalCredits = trialBalanceData.reduce((sum, item) => sum + item.credit, 0);
  const isBalanced = Math.abs(totalDebits - totalCredits) < 0.01;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const getAccountTypeBadge = (type: string) => {
    const colors = {
      'Asset': 'bg-blue-100 text-blue-800',
      'Liability': 'bg-red-100 text-red-800',
      'Equity': 'bg-green-100 text-green-800',
      'Revenue': 'bg-emerald-100 text-emerald-800',
      'Expense': 'bg-orange-100 text-orange-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Trial Balance</h1>
            <p className="text-muted-foreground">Verify the mathematical accuracy of your books</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Balance Status Alert */}
        <Alert className={isBalanced ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          {isBalanced ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={isBalanced ? 'text-green-800' : 'text-red-800'}>
            {isBalanced
              ? 'Trial Balance is in balance. All debits equal credits.'
              : `Trial Balance is out of balance. Difference: $${Math.abs(totalDebits - totalCredits).toFixed(2)}`
            }
          </AlertDescription>
        </Alert>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Debits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${totalDebits.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ${totalCredits.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Difference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(totalDebits - totalCredits).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trial Balance Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Trial Balance Report</CardTitle>
                <CardDescription>
                  As of {lastUpdated.toLocaleDateString()} at {lastUpdated.toLocaleTimeString()}
                </CardDescription>
              </div>
              <Badge variant={isBalanced ? "secondary" : "destructive"}>
                {isBalanced ? "Balanced" : "Out of Balance"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account Name</TableHead>
                    <TableHead>Account Type</TableHead>
                    <TableHead className="text-right">Debit</TableHead>
                    <TableHead className="text-right">Credit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trialBalanceData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{item.account}</TableCell>
                      <TableCell>
                        <Badge className={getAccountTypeBadge(item.accountType)}>
                          {item.accountType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.debit > 0 ? (
                          <span className="font-medium">
                            ${item.debit.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.credit > 0 ? (
                          <span className="font-medium">
                            ${item.credit.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Totals Row */}
                  <TableRow className="border-t-2 border-border bg-muted/30">
                    <TableCell className="font-bold">TOTALS</TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right font-bold text-lg">
                      ${totalDebits.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-lg">
                      ${totalCredits.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Reconciliation Notes */}
        {!isBalanced && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Reconciliation Required</CardTitle>
              <CardDescription className="text-red-700">
                The trial balance is out of balance. Please review the following:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-red-800">
                <li>• Check for data entry errors in journal entries</li>
                <li>• Verify that all transactions have been recorded</li>
                <li>• Ensure proper account classifications</li>
                <li>• Review for transposed numbers or decimal point errors</li>
                <li>• Confirm that all adjusting entries have been posted</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrialBalance;