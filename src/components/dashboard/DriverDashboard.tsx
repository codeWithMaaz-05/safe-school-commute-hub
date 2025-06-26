
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, User, Star, Navigation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Database } from "@/integrations/supabase/types";

type Ride = Database['public']['Tables']['rides']['Row'];
type Driver = Database['public']['Tables']['drivers']['Row'];

const DriverDashboard = () => {
  const { user } = useAuth();
  const [rides, setRides] = useState<Ride[]>([]);
  const [driverInfo, setDriverInfo] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDriverInfo();
      fetchRides();
    }
  }, [user]);

  const fetchDriverInfo = async () => {
    const { data } = await supabase
      .from('drivers')
      .select('*')
      .eq('id', user?.id)
      .single();
    
    if (data) setDriverInfo(data);
  };

  const fetchRides = async () => {
    const { data } = await supabase
      .from('rides')
      .select(`
        *,
        students:student_id (name, grade, pickup_address)
      `)
      .eq('driver_id', user?.id)
      .order('scheduled_time', { ascending: true });
    
    if (data) setRides(data);
    setLoading(false);
  };

  const updateRideStatus = async (rideId: string, status: string) => {
    const { error } = await supabase
      .from('rides')
      .update({ 
        status: status as any,
        pickup_time: status === 'in_progress' ? new Date().toISOString() : undefined,
        dropoff_time: status === 'completed' ? new Date().toISOString() : undefined
      })
      .eq('id', rideId);

    if (!error) {
      fetchRides();
    }
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
        <h1 className="text-3xl font-bold">Driver Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="font-medium">{driverInfo?.rating?.toFixed(1) || '0.0'}</span>
        </div>
      </div>

      {/* Driver Info */}
      {driverInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Vehicle Number</p>
                <p className="font-medium">{driverInfo.vehicle_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vehicle Type</p>
                <p className="font-medium">{driverInfo.vehicle_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Experience</p>
                <p className="font-medium">{driverInfo.experience_years} years</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Rides */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Rides</CardTitle>
          <CardDescription>Manage your assigned rides</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rides.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No rides assigned</p>
            ) : (
              rides.map((ride) => (
                <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      {(ride as any).students?.name} - Grade {(ride as any).students?.grade}
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
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(ride.status || '')}>
                      {ride.status}
                    </Badge>
                    {ride.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        onClick={() => updateRideStatus(ride.id, 'in_progress')}
                      >
                        <Navigation className="mr-1 h-4 w-4" />
                        Start
                      </Button>
                    )}
                    {ride.status === 'in_progress' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateRideStatus(ride.id, 'completed')}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverDashboard;
