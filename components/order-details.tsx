"use client";

import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Order } from "@/types";

interface OrderDetailsProps {
    order: Order
}

export default function OrderDetails({ order }: OrderDetailsProps) {
    const router = useRouter();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const handleMouseMove = (e: { clientX: any; clientY: any; }) => setMousePosition({ x: e.clientX, y: e.clientY });
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
        case "delivered":
        case "paid":
            return <CheckCircle className="h-6 w-6 text-green-500" />
        case "shipped":
        case "out for delivery":
            return <Truck className="h-6 w-6 text-blue-500" />
        case "processing":
            return <Package className="h-6 w-6 text-yellow-500" />
        default:
            return <Clock className="h-6 w-6 text-gray-500" />
        }
    }

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Floating Cursor */}
        <div 
          // className="fixed w-6 h-6 bg-red-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100"
          // style={{
          //   left: `${mousePosition.x - 12}px`,
          //   top: `${mousePosition.y - 12}px`,
          // }}
        />

        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4">
            
            {/* Header */}
            <div className="mb-12">
              <Button 
                variant="outline" 
                onClick={() => router.push("/dashboard")} 
                className="mb-8 bg-gray-900 border-red-900/30 text-white hover:bg-red-600 hover:border-red-600 h-14 px-6 text-lg font-bold"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                BACK TO DASHBOARD
              </Button>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none">
                    <span className="block text-white">ORDER</span>
                    <span className="block text-red-500">#{order.id}</span>
                  </h1>
                  <p className="text-xl text-gray-400">Placed on {order.createdAt}</p>
                </div>
                
                <Badge className={`text-xl px-6 py-4 font-black flex items-center gap-3 ${
                  order.status === "PAID" ? "bg-green-600" : "bg-yellow-600"
                }`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </Badge>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Order Items */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-gray-900 border-2 border-red-900/30 rounded-2xl p-8 shadow-2xl">
                  <h2 className="text-3xl font-black text-white mb-8 uppercase">Order Items</h2>
                  <div className="space-y-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-6 p-6 bg-black border border-red-900/30 rounded-xl hover:border-red-500/50 transition-all duration-300">
                        <div className="w-24 h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-xl text-white mb-2">{item.name}</h3>
                          <p className="text-gray-400 text-lg mb-1">
                            Size: <span className="text-red-400 font-bold">{item.size}</span> • 
                            Color: <span className="text-red-400 font-bold">{item.color}</span>
                          </p>
                          <p className="text-gray-400 text-lg">
                            Quantity: <span className="text-white font-bold">{item.quantity}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-red-500">₦{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Order Summary */}
                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 shadow-2xl border-2 border-red-500">
                  <h2 className="text-2xl font-black text-white mb-6 uppercase">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span className="text-red-100">Subtotal</span>
                      <span className="font-bold text-white">₦{order.subTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-red-100">Shipping</span>
                      <span className="font-bold text-white">₦{order.deliveryFee.toLocaleString()}</span>
                    </div>
                    <Separator className="bg-red-400/30" />
                    <div className="flex justify-between text-2xl font-black">
                      <span className="text-white">Total</span>
                      <span className="text-white">₦{order.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-gray-900 border-2 border-red-900/30 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="h-8 w-8 text-red-500" />
                    <h2 className="text-2xl font-black text-white uppercase">Shipping Info</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-xl text-white mb-1">{order.deliveryAddress.address}</p>
                      <p className="text-gray-400 text-lg">{order.deliveryAddress.street}</p>
                      <p className="text-gray-400 text-lg">
                        {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                      </p>
                      <p className="text-gray-400 text-lg">{order.deliveryAddress.country}</p>
                    </div>
                    <Separator className="bg-gray-700" />
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-red-500" />
                      <p className="text-white text-lg">{order.customer.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-transparent border-2 border-red-600 text-red-400 hover:bg-red-600 hover:text-white h-14 text-lg font-black transition-all duration-300"
                    onClick={() => router.push('/contact')}
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    CONTACT SUPPORT
                  </Button>
                  {order.status === "FAILED" && (
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white h-14 text-lg font-black">
                      <Package className="h-5 w-5 mr-2" />
                      REORDER ITEMS
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
