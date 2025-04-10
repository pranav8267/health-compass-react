
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Sample data for doctors and patients
const doctors = [
  { id: "1", name: "Dr. James Wilson" },
  { id: "2", name: "Dr. Sarah Johnson" },
  { id: "3", name: "Dr. Michael Chen" },
  { id: "4", name: "Dr. Emily Rodriguez" },
];

const patients = [
  { id: "P1001", name: "John Smith" },
  { id: "P1002", name: "Emily Jones" },
  { id: "P1003", name: "Michael Brown" },
  { id: "P1004", name: "Sarah Wilson" },
  { id: "P1005", name: "David Johnson" },
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM"
];

// Form schema
const formSchema = z.object({
  patientId: z.string({
    required_error: "Please select a patient.",
  }),
  doctorId: z.string({
    required_error: "Please select a doctor.",
  }),
  appointmentType: z.string({
    required_error: "Please select an appointment type.",
  }),
  appointmentDate: z.date({
    required_error: "Please select a date.",
  }),
  timeSlot: z.string({
    required_error: "Please select a time slot.",
  }),
  tokenNumber: z.string().optional(),
  notes: z.string().optional(),
});

export default function BookAppointment() {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Appointment Booked",
      description: `Appointment for ${patientName} with ${doctorName} on ${format(values.appointmentDate, "PPP")} at ${values.timeSlot}`,
    });
    navigate('/bookings');
  };

  // Update patient name when patient ID changes
  const handlePatientChange = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setPatientName(patient.name);
    }
  };

  // Update doctor name when doctor ID changes
  const handleDoctorChange = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      setDoctorName(doctor.name);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book an Appointment</h1>
          <p className="text-muted-foreground">Schedule a new appointment for a patient.</p>
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Selection */}
                <FormField
                  control={form.control}
                  name="patientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          handlePatientChange(value);
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a patient" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {patients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id}>
                              {patient.name} ({patient.id})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The patient who needs an appointment.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Doctor Selection */}
                <FormField
                  control={form.control}
                  name="doctorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doctor</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleDoctorChange(value);
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a doctor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The doctor who will attend to the patient.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Appointment Type */}
                <FormField
                  control={form.control}
                  name="appointmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select appointment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="consultation">Consultation</SelectItem>
                          <SelectItem value="followup">Follow-up</SelectItem>
                          <SelectItem value="checkup">Checkup</SelectItem>
                          <SelectItem value="review">Review</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date picker */}
                <FormField
                  control={form.control}
                  name="appointmentDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Appointment Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select the date for the appointment.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Time Slot */}
                <FormField
                  control={form.control}
                  name="timeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Slot</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((timeSlot) => (
                            <SelectItem key={timeSlot} value={timeSlot}>
                              {timeSlot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Available time slots.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Token Number */}
                <FormField
                  control={form.control}
                  name="tokenNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., A001" {...field} />
                      </FormControl>
                      <FormDescription>
                        Optional: Assign a token number for this appointment.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Input placeholder="Additional notes for this appointment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => navigate('/bookings')}>
                  Cancel
                </Button>
                <Button type="submit">Book Appointment</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
