interface BitcoinAmountButton {
  onSelectBitcoinAmount: () => void
  text: string
}

export function BitcoinAmountButton({
  text,
  onSelectBitcoinAmount
}: BitcoinAmountButton) {
  return (
    <button
      // onClick={onButtonClick}
      onClick={onSelectBitcoinAmount}
      type="button"
      className="group flex relative justify-center items-center py-2  px-4 min-w-[66px] h-[32px] text-xs font-bold  hover:text-proto-brand
focus:text-proto-brand bg-proto-brand hover:bg-transparent focus:bg-black rounded-md border-2
border-none focus-within:border-none focus:border-none focus-visible:outline-none
focus-within::ring-2 hover:ring-2 focus:ring-2 focus-within::ring-proto-brand
hover:ring-proto-brand focus:ring-proto-brand focus-within::ring-offset-2 hover:ring-offset-2
focus:ring-offset-2 focus-within::ring-offset-transparent hover:ring-offset-transparent focus:ring-offset-transparent transition
duration-200 active:animate-pulse
"
    >
      {text}
    </button>
  )
}
