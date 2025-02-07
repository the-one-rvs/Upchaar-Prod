import React from 'react'
import { useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {

    const searchQuery = useSearchParams()[0]

    const referenceNum = searchQuery.get("reference")
  return (
    <div style={{ padding: "0 100px", margin: "0 100px"}}>
      <h1>Order SuccessFull</h1>
      <p>Reference No.{referenceNum}</p>
    </div>
  )
}

export default PaymentSuccess