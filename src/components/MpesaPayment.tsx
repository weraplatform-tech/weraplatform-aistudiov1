import { useState } from 'react';
import { Button, Card, Input } from './ui';
import { Smartphone, CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';

export const MpesaPayment = ({ amount, orderId, onSuccess }: { amount: number; orderId: string; onSuccess: () => void }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');

  const handlePayment = async () => {
    setLoading(true);
    setStep('processing');
    try {
      // Call our backend proxy
      await axios.post('/api/payments/stkpush', { amount, phone, orderId });
      
      // Simulate waiting for callback
      setTimeout(() => {
        setStep('success');
        setTimeout(onSuccess, 2000);
      }, 3000);
    } catch (error) {
      alert('Payment failed. Please try again.');
      setStep('input');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-sm mx-auto">
      {step === 'input' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold">M-Pesa Payment</h3>
              <p className="text-xs text-gray-500">Fast & Secure</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-center py-4">
            KES {amount.toLocaleString()}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input 
              placeholder="e.g. 0712345678" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <Button 
            variant="secondary" 
            className="w-full bg-[#4CAF50] hover:bg-[#43A047]"
            onClick={handlePayment}
            disabled={!phone || loading}
          >
            Pay with M-Pesa
          </Button>
        </div>
      )}

      {step === 'processing' && (
        <div className="text-center py-8 space-y-4">
          <Loader2 className="w-12 h-12 text-wera-cyan animate-spin mx-auto" />
          <h3 className="font-bold text-lg">Processing Payment</h3>
          <p className="text-sm text-gray-500">Please check your phone for the M-Pesa PIN prompt.</p>
        </div>
      )}

      {step === 'success' && (
        <div className="text-center py-8 space-y-4">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
          <h3 className="font-bold text-lg">Payment Successful!</h3>
          <p className="text-sm text-gray-500">Your transaction has been completed.</p>
        </div>
      )}
    </Card>
  );
};
