
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Booking {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  doctorId: string;
  appointmentType: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export default function Bookings() {
  // Sample bookings data
  const bookings: Booking[] = [
    {
      id: '1',
      patientName: 'John Smith',
      patientId: 'P1001',
      doctorName: 'Dr. James Wilson',
      doctorId: '1',
      appointmentType: 'Follow-up',
      date: '2024-04-06',
      time: '09:00 AM',
      status: 'confirmed',
    },
    {
      id: '2',
      patientName: 'Emily Jones',
      patientId: 'P1002',
      doctorName: 'Dr. Sarah Johnson',
      doctorId: '2',
      appointmentType: 'Consultation',
      date: '2024-04-06',
      time: '10:30 AM',
      status: 'confirmed',
    },
    {
      id: '3',
      patientName: 'Michael Brown',
      patientId: 'P1003',
      doctorName: 'Dr. Michael Chen',
      doctorId: '3',
      appointmentType: 'Checkup',
      date: '2024-04-06',
      time: '01:15 PM',
      status: 'pending',
    },
    {
      id: '4',
      patientName: 'Sarah Wilson',
      patientId: 'P1004',
      doctorName: 'Dr. Emily Rodriguez',
      doctorId: '4',
      appointmentType: 'Review',
      date: '2024-04-06',
      time: '03:45 PM',
      status: 'confirmed',
    },
    {
      id: '5',
      patientName: 'David Johnson',
      patientId: 'P1005',
      doctorName: 'Dr. James Wilson',
      doctorId: '1',
      appointmentType: 'Consultation',
      date: '2024-04-07',
      time: '11:00 AM',
      status: 'pending',
    },
    {
      id: '6',
      patientName: 'Jennifer Lee',
      patientId: 'P1006',
      doctorName: 'Dr. Sarah Johnson',
      doctorId: '2',
      appointmentType: 'Follow-up',
      date: '2024-04-07',
      time: '02:30 PM',
      status: 'confirmed',
    },
    {
      id: '7',
      patientName: 'Robert Garcia',
      patientId: 'P1007',
      doctorName: 'Dr. Michael Chen',
      doctorId: '3',
      appointmentType: 'Checkup',
      date: '2024-04-05',
      time: '10:00 AM',
      status: 'completed',
    },
    {
      id: '8',
      patientName: 'Lisa Wong',
      patientId: 'P1008',
      doctorName: 'Dr. Emily Rodriguez',
      doctorId: '4',
      appointmentType: 'Review',
      date: '2024-04-05',
      time: '01:00 PM',
      status: 'cancelled',
    }
  ];

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter bookings by status
  const confirmedBookings = bookings.filter(booking => booking.status === 'confirmed');
  const pendingBookings = bookings.filter(booking => booking.status === 'pending');
  const completedBookings = bookings.filter(booking => booking.status === 'completed');
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled');

  const renderBookingList = (bookingList: Booking[]) => (
    <div className="space-y-4">
      {bookingList.map((booking) => (
        <Card key={booking.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 grid md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{booking.patientName}</h3>
                <p className="text-sm text-muted-foreground">Patient ID: {booking.patientId}</p>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{booking.doctorName}</p>
                <p className="text-sm">Type: {booking.appointmentType}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(booking.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="flex items-start justify-end">
                <div className="text-right">
                  <p className="text-xl font-bold">{booking.time}</p>
                  <p className="text-sm text-muted-foreground">Duration: 30 mins</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-muted-foreground">Manage patient appointments and doctor schedules.</p>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({confirmedBookings.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {renderBookingList(bookings)}
          </TabsContent>
          
          <TabsContent value="confirmed">
            {renderBookingList(confirmedBookings)}
          </TabsContent>
          
          <TabsContent value="pending">
            {renderBookingList(pendingBookings)}
          </TabsContent>
          
          <TabsContent value="completed">
            {renderBookingList(completedBookings)}
          </TabsContent>
          
          <TabsContent value="cancelled">
            {renderBookingList(cancelledBookings)}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
