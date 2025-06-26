
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ParentDashboard from "@/components/dashboard/ParentDashboard";
import DriverDashboard from "@/components/dashboard/DriverDashboard";
import SchoolDashboard from "@/components/dashboard/SchoolDashboard";

const Dashboard = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (profile?.role) {
      case 'parent':
        return <ParentDashboard />;
      case 'driver':
        return <DriverDashboard />;
      case 'school_admin':
        return <SchoolDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
