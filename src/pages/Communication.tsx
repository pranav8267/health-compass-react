
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, Send, MessageSquare, Bell, Users, PenSquare, Clock } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderRole: string;
  recipient: string;
  recipientRole: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  avatarUrl?: string;
}

export default function Communication() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('messages');
  const [showCompose, setShowCompose] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: '',
  });

  // Sample messages data
  const messages: Message[] = [
    {
      id: 'MSG001',
      sender: 'Dr. James Wilson',
      senderRole: 'Cardiologist',
      recipient: 'Hospital Admin',
      recipientRole: 'Admin',
      subject: 'Patient Referral - John Smith',
      content: 'I would like to refer patient John Smith (ID: P1001) to a specialist for further cardiac evaluation. His latest ECG shows some abnormalities that require further investigation. Please arrange for an appointment with Dr. Thompson at your earliest convenience.',
      date: '2024-04-05T10:30:00',
      read: true,
      avatarUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    {
      id: 'MSG002',
      sender: 'Nursing Department',
      senderRole: 'Department',
      recipient: 'Hospital Admin',
      recipientRole: 'Admin',
      subject: 'Staffing Request for Weekend',
      content: 'Due to the expected high patient volume this weekend, we are requesting additional nursing staff. We need at least two more registered nurses for the night shift on Saturday and Sunday. Please let us know if this can be arranged.',
      date: '2024-04-05T14:45:00',
      read: false,
    },
    {
      id: 'MSG003',
      sender: 'Dr. Sarah Johnson',
      senderRole: 'Neurologist',
      recipient: 'Hospital Admin',
      recipientRole: 'Admin',
      subject: 'Equipment Maintenance Required',
      content: 'The MRI machine in Radiology department needs maintenance. It has been showing calibration errors during the last few scans. Please schedule a maintenance visit as soon as possible to avoid delays in patient diagnosis and treatment.',
      date: '2024-04-04T09:15:00',
      read: true,
      avatarUrl: 'https://randomuser.me/api/portraits/women/64.jpg',
    },
    {
      id: 'MSG004',
      sender: 'Pharmacy Department',
      senderRole: 'Department',
      recipient: 'Hospital Admin',
      recipientRole: 'Admin',
      subject: 'Medication Stock Alert',
      content: 'This is to inform you that we are running low on several critical medications including insulin, heparin, and several antibiotics. We need to place an order immediately to avoid any shortages. Please approve the purchase order attached to this message.',
      date: '2024-04-04T16:20:00',
      read: false,
    },
    {
      id: 'MSG005',
      sender: 'IT Support',
      senderRole: 'Department',
      recipient: 'Hospital Admin',
      recipientRole: 'Admin',
      subject: 'System Maintenance Notice',
      content: 'Please be informed that we will be performing routine maintenance on the Hospital Management System this Sunday between 2:00 AM and 5:00 AM. During this time, the system will be temporarily unavailable. We apologize for any inconvenience and appreciate your understanding.',
      date: '2024-04-03T11:05:00',
      read: true,
    },
  ];

  // Sample notifications
  const notifications = [
    {
      id: 'NOTIF001',
      title: 'New Patient Admitted',
      description: 'Michael Brown has been admitted to Ward 3',
      time: '15 minutes ago',
      type: 'info',
    },
    {
      id: 'NOTIF002',
      title: 'Lab Results Ready',
      description: 'Lab results for patient Sarah Wilson are ready',
      time: '1 hour ago',
      type: 'success',
    },
    {
      id: 'NOTIF003',
      title: 'Appointment Request',
      description: 'Dr. Johnson requested a staff meeting tomorrow',
      time: '3 hours ago',
      type: 'info',
    },
    {
      id: 'NOTIF004',
      title: 'Medicine Stock Alert',
      description: 'Low stock for Lisinopril 10mg. Please reorder.',
      time: '5 hours ago',
      type: 'warning',
    },
    {
      id: 'NOTIF005',
      title: 'System Update',
      description: 'HMS will be updated tonight at 2:00 AM',
      time: '1 day ago',
      type: 'info',
    },
  ];

  // Announcements data
  const announcements = [
    {
      id: 'ANN001',
      title: 'Hospital Accreditation Successful',
      content: 'We are pleased to announce that our hospital has successfully passed the accreditation review with excellent ratings. This achievement reflects our commitment to providing high-quality patient care and maintaining rigorous standards. Thank you to all staff for your dedication and hard work.',
      author: 'Hospital Director',
      date: '2024-04-04',
    },
    {
      id: 'ANN002',
      title: 'New COVID-19 Guidelines',
      content: 'In response to the latest health authority recommendations, we are updating our COVID-19 protocols. Starting next week, all staff will be required to undergo weekly testing regardless of vaccination status. Please check your email for the detailed document outlining all the changes.',
      author: 'Infection Control Department',
      date: '2024-04-03',
    },
    {
      id: 'ANN003',
      title: 'Staff Appreciation Week',
      content: 'The management is organizing a Staff Appreciation Week from April 15-19. Various activities, including recognition ceremonies, wellness sessions, and special meals, will be arranged throughout the week. A detailed schedule will be posted on the bulletin board and sent via email.',
      author: 'Human Resources',
      date: '2024-04-02',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMessage({ ...newMessage, [name]: value });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this message to your backend
    console.log('Sending message:', newMessage);
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
    
    // Reset form and close compose window
    setNewMessage({
      recipient: '',
      subject: '',
      content: '',
    });
    setShowCompose(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <PenSquare className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <Bell className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Communication</h1>
            <p className="text-muted-foreground">Manage hospital communications and notifications.</p>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => { setShowCompose(true); setSelectedMessage(null); }}>
              <PenSquare className="mr-2 h-4 w-4" />
              Compose
            </Button>
          </div>
        </div>

        <Tabs defaultValue="messages" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="messages">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="announcements">
              <Users className="mr-2 h-4 w-4" />
              Announcements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Message List */}
              <Card className={`md:col-span-1 ${(showCompose || selectedMessage) ? 'hidden md:block' : ''}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Inbox</CardTitle>
                  <CardDescription>Your received messages</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${!message.read ? 'bg-blue-50' : ''}`}
                        onClick={() => { setSelectedMessage(message); setShowCompose(false); }}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            {message.avatarUrl ? (
                              <AvatarImage src={message.avatarUrl} alt={message.sender} />
                            ) : null}
                            <AvatarFallback>{getInitials(message.sender)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className={`text-sm font-medium truncate ${!message.read ? 'font-bold' : ''}`}>{message.sender}</h4>
                              <span className="text-xs text-muted-foreground">
                                {new Date(message.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm font-medium truncate">{message.subject}</p>
                            <p className="text-xs text-muted-foreground truncate">{message.content.substring(0, 60)}...</p>
                          </div>
                        </div>
                        {!message.read && (
                          <div className="mt-2 flex justify-end">
                            <Badge variant="outline" className="bg-blue-100">New</Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compose Message Form */}
              {showCompose && (
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">New Message</CardTitle>
                    <CardDescription>Send a message to hospital staff</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSendMessage}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="recipient" className="text-sm font-medium">To:</label>
                        <Input
                          id="recipient"
                          name="recipient"
                          placeholder="Enter recipient name or department"
                          value={newMessage.recipient}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">Subject:</label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Enter message subject"
                          value={newMessage.subject}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">Message:</label>
                        <Textarea
                          id="content"
                          name="content"
                          placeholder="Type your message here..."
                          rows={10}
                          value={newMessage.content}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setShowCompose(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              )}

              {/* Message Detail View */}
              {selectedMessage && !showCompose && (
                <Card className="md:col-span-2">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
                        <CardDescription>
                          From: {selectedMessage.sender} ({selectedMessage.senderRole})
                        </CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedMessage(null)}
                        className="md:hidden"
                      >
                        Back
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(selectedMessage.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm whitespace-pre-line">{selectedMessage.content}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Mail className="mr-2 h-4 w-4" />
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">Archive</Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Notifications</CardTitle>
                <CardDescription>Updates and alerts from the hospital system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className="flex items-start p-4 border rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <div className="mr-4">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Notifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="announcements">
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <CardDescription>
                      Posted by {announcement.author} on {new Date(announcement.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
