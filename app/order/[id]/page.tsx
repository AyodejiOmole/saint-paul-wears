"use client"

import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react"

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const mockOrderDetails = {
    "SP-001": {
      id: "SP-001",
      date: "2024-01-20",
      status: "Delivered",
      total: 119920, // ₦119,920
      subtotal: 99920,
      shipping: 20000,
      tax: 0,
      items: [
        {
          id: 1,
          name: "Black Premium T-Shirt",
          price: 49960,
          quantity: 1,
          size: "L",
          color: "Black",
          image: "/black-premium-t-shirt-on-model-streetwear.png",
        },
        {
          id: 2,
          name: "Saint Paul Hoodie",
          price: 49960,
          quantity: 1,
          size: "M",
          color: "Black",
          image: "/black-premium-hoodie-streetwear-fashion.png",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Lagos Street",
        city: "Lagos",
        state: "Lagos State",
        zipCode: "100001",
        country: "Nigeria",
        phone: "+234 801 234 5678",
      },
      trackingNumber: "SP2024012001",
      estimatedDelivery: "2024-01-22",
      orderTimeline: [
        { status: "Order Placed", date: "2024-01-20 10:30 AM", completed: true },
        { status: "Payment Confirmed", date: "2024-01-20 10:35 AM", completed: true },
        { status: "Processing", date: "2024-01-20 2:00 PM", completed: true },
        { status: "Shipped", date: "2024-01-21 9:00 AM", completed: true },
        { status: "Delivered", date: "2024-01-22 3:45 PM", completed: true },
      ],
    },
    "SP-002": {
      id: "SP-002",
      date: "2024-01-15",
      status: "Shipped",
      total: 71960,
      subtotal: 59960,
      shipping: 12000,
      tax: 0,
      items: [
        {
          id: 3,
          name: "Premium Joggers",
          price: 59960,
          quantity: 1,
          size: "L",
          color: "Black",
          image: "/black-premium-joggers-pants-streetwear.png",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Lagos Street",
        city: "Lagos",
        state: "Lagos State",
        zipCode: "100001",
        country: "Nigeria",
        phone: "+234 801 234 5678",
      },
      trackingNumber: "SP2024011501",
      estimatedDelivery: "2024-01-18",
      orderTimeline: [
        { status: "Order Placed", date: "2024-01-15 2:15 PM", completed: true },
        { status: "Payment Confirmed", date: "2024-01-15 2:20 PM", completed: true },
        { status: "Processing", date: "2024-01-16 10:00 AM", completed: true },
        { status: "Shipped", date: "2024-01-17 11:30 AM", completed: true },
        { status: "Out for Delivery", date: "2024-01-18 8:00 AM", completed: false },
      ],
    },
  }

  const order = mockOrderDetails[orderId as keyof typeof mockOrderDetails]

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
              <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist.</p>
              <Button onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "shipped":
      case "out for delivery":
        return <Truck className="h-5 w-5 text-blue-600" />
      case "processing":
        return <Package className="h-5 w-5 text-yellow-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button variant="outline" onClick={() => router.push("/dashboard")} className="mb-4 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-3xl font-bold">Order #{order.id}</h1>
                  <p className="text-muted-foreground">Placed on {order.date}</p>
                </div>
                <Badge variant={order.status === "Delivered" ? "default" : "secondary"} className="text-sm px-3 py-1">
                  {getStatusIcon(order.status)}
                  <span className="ml-2">{order.status}</span>
                </Badge>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Order Items */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size} • Color: {item.color}
                            </p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₦{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Order Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.orderTimeline.map((timeline, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div
                            className={`w-3 h-3 rounded-full ${timeline.completed ? "bg-green-600" : "bg-gray-300"}`}
                          />
                          <div className="flex-1">
                            <p
                              className={`font-medium ${
                                timeline.completed ? "text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {timeline.status}
                            </p>
                            <p className="text-sm text-muted-foreground">{timeline.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary & Shipping */}
              <div className="space-y-6">
                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₦{order.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>₦{order.shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₦{order.tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₦{order.total.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">{order.shippingAddress.name}</p>
                      <p className="text-sm text-muted-foreground">{order.shippingAddress.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                      </p>
                      <p className="text-sm text-muted-foreground">{order.shippingAddress.country}</p>
                      <p className="text-sm text-muted-foreground">{order.shippingAddress.phone}</p>
                    </div>

                    {order.trackingNumber && (
                      <div>
                        <Separator className="my-4" />
                        <div>
                          <p className="text-sm font-medium">Tracking Number</p>
                          <p className="text-sm text-muted-foreground font-mono">{order.trackingNumber}</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium">Estimated Delivery</p>
                          <p className="text-sm text-muted-foreground">{order.estimatedDelivery}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    Track Package
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    Contact Support
                  </Button>
                  {order.status === "Delivered" && <Button className="w-full">Reorder Items</Button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
