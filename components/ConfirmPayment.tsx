'use client';

import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '@/lib/firebase';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, Package } from 'lucide-react';

export default function ConfirmPayment() {
  const params = useSearchParams();
  const orderId = params.get('orderId');
  const reference = params.get('reference');
  const [status, setStatus] = useState('LOADING');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!orderId) return;
    
    if (reference) {
      fetch(`/api/paystack/verify?reference=${reference}&orderId=${orderId}`).catch(() => {});
    }
    
    const unsub = onValue(ref(db, `orders/${orderId}/status`), (snap) => {
        const newStatus = snap.val();
        setStatus(newStatus);
        
        if (newStatus === 'PAID') {
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }
    });
    
    return () => unsub();
  }, [orderId, reference, router]);

  const getStatusDisplay = () => {
    switch(status) {
      case 'PAID':
        return {
          icon: <CheckCircle className="h-24 w-24 text-green-500 animate-bounce" />,
          title: 'PAYMENT CONFIRMED!',
          message: '🎉 Your order has been successfully placed!',
          bgColor: 'from-green-600/20 to-green-800/20',
          borderColor: 'border-green-500'
        };
      case 'FAILED':
        return {
          icon: <XCircle className="h-24 w-24 text-red-500" />,
          title: 'PAYMENT FAILED',
          message: '❌ Something went wrong with your payment.',
          bgColor: 'from-red-600/20 to-red-800/20',
          borderColor: 'border-red-500'
        };
      case 'LOADING':
      case 'CREATED':
      case 'INITIATED':
      case 'AWAITING_WEBHOOK':
      case 'PENDING':
      default:
        return {
          icon: <Loader2 className="h-24 w-24 text-yellow-500 animate-spin" />,
          title: 'PROCESSING PAYMENT',
          message: '⏳ Please wait while we confirm your payment...',
          bgColor: 'from-yellow-600/20 to-orange-800/20',
          borderColor: 'border-yellow-500'
        };
    }
  };

  const display = getStatusDisplay();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 overflow-hidden">
      {/* Floating Cursor */}
      <div 
        // className="fixed w-6 h-6 bg-red-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100"
        // style={{
        //   left: `${mousePosition.x - 12}px`,
        //   top: `${mousePosition.y - 12}px`,
        // }}
      />

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/5 to-purple-900/5" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-bounce" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className={`bg-gradient-to-br ${display.bgColor} backdrop-blur-sm border-2 ${display.borderColor} rounded-3xl p-12 shadow-2xl text-center transform hover:scale-105 transition-all duration-300`}>
          
          {/* Icon */}
          <div className="flex justify-center mb-8">
            {display.icon}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-none text-white">
            {display.title}
          </h1>

          {/* Message */}
          <p className="text-2xl text-gray-300 mb-8">
            {display.message}
          </p>

          {/* Order Info */}
          <div className="bg-black/30 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Package className="h-6 w-6 text-red-500" />
              <p className="text-lg font-bold text-gray-400 uppercase">Order ID</p>
            </div>
            <p className="text-3xl font-black text-white">#{orderId}</p>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex space-x-2">
              <div className={`w-3 h-3 rounded-full ${status === 'PAID' ? 'bg-green-500' : status === 'FAILED' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`}></div>
              <div className={`w-3 h-3 rounded-full ${status === 'PAID' ? 'bg-green-500' : 'bg-gray-600'} ${status !== 'PAID' && status !== 'FAILED' ? 'animate-pulse' : ''}`}></div>
              <div className={`w-3 h-3 rounded-full ${status === 'PAID' ? 'bg-green-500' : 'bg-gray-600'}`}></div>
            </div>
          </div>

          {/* Additional Info */}
          {status === 'PAID' && (
            <p className="mt-8 text-lg text-gray-400">
              Redirecting to your dashboard...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}