import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, Plus } from 'lucide-react';

const Ledger = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountFilter, setAccountFilter] = useState('all');

  const ledgerEntries = [
    {
      id: 1,
      date: '2024-01-15',
      account: 'Accounts Receivable',
      description: 'Client Payment - Project Alpha',
      reference: 'INV-001',
      debit: 2500.00,
      credit: 0,
      balance: 2500.00,
      type: 'Asset'
    },
    {
      id: 2,
      date: '2024-01-15',
      account: 'Revenue',
      description: 'Client Payment - Project Alpha',
      reference: 'INV-001',
      debit: 0,
      credit: 2500.00,
      balance: 2500.00,
      type: 'Revenue'
    },
    {
      id: 3,
      date: '2024-01-14',
      account: 'Office Expenses',
      description: 'Office Supplies - Staples',
      reference: 'EXP-045',
      debit: 85.50,
      credit: 0,
      balance: 85.50,
      type: 'Expense'
    },
    {
      id: 4,
      date: '2024-01-14',
      account: 'Cash',
      description: 'Office Supplies - Staples',
      reference: 'EXP-045',
      debit: 0,
      credit: 85.50,
      balance: 4914.50,
      type: 'Asset'
    },
    {
      id: 5,
      date: '2024-01-13',
      account: 'Software Expenses',
      description: 'Adobe Creative Suite License',
      reference: 'EXP-044',
      debit: 52.99,
      credit: 0,
      balance: 52.99,
      type: 'Expense'
    },
    {
      id: 6,
      date: '2024-01-13',
      account: 'Cash',
      description: 'Adobe Creative Suite License',
      reference: 'EXP-044',
      debit: 0,
      credit: 52.99,
      balance: 5000.00,
      type: 'Asset'
    },
  ];

  const filteredEntries = ledgerEntries.filter(entry => {
    const matchesSearch = entry.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = accountFilter === 'all' || entry.type.toLowerCase() === accountFilter;
    return matchesSearch && matchesFilter;
  });

  const totalDebits = filteredEntries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredits = filteredEntries.reduce((sum, entry) => sum + entry.credit, 0);

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
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">General Ledger</h1>
            <p className="text-muted-foreground">View and manage all accounting transactions</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        </div>

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
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalDebits - totalCredits >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(totalDebits - totalCredits).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Ledger Entries</CardTitle>
            <CardDescription>All financial transactions in chronological order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by account, description, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={accountFilter} onValueChange={setAccountFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="asset">Assets</SelectItem>
                  <SelectItem value="liability">Liabilities</SelectItem>
                  <SelectItem value="equity">Equity</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="expense">Expenses</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Ledger Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className="text-right">Debit</TableHead>
                    <TableHead className="text-right">Credit</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {new Date(entry.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{entry.account}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {entry.reference}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {entry.debit > 0 ? (
                          <span className="text-green-600 font-medium">
                            ${entry.debit.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {entry.credit > 0 ? (
                          <span className="text-red-600 font-medium">
                            ${entry.credit.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${entry.balance.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getAccountTypeBadge(entry.type)}>
                          {entry.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredEntries.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No entries found matching your search criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Ledger;