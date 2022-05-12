import { PhosphorLogo } from 'phosphor-react'
import React from 'react'
import { ShoppingCart } from 'phosphor-react'

interface BuyCryptoButtonProps {
  cryptoID: number
}

export function BuyCryptoButton({ cryptoID }: BuyCryptoButtonProps) {
  return (
    <button
      className="flex gap-2 justify-center items-center px-4 h-10 font-bold text-proto-brand hover:text-white focus:text-white rounded-xl
    border-2 focus:border-0 border-proto-brand hover:border-white outline-none focus:ring-2 focus:ring-white transition duration-200"
    >
      <ShoppingCart weight="bold" className="w-6 h-6" />
      Comprar
    </button>
  )
}
