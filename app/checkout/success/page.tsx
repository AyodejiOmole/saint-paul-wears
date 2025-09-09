import { Suspense } from "react";

import ConfirmPayment from "@/components/ConfirmPayment";

const SuccessPage = () => {
  return (
    <Suspense>
      <ConfirmPayment />
    </Suspense>
  )
}

export default SuccessPage;
