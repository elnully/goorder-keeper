
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CustomerLayout } from '@/components/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Phone } from 'lucide-react';

export default function CustomerLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1); // 1 = phone entry, 2 = code verification
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would call an API to send a verification code
    // For demo purposes, we'll simulate an API call and move to the next step
    setTimeout(() => {
      toast({
        title: "Verification code sent",
        description: `A 6-digit code has been sent to ${phoneNumber}`,
      });
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would verify the code with an API
    // For demo purposes, we'll simulate an API call and log the user in
    setTimeout(() => {
      // Any code will work for the demo
      if (verificationCode.length === 6) {
        login();
        toast({
          title: "Login successful",
          description: "Welcome to GoOrder!",
        });
        navigate('/');
      } else {
        toast({
          title: "Invalid code",
          description: "Please enter the 6-digit code sent to your phone",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const formatPhoneNumber = (value: string) => {
    // Format as (XXX) XXX-XXXX
    const numbers = value.replace(/\D/g, '');
    const match = numbers.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    
    if (!match) return value;
    
    const formatted = !match[2] 
      ? match[1] 
      : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    setPhoneNumber(formatted);
  };

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Sign in to GoOrder</CardTitle>
              <CardDescription>
                {step === 1 
                  ? "Enter your phone number to receive a verification code" 
                  : "Enter the verification code sent to your phone"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <form onSubmit={handlePhoneSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        placeholder="(123) 456-7890"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? "Sending code..." : "Send Verification Code"}
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerificationSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="code" className="text-sm font-medium">
                        Verification Code
                      </label>
                      <Input
                        id="code"
                        placeholder="123456"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        required
                        disabled={isLoading}
                        maxLength={6}
                      />
                      <div className="text-sm text-right">
                        <button 
                          type="button" 
                          className="text-blue-600 hover:underline" 
                          onClick={() => setStep(1)}
                        >
                          Change phone number
                        </button>
                      </div>
                    </div>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? "Verifying..." : "Verify and Sign In"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                New to GoOrder?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Create an account
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
}
