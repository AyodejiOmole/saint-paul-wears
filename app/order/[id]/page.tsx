// "use client"

// import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react"
import { notFound } from "next/navigation"

import { Navigation } from "@/components/navigation"
import { getOrderById } from "@/lib/orders"
import OrderDetails from "@/components/order-details"

interface OrderPageProps {
  params: {
    id: string
  }
};

export default async function OrderDetailsPage({ params }: OrderPageProps) {
  const order = await getOrderById(params.id);

  if (!order) {
    notFound()
  }

  // if (!order) {
  //   return (
  //     <div className="min-h-screen bg-background">
  //       <Navigation />
  //       <div className="pt-24 pb-16">
  //         <div className="container mx-auto px-4">
  //           <div className="max-w-4xl mx-auto text-center">
  //             <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
  //             <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist.</p>
  //             <Button onClick={() => router.push("/dashboard")}>
  //               <ArrowLeft className="h-4 w-4 mr-2" />
  //               Back to Dashboard
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <OrderDetails order={order}/>
    </div>
  )
}
