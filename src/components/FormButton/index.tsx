import React, { ButtonHTMLAttributes } from 'react'
import { ArrowRight, Check } from 'phosphor-react'

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon: 'arrow' | 'check'
}

export function FormButton({ ...props }: FormButtonProps) {
  return (
    <button
      type="submit"
      className="group grid relative grid-cols-3 py-3 px-5 w-full h-[50px] focus:text-white
    bg-proto-brand hover:bg-transparent focus:bg-black rounded-md border-2 border-none
    focus-within:border-none focus:border-none focus-visible:outline-none focus-within::ring-2
    hover:ring-2 focus:ring-2 focus-within::ring-proto-brand hover:ring-proto-brand
    focus:ring-proto-brand focus-within::ring-offset-2 hover:ring-offset-2 focus:ring-offset-2
    focus-within::ring-offset-transparent hover:ring-offset-transparent focus:ring-offset-transparent transition duration-200
    "
    >
      <div></div>
      <span className="flex justify-center items-center text-base font-bold group-hover:text-white transition duration-200">
        {props.text}
      </span>

      {props.icon === 'arrow' && (
        <ArrowRight
          weight="light"
          className="my-auto ml-auto w-6 h-6 group-hover:text-white transition duration-200 group-hover:translate-x-2 group-focus:translate-x-2  "
        />
      )}

      {props.icon === 'check' && (
        <Check
          weight="light"
          className="my-auto ml-auto w-6 h-6 group-hover:text-white transition duration-200 group-hover:scale-110 group-focus:scale-110"
        />
      )}
    </button>
  )
}
