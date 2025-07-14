import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const FinancialReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  
  // Sample data for Profit & Loss Statement
  const profitLossData = {
    revenue: [
      { account: 'Consulting Revenue', amount: 25000.00 },
      { account: 'Product Sales', amount: 8500.00 },
      { account: 'Other Income', amount: 1200.00 },
    ],
    expenses: [
      { account: 'Rent Expense', amount: 2400.00 },
      { account: 'Office Expenses', amount: 1850.50 },
      { account: 'Software Expenses', amount: 450.99 },
      { account: 'Marketing Expenses', amount: 320.50 },
      { account: 'Professional Development', amount: 750.00 },
      { account: 'Internet Expense', amount: 180.00 },
      { account: 'Bank Service Charges', amount: 45.50 },
    ]
  };

  // Sample data for Balance Sheet
  const balanceSheetData = {
    assets: {
      current: [
        { account: 'Cash', amount: 15240.50 },
        { account: 'Accounts Receivable', amount: 8500.00 },
        { account: 'Prepaid Expenses', amount: 1200.00 },
      ],
      fixed: [
        { account: 'Office Equipment', amount: 12500.00 },
        { account: 'Computer Equipment', amount: 8900.00 },
        { account: 'Furniture', amount: 3500.00 },
      ]
    },
    liabilities: {
      current: [
        { account: 'Accounts Payable', amount: 3200.00 },
        { account: 'Accrued Expenses', amount: 850.00 },
        { account: 'Short-term Loan', amount: 5000.00 },
      ],
      longTerm: [
        { account: 'Equipment Loan', amount: 8500.00 },
      ]
    },
    equity: [
      { account: 'Owner\'s Equity', amount: 25000.00 },
      { account: 'Retained Earnings', amount: 7290.50 },
    ]
  };

  const totalRevenue = profitLossData.revenue.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = profitLossData.expenses.reduce((sum, item) => sum + item.amount, 0);
  const netIncome = totalRevenue - totalExpenses;

  const totalCurrentAssets = balanceSheetData.assets.current.reduce((sum, item) => sum + item.amount, 0);
  const totalFixedAssets = balanceSheetData.assets.fixed.reduce((sum, item) => sum + item.amount, 0);
  const totalAssets = totalCurrentAssets + totalFixedAssets;

  const totalCurrentLiabilities = balanceSheetData.liabilities.current.reduce((sum, item) => sum + item.amount, 0);
  const totalLongTermLiabilities = balanceSheetData.liabilities.longTerm.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

  const totalEquity = balanceSheetData.equity.reduce((sum, item) => sum + item.amount, 0);

  const getChangeIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Financial Reports</h1>
            <p className="text-muted-foreground">Comprehensive financial statements and analysis</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                {getChangeIcon(15.2)}
                <span>+15.2% vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
              <div className="flex items-center gap-1 text-sm text-red-600">
                {getChangeIcon(8.5)}
                <span>+8.5% vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${netIncome.toFixed(2)}
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                {getChangeIcon(22.8)}
                <span>+22.8% vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{((netIncome / totalRevenue) * 100).toFixed(1)}%</div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                {getChangeIcon(3.2)}
                <span>+3.2% vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Statements Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Statements</CardTitle>
            <CardDescription>
              Detailed financial reports for the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profit-loss" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profit-loss">Profit & Loss Statement</TabsTrigger>
                <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
              </TabsList>

              <TabsContent value="profit-loss" className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">% of Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Revenue Section */}
                      <TableRow className="bg-muted/30">
                        <TableCell className="font-bold">REVENUE</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      {profitLossData.revenue.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="pl-6">{item.account}</TableCell>
                          <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            {((item.amount / totalRevenue) * 100).toFixed(1)}%
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="border-t">
                        <TableCell className="font-medium pl-6">Total Revenue</TableCell>
                        <TableCell className="text-right font-bold">${totalRevenue.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-bold">100.0%</TableCell>
                      </TableRow>

                      {/* Expenses Section */}
                      <TableRow className="bg-muted/30">
                        <TableCell className="font-bold">EXPENSES</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      {profitLossData.expenses.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="pl-6">{item.account}</TableCell>
                          <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            {((item.amount / totalRevenue) * 100).toFixed(1)}%
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="border-t">
                        <TableCell className="font-medium pl-6">Total Expenses</TableCell>
                        <TableCell className="text-right font-bold">${totalExpenses.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-bold">
                          {((totalExpenses / totalRevenue) * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>

                      {/* Net Income */}
                      <TableRow className="border-t-2 border-border bg-muted/30">
                        <TableCell className="font-bold">NET INCOME</TableCell>
                        <TableCell className={`text-right font-bold text-lg ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${netIncome.toFixed(2)}
                        </TableCell>
                        <TableCell className={`text-right font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {((netIncome / totalRevenue) * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="balance-sheet" className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Assets Section */}
                      <TableRow className="bg-muted/30">
                        <TableCell className="font-bold">ASSETS</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      
                      <TableRow className="bg-muted/10">
                        <TableCell className="font-medium pl-4">Current Assets</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      {balanceSheetData.assets.current.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="pl-8">{item.account}</TableCell>
                          <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-medium pl-6">Total Current Assets</TableCell>
                        <TableCell className="text-right font-medium">${totalCurrentAssets.toFixed(2)}</TableCell>
                      </TableRow>

                      <TableRow className="bg-muted/10">
                        <TableCell className="font-medium pl-4">Fixed Assets</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      {balanceSheetData.assets.fixed.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="pl-8">{item.account}</TableCell>
                          <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-medium pl-6">Total Fixed Assets</TableCell>
                        <TableCell className="text-right font-medium">${totalFixedAssets.toFixed(2)}</TableCell>
                      </TableRow>

                      <TableRow className="border-t">
                        <TableCell className="font-bold pl-4">TOTAL ASSETS</TableCell>
                        <TableCell className="text-right font-bold text-lg">${totalAssets.toFixed(2)}</TableCell>
                      </TableRow>

                      {/* Liabilities Section */}
                      <TableRow className="bg-muted/30">
                        <TableCell className="font-bold">LIABILITIES</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      
                      <TableRow className="bg-muted/10">
                        <TableCell className="font-medium pl-4">Current Liabilities</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      {balanceSheetData.liabilities.current.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="pl-8">{item.account}</TableCell>
                          <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-medium pl-6">Total Current Liabilities</TableCell>
                        <TableCell className="text-right font-medium">${totalCurrentLiabilities.toFixed(2)}</TableCell>
                      </TableRow>

                      <TableRow className="bg-muted/10">
                        <TableCell className="font-medium pl-4">Long-term Liabilities</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      {balanceSheetData.liabilities.longTerm.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="pl-8">{item.account}</TableCell>
                          <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-medium pl-6">Total Long-term Liabilities</TableCell>
                        <TableCell className="text-right font-medium">${totalLongTermLiabilities.toFixed(2)}</TableCell>
                      </TableRow>

                      <TableRow className="border-t">
                        <TableCell className="font-bold pl-4">TOTAL LIABILITIES</TableCell>
                        <TableCell className="text-right font-bold">${totalLiabilities.toFixed(2)}</TableCell>
                      </TableRow>

                      {/* Equity Section */}
                      <TableRow className="bg-muted/30">
                        <TableCell className="font-bold">EQUITY</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      {balanceSheetData.equity.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="pl-6">{item.account}</TableCell>
                          <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="border-t">
                        <TableCell className="font-bold pl-4">TOTAL EQUITY</TableCell>
                        <TableCell className="text-right font-bold">${totalEquity.toFixed(2)}</TableCell>
                      </TableRow>

                      <TableRow className="border-t-2 border-border bg-muted/30">
                        <TableCell className="font-bold">TOTAL LIABILITIES & EQUITY</TableCell>
                        <TableCell className="text-right font-bold text-lg">
                          ${(totalLiabilities + totalEquity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialReports;