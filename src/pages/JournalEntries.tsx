import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Filter, Edit, Trash2, Save, X } from 'lucide-react';

const JournalEntries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<number | null>(null);
  const { toast } = useToast();

  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: '2024-01-15',
      reference: 'JE-001',
      description: 'Client Payment - Project Alpha',
      debitAccount: 'Accounts Receivable',
      creditAccount: 'Revenue',
      amount: 2500.00,
      status: 'Posted'
    },
    {
      id: 2,
      date: '2024-01-14',
      reference: 'JE-002',
      description: 'Office Supplies Purchase',
      debitAccount: 'Office Expenses',
      creditAccount: 'Cash',
      amount: 85.50,
      status: 'Posted'
    },
    {
      id: 3,
      date: '2024-01-13',
      reference: 'JE-003',
      description: 'Software License Payment',
      debitAccount: 'Software Expenses',
      creditAccount: 'Cash',
      amount: 52.99,
      status: 'Draft'
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    date: '',
    description: '',
    debitAccount: '',
    creditAccount: '',
    amount: 0,
  });

  const accounts = [
    'Cash',
    'Accounts Receivable',
    'Office Expenses',
    'Software Expenses',
    'Equipment',
    'Accounts Payable',
    'Revenue',
    'Consulting Revenue',
    'Interest Expense',
    'Rent Expense',
  ];

  const filteredEntries = journalEntries.filter(entry =>
    entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.debitAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.creditAccount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEntry = () => {
    if (!newEntry.date || !newEntry.description || !newEntry.debitAccount || !newEntry.creditAccount || newEntry.amount <= 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const entry = {
      id: journalEntries.length + 1,
      ...newEntry,
      reference: `JE-${String(journalEntries.length + 1).padStart(3, '0')}`,
      status: 'Draft'
    };

    setJournalEntries([entry, ...journalEntries]);
    setNewEntry({ date: '', description: '', debitAccount: '', creditAccount: '', amount: 0 });
    setShowAddForm(false);
    
    toast({
      title: "Entry Added",
      description: "Journal entry has been created successfully.",
    });
  };

  const handleDeleteEntry = (id: number) => {
    setJournalEntries(journalEntries.filter(entry => entry.id !== id));
    toast({
      title: "Entry Deleted",
      description: "Journal entry has been removed.",
    });
  };

  const handlePostEntry = (id: number) => {
    setJournalEntries(journalEntries.map(entry =>
      entry.id === id ? { ...entry, status: 'Posted' } : entry
    ));
    toast({
      title: "Entry Posted",
      description: "Journal entry has been posted to the ledger.",
    });
  };

  const getStatusBadge = (status: string) => {
    return status === 'Posted' ? (
      <Badge className="bg-green-100 text-green-800">Posted</Badge>
    ) : (
      <Badge variant="secondary">Draft</Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Journal Entries</h1>
            <p className="text-muted-foreground">Record and manage accounting transactions</p>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        </div>

        {/* Add Entry Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Journal Entry</CardTitle>
              <CardDescription>Create a new accounting transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newEntry.amount || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, amount: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="debitAccount">Debit Account</Label>
                  <Select value={newEntry.debitAccount} onValueChange={(value) => setNewEntry({ ...newEntry, debitAccount: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select debit account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account} value={account}>{account}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="creditAccount">Credit Account</Label>
                  <Select value={newEntry.creditAccount} onValueChange={(value) => setNewEntry({ ...newEntry, creditAccount: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select credit account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account} value={account}>{account}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter transaction description..."
                    value={newEntry.description}
                    onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleAddEntry}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Journal Entries List</CardTitle>
            <CardDescription>View and manage all journal entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Entries Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Debit Account</TableHead>
                    <TableHead>Credit Account</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {new Date(entry.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{entry.reference}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{entry.description}</TableCell>
                      <TableCell>{entry.debitAccount}</TableCell>
                      <TableCell>{entry.creditAccount}</TableCell>
                      <TableCell className="text-right font-medium">
                        ${entry.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {entry.status === 'Draft' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePostEntry(entry.id)}
                            >
                              Post
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingEntry(entry.id)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteEntry(entry.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredEntries.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No journal entries found.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JournalEntries;