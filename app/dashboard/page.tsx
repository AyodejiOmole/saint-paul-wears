"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { User, Package, Settings, LogOut, Edit, TrendingUp, ShoppingBag, Zap } from "lucide-react"
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [editAddress, setEditAddress] = useState<Address>({
    address: user?.address?.address || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zipCode: user?.address?.zipCode || "",
  })

  const updateAddress = useUpdateAddress(user?.id ?? "", () => {
    setIsEditingAddress(false);
    toast.success("Address updated successfully!", {
      style: {
        background: '#dc2626',
        color: '#ffffff',
        fontWeight: 'bold'
      }
    });

    let savedUser;
    const savedStorage = localStorage.getItem("saint-paul-user");
    if (savedStorage) {
      savedUser = JSON.parse(savedStorage);
    }
    localStorage.setItem("saint-paul-user", JSON.stringify({ ...savedUser, address: editAddress }));
    
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: { clientX: any; clientY: any }) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSaveAddress = () => {
    updateAddress.mutate(editAddress);
  }

  const handleCancelEdit = () => {
    setEditAddress({
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
      address: user?.address?.address || "",
    })
    setIsEditingAddress(false)
  }

  const { data } = useUserOrders(user?.id);
  const orders = data ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-xl font-bold">Loading Dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* Floating Cursor Effect */}
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
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" 
             style={{ transform: `translate(${scrollY * 0.2}px, ${scrollY * -0.1}px)` }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-bounce" 
             style={{ transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.2}px)` }} />
      </div>

      <div className="relative z-10 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <Badge className="bg-red-600 text-white text-lg px-6 py-3 font-black tracking-widest mb-4 animate-pulse">
                  DASHBOARD
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none">
                  <span className="block text-white">HELLO,</span>
                  <span className="block text-red-500">{user.firstName.toUpperCase()}</span>
                </h1>
                <p className="text-xl text-gray-400">Manage your account and track your orders</p>
              </div>
              
              <Button 
                variant="outline" 
                onClick={logout} 
                className="bg-gray-900 border-red-900/30 text-white hover:bg-red-600 hover:border-red-600 h-14 px-8 text-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                <LogOut className="h-5 w-5 mr-2" />
                SIGN OUT
              </Button>
            </div>
          </div>

           {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900 border-2 border-red-900/30 h-16 mb-12">
              <TabsTrigger 
                value="overview" 
                className="flex items-center gap-3 text-lg font-bold text-white data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-300"
              >
                <User className="h-5 w-5" />
                OVERVIEW
              </TabsTrigger>
              <TabsTrigger 
                value="orders" 
                className="flex items-center gap-3 text-lg font-bold text-white data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-300"
              >
                <Package className="h-5 w-5" />
                ORDERS
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="flex items-center gap-3 text-lg font-bold text-white data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-300"
              >
                <Settings className="h-5 w-5" />
                SETTINGS
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Total Orders Card */}
                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-red-500">
                  <div className="flex items-center justify-between mb-6">
                    <Package className="h-12 w-12 text-white" />
                    <div className="bg-white/20 p-3 rounded-full">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white/80 mb-2 uppercase tracking-wider">Total Orders</h3>
                  <div className="text-5xl font-black text-white mb-2">{orders.length ?? 0}</div>
                  <p className="text-red-100">All time purchases</p>
                </div>

                {/* Total Spent Card */}
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-purple-500">
                  <div className="flex items-center justify-between mb-6">
                    <ShoppingBag className="h-12 w-12 text-white" />
                    <div className="bg-white/20 p-3 rounded-full">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white/80 mb-2 uppercase tracking-wider">Total Spent</h3>
                  <div className="text-5xl font-black text-white mb-2">
                    ₦{(orders.reduce((sum: number, order: Order) => sum + order.amount, 0)).toLocaleString()}
                  </div>
                  <p className="text-purple-100">Lifetime value</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-gray-900 border-2 border-red-900/30 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-wider">Recent Orders</h2>
                <div className="space-y-6">
                  {orders.length > 0 ? orders.slice(0, 3).map((order: Order) => (
                    <div 
                      key={order.id} 
                      className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-black border border-red-900/30 rounded-xl hover:border-red-500/50 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="mb-4 md:mb-0">
                        <p className="font-black text-xl text-white mb-2">ORDER #{order.id}</p>
                        <p className="text-gray-400 text-lg">{order.createdAt}</p>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <Badge 
                          className={`text-lg px-4 py-2 font-black ${
                            order.status === "PAID" 
                              ? "bg-green-600 text-white" 
                              : "bg-yellow-600 text-white"
                          }`}
                        >
                          {order.status}
                        </Badge>
                        <p className="text-2xl font-black text-red-500">₦{order.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-xl text-gray-400 font-bold">No orders yet</p>
                      <Button 
                        onClick={() => router.push('/shop')} 
                        className="mt-6 bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-black"
                      >
                        START SHOPPING
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-8">
              <div className="bg-gray-900 border-2 border-red-900/30 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-wider">Order History</h2>
                <div className="space-y-6">
                  {orders.length > 0 ? orders.map((order: Order) => (
                    <div 
                      key={order.id} 
                      className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-black border border-red-900/30 rounded-xl hover:border-red-500/50 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="mb-4 md:mb-0">
                        <p className="font-black text-xl text-white mb-2">ORDER #{order.id}</p>
                        <p className="text-gray-400 text-lg">{order.createdAt}</p>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <Badge 
                          className={`text-lg px-4 py-2 font-black ${
                            order.status === "PAID" 
                              ? "bg-green-600 text-white" 
                              : "bg-yellow-600 text-white"
                          }`}
                        >
                          {order.status}
                        </Badge>
                        <p className="text-2xl font-black text-red-500">₦{(order.amount).toLocaleString()}</p>
                        <Button
                          variant="outline"
                          className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white font-bold transition-all duration-300"
                          onClick={() => router.push(`/order/${order.id}`)}
                        >
                          VIEW DETAILS
                        </Button>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-xl text-gray-400 font-bold">No orders yet</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="bg-gray-900 border-2 border-red-900/30 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-white uppercase">Personal Info</h2>
                    <Button variant="outline" className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white font-bold">
                      <Edit className="h-4 w-4 mr-2" />
                      EDIT
                    </Button>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-red-400 font-bold text-lg mb-2">NAME</Label>
                      <p className="text-white text-xl">{user.firstName} {user.lastName}</p>
                    </div>
                    <div>
                      <Label className="text-red-400 font-bold text-lg mb-2">EMAIL</Label>
                      <p className="text-white text-xl">{user.email}</p>
                    </div>
                    <div>
                      <Label className="text-red-400 font-bold text-lg mb-2">PHONE</Label>
                      <p className="text-white text-xl">{user.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <Label className="text-red-400 font-bold text-lg mb-2">MEMBER SINCE</Label>
                      <p className="text-white text-xl">{user.joinDate}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-gray-900 border-2 border-red-900/30 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-white uppercase">Shipping Address</h2>
                    <Button 
                      variant="outline" 
                      className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white font-bold"
                      onClick={() => setIsEditingAddress(!isEditingAddress)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditingAddress ? "CANCEL" : "EDIT"}
                    </Button>
                  </div>
                  {isEditingAddress ? (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-red-400 font-bold mb-2">ADDRESS</Label>
                        <Input
                          value={editAddress.address}
                          onChange={(e) => setEditAddress({ ...editAddress, address: e.target.value })}
                          placeholder="Enter address"
                          className="bg-gray-800 border-gray-700 text-white h-14 text-lg"
                        />
                      </div>
                      <div>
                        <Label className="text-red-400 font-bold mb-2">STREET ADDRESS</Label>
                        <Input
                          value={editAddress.street}
                          onChange={(e) => setEditAddress({ ...editAddress, street: e.target.value })}
                          placeholder="Enter street address"
                          className="bg-gray-800 border-gray-700 text-white h-14 text-lg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-red-400 font-bold mb-2">CITY</Label>
                          <Input
                            value={editAddress.city}
                            onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })}
                            placeholder="City"
                            className="bg-gray-800 border-gray-700 text-white h-14 text-lg"
                          />
                        </div>
                        <div>
                          <Label className="text-red-400 font-bold mb-2">STATE</Label>
                          <Input
                            value={editAddress.state}
                            onChange={(e) => setEditAddress({ ...editAddress, state: e.target.value })}
                            placeholder="State"
                            className="bg-gray-800 border-gray-700 text-white h-14 text-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-red-400 font-bold mb-2">ZIP CODE</Label>
                        <Input
                          value={editAddress.zipCode}
                          onChange={(e) => setEditAddress({ ...editAddress, zipCode: e.target.value })}
                          placeholder="ZIP Code"
                          className="bg-gray-800 border-gray-700 text-white h-14 text-lg"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button 
                          onClick={handleSaveAddress} 
                          disabled={updateAddress.isPending}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white h-14 text-lg font-black"
                        >
                          {updateAddress.isPending ? "SAVING..." : "SAVE CHANGES"}
                        </Button>
                        <Button 
                          onClick={handleCancelEdit} 
                          variant="outline"
                          className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 h-14 text-lg font-bold"
                        >
                          CANCEL
                        </Button>
                      </div>
                    </div>
                  ) : user.address ? (
                    <div className="space-y-4">
                      <p className="text-white text-lg">{user.address.address}</p>
                      <p className="text-white text-lg">{user.address.street}</p>
                      <p className="text-white text-lg">
                        {user.address.city}, {user.address.state} {user.address.zipCode}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 text-lg mb-6">No address provided</p>
                      <Button 
                        onClick={() => setIsEditingAddress(true)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold"
                      >
                        ADD ADDRESS
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}