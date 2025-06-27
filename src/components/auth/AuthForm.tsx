import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";
import { Mail } from "lucide-react";

type UserRole = Database['public']['Enums']['user_role'];

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    role: 'parent' as UserRole
  });
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (signUpError) throw signUpError;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const { error: dbError } = await supabase
      .from("profiles")
      .insert({
        id: userData.user.id, // Ensure your `profiles` table has `id` as UUID
        email: formData.email,
        full_name: formData.fullName,
        phone: formData.phone,
        role: formData.role,
      });

    if (dbError) throw dbError;

    setEmailSent(true);
    toast({
      title: "Check your email!",
      description: "We've sent you a confirmation link. Please check your email and click the link to activate your account.",
    });
  } catch (error: any) {
    toast({
      title: "Error creating account",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email not confirmed",
            description: "Please check your email and click the confirmation link before signing in.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!formData.email) {
      toast({
        title: "Email required",
        description: "Please enter your email address first.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: formData.email,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      toast({
        title: "Confirmation email sent",
        description: "Please check your email for the new confirmation link.",
      });
    } catch (error: any) {
      toast({
        title: "Error sending email",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ... (The rest of your component JSX remains unchanged)

  return (
    // Your JSX remains unchanged...
    // Sign In and Sign Up forms as you had it
  );
};

export default AuthForm;

