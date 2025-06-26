
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, User, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Database } from "@/integrations/supabase/types";

type Student = Database['public']['Tables']['students']['Row'];
type Ride = Database['public']['Tables']['rides']['Row'];

const ParentDashboard = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStudents();
      fetchRides();
    }
  }, [user]);

  const fetchStudents = async () => {
    const { data } = await supabase
      .from('students')
      .select('*')
      .eq('parent_id', user?.id);
    
    if (data) setStudents(data);
  };

  const fetchRides = async () => {
    const { data } = await supabase
      .from('rides')
      .select(`
        *,
        students:student_id (name, grade)
      `)
      .in('student_id', students.map(s => s.id))
      .order('scheduled_time', { ascending: true });
    
    if (data) setRides(data);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Students Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card key={student.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                {student.name}
              </CardTitle>
              <CardDescription>Grade {student.grade}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  {student.pickup_address}
                </div>
                {student.emergency_contact && (
                  <div className="text-sm text-gray-600">
                    Emergency: {student.emergency_contact}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Rides */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Rides</CardTitle>
          <CardDescription>Track your children's commute schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rides.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No rides scheduled</p>
            ) : (
              rides.map((ride) => (
                <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">
                      {(ride as any).students?.name}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="mr-1 h-4 w-4" />
                      {new Date(ride.scheduled_time).toLocaleString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-1 h-4 w-4" />
                      {ride.pickup_address} → {ride.dropoff_address}
                    </div>
                  </div>
                  <Badge className={getStatusColor(ride.status || '')}>
                    {ride.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentDashboard;
