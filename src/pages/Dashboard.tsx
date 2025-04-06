
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserRound, 
  CalendarClock, 
  Users, 
  Receipt, 
  TrendingUp, 
  Activity 
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Doctors', value: '24', icon: <UserRound className="h-6 w-6" />, color: 'bg-blue-100 text-blue-700' },
    { title: 'Patients', value: '543', icon: <Users className="h-6 w-6" />, color: 'bg-purple-100 text-purple-700' },
    { title: 'Appointments', value: '48', icon: <CalendarClock className="h-6 w-6" />, color: 'bg-green-100 text-green-700' },
    { title: 'Revenue', value: '$12,480', icon: <Receipt className="h-6 w-6" />, color: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Hospital Management System dashboard.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-2 rounded-full ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Hospital Activity</span>
              </CardTitle>
              <CardDescription>Overview of recent hospital activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  'Dr. Sarah Johnson completed 8 consultations',
                  'Lab results for patient #2458 are ready',
                  'New medication stock arrived',
                  '3 new patients registered today',
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded-md">
                    <Activity className="h-5 w-5 text-primary" />
                    <p className="text-sm">{activity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-primary" />
                <span>Upcoming Appointments</span>
              </CardTitle>
              <CardDescription>Today's schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: '09:00 AM', patient: 'John Smith', doctor: 'Dr. Roberts', type: 'Follow-up' },
                  { time: '10:30 AM', patient: 'Emily Jones', doctor: 'Dr. Patel', type: 'Consultation' },
                  { time: '01:15 PM', patient: 'Michael Brown', doctor: 'Dr. Chen', type: 'Checkup' },
                  { time: '03:45 PM', patient: 'Sarah Wilson', doctor: 'Dr. Garcia', type: 'Review' },
                ].map((appt, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{appt.time}</p>
                      <p className="text-sm text-muted-foreground">{appt.patient} with {appt.doctor}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{appt.type}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
