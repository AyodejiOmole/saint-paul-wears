"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { User, Package, Settings, LogOut, Edit } from "lucide-react"
import toast from "react-hot-toast"

import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Address, Order } from "@/types"
import { useUpdateAddress } from "@/hooks/use-update-address"
import { useUserOrders } from "@/hooks/use-user-orders"

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [editAddress, setEditAddress] = useState<Address>({
    address: user?.address?.address || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zipCode: user?.address?.zipCode || "",
    // country: user?.address?.country || "",
  })

  const updateAddress = useUpdateAddress(user?.id ?? "", () => {
    setIsEditingAddress(false);
    toast.success("Address updated successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleSaveAddress = () => {
    console.log("Saving address:", editAddress)

    updateAddress.mutate(editAddress);
  }

  const handleCancelEdit = () => {
    setEditAddress({
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
      // country: user?.address?.country || "",
      address: user?.address?.address || "",
    })
    setIsEditingAddress(false)
  }

  const { data, } = useUserOrders(user?.id);
  const orders = data ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    Welcome Back
                  </Badge>
                  <h1 className="text-[13px] font-bold">Hello, {user.firstName}</h1>
                  <p className="text-[11px] text-muted-foreground">Manage your account and track your orders</p>
                </div>
                <Button variant="outline" onClick={logout} className="flex items-center gap-2 bg-transparent">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-[13px] font-bold">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{ orders.length ?? 0}</div>
                      {/* <p className="text-[11px] text-muted-foreground">+2 from last month</p> */}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-[13px] font-bold">Total Spent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₦{ (orders.reduce((sum: number, order: Order) => sum + order.amount, 0)).toLocaleString() }</div>
                      {/* <p className="text-[11px] text-muted-foreground">+₦240,000 from last month</p> */}
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[13px] font-bold">Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.slice(0, 2).map((order: Order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.createdAt}</p>
                            {/* <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p> */}
                          </div>
                          <div className="text-right">
                            <Badge variant={order.status === "PAID" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
                            <p className="text-sm font-medium mt-1">₦{order.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[13px] font-bold">Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.map((order: Order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.createdAt}</p>
                            {/* <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p> */}
                          </div>
                          <div className="text-right">
                            <Badge variant={order.status === "PAID" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
                            <p className="text-sm font-medium mt-1">₦{(order.amount).toLocaleString()}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 bg-transparent"
                              onClick={() => router.push(`/order/${order.id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-[13px] font-bold">Personal Information</span>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Name</Label>
                        <p className="text-sm text-muted-foreground">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Phone</Label>
                        <p className="text-sm text-muted-foreground">{user.phone || "Not provided"}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Member Since</Label>
                        <p className="text-sm text-muted-foreground">{user.joinDate}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-[13px] font-bold">Shipping Address</span>
                        <Button variant="outline" size="sm" onClick={() => setIsEditingAddress(!isEditingAddress)}>
                          <Edit className="h-4 w-4 mr-2" />
                          {isEditingAddress ? "Cancel" : "Edit"}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isEditingAddress ? (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Address</Label>
                            <Input
                              value={editAddress.address}
                              onChange={(e) => setEditAddress({ ...editAddress, address: e.target.value })}
                              placeholder="Enter address"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Street Address</Label>
                            <Input
                              value={editAddress.street}
                              onChange={(e) => setEditAddress({ ...editAddress, street: e.target.value })}
                              placeholder="Enter street address"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">City</Label>
                              <Input
                                value={editAddress.city}
                                onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })}
                                placeholder="City"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium">State</Label>
                              <Input
                                value={editAddress.state}
                                onChange={(e) => setEditAddress({ ...editAddress, state: e.target.value })}
                                placeholder="State"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">ZIP Code</Label>
                              <Input
                                value={editAddress.zipCode}
                                onChange={(e) => setEditAddress({ ...editAddress, zipCode: e.target.value })}
                                placeholder="ZIP Code"
                              />
                            </div>
                            {/* <div>
                              <Label className="text-sm font-medium">Country</Label>
                              <Input
                                value={editAddress.country}
                                onChange={(e) => setEditAddress({ ...editAddress, country: e.target.value })}
                                placeholder="Country"
                              />
                            </div> */}
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleSaveAddress} disabled={updateAddress.isPending} size="sm">
                              {updateAddress.isPending ? "Saving..." : "Save changes"}
                            </Button>

                            <Button onClick={handleCancelEdit} variant="outline" size="sm">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : user.address ? (
                        <div className="space-y-2">
                          <p className="text-sm">{user.address.street}</p>
                          <p className="text-sm">
                            {user.address.city}, {user.address.state} {user.address.zipCode}
                          </p>
                          {/* <p className="text-sm">{user.address.country}</p> */}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No address provided</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* <Card>
                  <CardHeader>
                    <CardTitle className="text-[13px] font-bold">Account Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Download My Data
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card> */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}
