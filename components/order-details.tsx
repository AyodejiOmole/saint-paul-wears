"use client";

import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react"

import { useRouter } from "next/navigation"
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
                  <p className="text-muted-foreground">Placed on {order.createdAt}</p>
                </div>
                <Badge variant={order.status === "PAID" ? "default" : "secondary"} className="text-sm px-3 py-1">
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
                {/* <Card>
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
                </Card> */}
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
                      <span>₦{order.subTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>₦{order.deliveryFee.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₦{order.amount.toLocaleString()}</span>
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
                      <p className="font-medium">{order.deliveryAddress.address}</p>
                      <p className="text-sm text-muted-foreground">{order.deliveryAddress.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                      </p>
                      <p className="text-sm text-muted-foreground">{order.deliveryAddress.country}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="space-y-3">
                  {/* <Button className="w-full bg-transparent" variant="outline">
                    Track Package
                  </Button> */}
                  <Button className="w-full bg-transparent" variant="outline">
                    Contact Support
                  </Button>
                  {order.status === "FAILED" && <Button className="w-full">Reorder Items</Button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}