
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface BillingRecord {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  category: 'Consultation' | 'Laboratory' | 'Pharmacy' | 'Radiology' | 'Surgery' | 'Other';
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

export default function Billing() {
  // Sample billing data
  const billingData: BillingRecord[] = [
    {
      id: 'INV-001',
      patientName: 'John Smith',
      patientId: 'P1001',
      date: '2024-04-02',
      category: 'Consultation',
      description: 'Initial consultation with Dr. Wilson',
      amount: 145.00,
      status: 'paid',
    },
    {
      id: 'INV-002',
      patientName: 'Emily Jones',
      patientId: 'P1002',
      date: '2024-04-03',
      category: 'Laboratory',
      description: 'Blood test panel',
      amount: 210.50,
      status: 'paid',
    },
    {
      id: 'INV-003',
      patientName: 'Michael Brown',
      patientId: 'P1003',
      date: '2024-04-04',
      category: 'Pharmacy',
      description: 'Prescribed medications',
      amount: 95.00,
      status: 'pending',
    },
    {
      id: 'INV-004',
      patientName: 'Sarah Wilson',
      patientId: 'P1004',
      date: '2024-04-04',
      category: 'Pharmacy',
      description: 'Prescription fulfillment',
      amount: 75.25,
      status: 'paid',
    },
    {
      id: 'INV-005',
      patientName: 'David Johnson',
      patientId: 'P1005',
      date: '2024-04-05',
      category: 'Laboratory',
      description: 'Diabetes screening',
      amount: 185.00,
      status: 'pending',
    },
    {
      id: 'INV-006',
      patientName: 'Jennifer Lee',
      patientId: 'P1006',
      date: '2024-04-05',
      category: 'Consultation',
      description: 'Follow-up with Dr. Johnson',
      amount: 165.75,
      status: 'paid',
    },
    {
      id: 'INV-007',
      patientName: 'Robert Garcia',
      patientId: 'P1007',
      date: '2024-04-05',
      category: 'Radiology',
      description: 'Chest X-ray',
      amount: 255.50,
      status: 'overdue',
    },
    {
      id: 'INV-008',
      patientName: 'Lisa Wong',
      patientId: 'P1008',
      date: '2024-04-06',
      category: 'Consultation',
      description: 'Dermatology consultation',
      amount: 120.00,
      status: 'pending',
    },
    {
      id: 'INV-009',
      patientName: 'Thomas Parker',
      patientId: 'P1009',
      date: '2024-04-06',
      category: 'Surgery',
      description: 'Minor outpatient procedure',
      amount: 950.00,
      status: 'paid',
    },
    {
      id: 'INV-010',
      patientName: 'Amanda Lewis',
      patientId: 'P1010',
      date: '2024-04-06',
      category: 'Radiology',
      description: 'MRI scan',
      amount: 825.50,
      status: 'pending',
    },
  ];

  const getStatusColor = (status: BillingRecord['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter billing records by category
  const consultationBilling = billingData.filter(record => record.category === 'Consultation');
  const laboratoryBilling = billingData.filter(record => record.category === 'Laboratory');
  const pharmacyBilling = billingData.filter(record => record.category === 'Pharmacy');
  const radiologyBilling = billingData.filter(record => record.category === 'Radiology');
  const surgeryBilling = billingData.filter(record => record.category === 'Surgery');
  const otherBilling = billingData.filter(record => record.category === 'Other');

  // Chart data - Revenue by category
  const categoryRevenue = [
    { name: 'Consultation', value: consultationBilling.reduce((sum, record) => sum + record.amount, 0) },
    { name: 'Laboratory', value: laboratoryBilling.reduce((sum, record) => sum + record.amount, 0) },
    { name: 'Pharmacy', value: pharmacyBilling.reduce((sum, record) => sum + record.amount, 0) },
    { name: 'Radiology', value: radiologyBilling.reduce((sum, record) => sum + record.amount, 0) },
    { name: 'Surgery', value: surgeryBilling.reduce((sum, record) => sum + record.amount, 0) },
    { name: 'Other', value: otherBilling.reduce((sum, record) => sum + record.amount, 0) },
  ];

  // Chart data - Revenue by day
  const revenueByDay = [
    { name: 'Apr 2', consultation: 145, laboratory: 0, pharmacy: 0, radiology: 0, surgery: 0, total: 145 },
    { name: 'Apr 3', consultation: 0, laboratory: 210.5, pharmacy: 0, radiology: 0, surgery: 0, total: 210.5 },
    { name: 'Apr 4', consultation: 0, laboratory: 0, pharmacy: 170.25, radiology: 0, surgery: 0, total: 170.25 },
    { name: 'Apr 5', consultation: 165.75, laboratory: 185, pharmacy: 0, radiology: 255.5, surgery: 0, total: 606.25 },
    { name: 'Apr 6', consultation: 120, laboratory: 0, pharmacy: 0, radiology: 825.5, surgery: 950, total: 1895.5 },
  ];

  // Pie chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Fix the type issue in formatters
  const formatCurrency = (value: any) => {
    if (typeof value === 'number') {
      return `$${value.toFixed(2)}`;
    }
    return `$${value}`;
  };

  const renderBillingList = (billingList: BillingRecord[]) => (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Invoice</TableHead>
            <TableHead className="font-semibold">Patient</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billingList.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.id}</TableCell>
              <TableCell>
                {record.patientName}
                <div className="text-xs text-muted-foreground">{record.patientId}</div>
              </TableCell>
              <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
              <TableCell>{record.category}</TableCell>
              <TableCell>{record.description}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(record.status)}>
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">${record.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">Manage and view hospital billing records.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Revenue by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryRevenue}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: $${typeof value === 'number' ? value.toFixed(0) : value}`}
                  >
                    {categoryRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Daily Revenue</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueByDay}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                  <Legend />
                  <Bar dataKey="total" fill="#1E88E5" name="Total Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All ({billingData.length})</TabsTrigger>
            <TabsTrigger value="consultation">Consultation ({consultationBilling.length})</TabsTrigger>
            <TabsTrigger value="laboratory">Laboratory ({laboratoryBilling.length})</TabsTrigger>
            <TabsTrigger value="pharmacy">Pharmacy ({pharmacyBilling.length})</TabsTrigger>
            <TabsTrigger value="radiology">Radiology ({radiologyBilling.length})</TabsTrigger>
            <TabsTrigger value="surgery">Surgery ({surgeryBilling.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {renderBillingList(billingData)}
          </TabsContent>
          
          <TabsContent value="consultation">
            {renderBillingList(consultationBilling)}
          </TabsContent>
          
          <TabsContent value="laboratory">
            {renderBillingList(laboratoryBilling)}
          </TabsContent>
          
          <TabsContent value="pharmacy">
            {renderBillingList(pharmacyBilling)}
          </TabsContent>
          
          <TabsContent value="radiology">
            {renderBillingList(radiologyBilling)}
          </TabsContent>
          
          <TabsContent value="surgery">
            {renderBillingList(surgeryBilling)}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
