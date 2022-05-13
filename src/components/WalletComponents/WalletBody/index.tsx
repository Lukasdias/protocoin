import React from 'react'
import Background from './../../../public/wallet-background.jpg'
import { SendSection } from '../SendSection/index'
import { Transactions } from '../Transactions/index'

export function Wallet() {
  return (
    <div className="flex flex-1 p-8 bg-gradient-to-b from-proto-dashboard-background">
      {/* <img
        src={Background}
        alt="background"
        className="absolute top-0 left-0 w-screen h-screen opacity-20"
      /> */}
      <div className="flex flex-col gap-4 w-full h-full sm:flex-row">
        <SendSection />
        <Transactions />
      </div>
    </div>
  )
}
