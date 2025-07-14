import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, FileText, AlertCircle, Upload, Calculator, BarChart3, PieChart } from 'lucide-react';

const AccountingDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Super AI Accountant</h1>
            <p className="text-muted-foreground">Welcome to your intelligent accounting dashboard</p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">Pro Plan</Badge>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+20.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,234.50</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500">+5.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$32,997.39</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+15.8%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Worth $8,234.50
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Financial Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Cash Flow Overview</CardTitle>
              <CardDescription>Monthly revenue and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <PieChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">Financial chart will be rendered here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Cost Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                AI Suggestions
              </CardTitle>
              <CardDescription>Cost optimization recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-medium text-sm">Reduce Software Subscriptions</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  You have 3 unused software subscriptions. Potential savings: $240/month
                </p>
                <Button size="sm" variant="outline" className="mt-2">
                  Review
                </Button>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-medium text-sm">Tax Deduction Opportunity</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Office supplies can be claimed as business expense. Potential savings: $450
                </p>
                <Button size="sm" variant="outline" className="mt-2">
                  Apply
                </Button>
              </div>

              <Button className="w-full" variant="secondary">
                View All Suggestions
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: 'Income', desc: 'Client Payment - Project Alpha', amount: '+$2,500', date: '2 hours ago' },
                  { type: 'Expense', desc: 'Office Supplies - Staples', amount: '-$85.50', date: '5 hours ago' },
                  { type: 'Income', desc: 'Consulting Fee - Beta Corp', amount: '+$1,200', date: '1 day ago' },
                  { type: 'Expense', desc: 'Software License - Adobe', amount: '-$52.99', date: '2 days ago' },
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{transaction.desc}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common accounting tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Invoice
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Calculator className="h-5 w-5" />
                  Add Entry
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <BarChart3 className="h-5 w-5" />
                  View Reports
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="h-5 w-5" />
                  Trial Balance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountingDashboard;