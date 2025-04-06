
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp, DollarSign, Users, UserRound, CalendarClock, Building } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

export default function Accounts() {
  // Sample transactions data
  const transactions: Transaction[] = [
    {
      id: 'TRX001',
      date: '2024-04-01',
      description: 'Patient Consultations',
      amount: 2850.00,
      type: 'income',
      category: 'Services',
    },
    {
      id: 'TRX002',
      date: '2024-04-01',
      description: 'Staff Salaries',
      amount: 12500.00,
      type: 'expense',
      category: 'Payroll',
    },
    {
      id: 'TRX003',
      date: '2024-04-02',
      description: 'Laboratory Tests',
      amount: 1750.50,
      type: 'income',
      category: 'Services',
    },
    {
      id: 'TRX004',
      date: '2024-04-02',
      description: 'Medical Supplies',
      amount: 925.75,
      type: 'expense',
      category: 'Supplies',
    },
    {
      id: 'TRX005',
      date: '2024-04-03',
      description: 'Insurance Reimbursement',
      amount: 3450.25,
      type: 'income',
      category: 'Insurance',
    },
    {
      id: 'TRX006',
      date: '2024-04-03',
      description: 'Utility Bills',
      amount: 785.50,
      type: 'expense',
      category: 'Utilities',
    },
    {
      id: 'TRX007',
      date: '2024-04-04',
      description: 'Pharmacy Sales',
      amount: 1650.00,
      type: 'income',
      category: 'Pharmacy',
    },
    {
      id: 'TRX008',
      date: '2024-04-04',
      description: 'Equipment Maintenance',
      amount: 450.00,
      type: 'expense',
      category: 'Maintenance',
    },
    {
      id: 'TRX009',
      date: '2024-04-05',
      description: 'Surgery Procedures',
      amount: 7500.00,
      type: 'income',
      category: 'Services',
    },
    {
      id: 'TRX010',
      date: '2024-04-05',
      description: 'Administrative Expenses',
      amount: 675.25,
      type: 'expense',
      category: 'Administrative',
    },
  ];

  // Financial statistics
  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalExpenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const netProfit = totalIncome - totalExpenses;
  const profitPercent = ((netProfit / totalIncome) * 100).toFixed(1);

  // Monthly revenue data for chart
  const monthlyData = [
    { name: 'Jan', income: 32500, expenses: 24500 },
    { name: 'Feb', income: 35600, expenses: 26800 },
    { name: 'Mar', income: 38200, expenses: 28900 },
    { name: 'Apr', income: 17200, expenses: 15336 },
    { name: 'May', income: 0, expenses: 0 },
    { name: 'Jun', income: 0, expenses: 0 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">Manage hospital finances and transactions.</p>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                  <h3 className="text-2xl font-bold mt-1">${totalIncome.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full text-green-700">
                  <ArrowUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <h3 className="text-2xl font-bold mt-1">${totalExpenses.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-red-100 rounded-full text-red-700">
                  <ArrowDown className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                  <h3 className="text-2xl font-bold mt-1">${netProfit.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-full text-blue-700">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                  <h3 className="text-2xl font-bold mt-1">{profitPercent}%</h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-full text-purple-700">
                  <Building className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Monthly income vs expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => ['$' + value.toLocaleString(), '']} />
                  <Bar dataKey="income" name="Income" fill="#4CAF50" />
                  <Bar dataKey="expenses" name="Expenses" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Detailed list of income and expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.id}</TableCell>
                    <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell>{tx.category}</TableCell>
                    <TableCell>
                      <Badge className={tx.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span className={tx.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline">Export Report</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
