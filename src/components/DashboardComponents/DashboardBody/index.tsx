import React from 'react'
import { DashboardTable } from '../DashboardTable/index'

export function Dashboard() {
  return (
    <div className="flex relative flex-col  px-5 w-screen h-screen bg-proto-dashboard-background">
      <header className="flex flex-col gap-4 mt-8">
        <h1 className=" text-4xl text-white">Nosso Catálogo</h1>
        <p className="text-white">Lista de Criptomoedas diponíveis para você</p>
      </header>
      <DashboardTable />
    </div>
  )
}
