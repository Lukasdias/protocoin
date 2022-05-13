import React from 'react'

interface SendTransactionButtonProps {
  disabled?: boolean
  onButtonClick: () => void
  text: string
}

export function SendTransactionButton({
  disabled,
  text,
  onButtonClick
}: SendTransactionButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onButtonClick}
      className="group flex relative justify-center items-center  px-10 w-auto h-[50] font-bold  hover:text-proto-brand
    focus:text-proto-brand bg-proto-brand hover:bg-transparent focus:bg-black rounded-md border-2
    border-none focus-within:border-none focus:border-none focus-visible:outline-none
    focus-within::ring-2 hover:ring-2 focus:ring-2 focus-within::ring-proto-brand
    hover:ring-proto-brand focus:ring-proto-brand focus-within::ring-offset-2 hover:ring-offset-2
    focus:ring-offset-2 focus-within::ring-offset-transparent hover:ring-offset-transparent focus:ring-offset-transparent transition
    duration-200 sm:py-3
    sm:h-[50px]
    "
    >
      {text}
    </button>
  )
}
