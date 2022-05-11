import React, { InputHTMLAttributes, LegacyRef, ReactElement } from 'react'
import { Lock, UserCircle, At } from 'phosphor-react'
import { Field } from 'formik'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean
  icon?: 'password' | 'user' | 'email'
}

export function FormInput({ ...props }: FormInputProps) {
  return (
    <div className="group flex relative w-full bg-black">
      {props.isInvalid ? (
        <>
          <Field
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            className="invalid: py-4 w-full placeholder:text-base text-proto-stroke placeholder:text-proto-stroke bg-black bg-none rounded-md border-2 focus-within:border-transparent focus:border-transparent border-none ring-2 focus:ring-2 ring-proto-wallet-down focus-within:ring-proto-wallet-down focus:ring-proto-wallet-down focus:ring-offset-2 focus-within:ring-offset-black focus:ring-offset-black transition"
          />
        </>
      ) : (
        <>
          <Field
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            className="py-4 w-full placeholder:text-base text-proto-stroke placeholder:text-proto-stroke bg-black bg-none rounded-md border-2 border-proto-stroke focus-within:border-transparent focus:border-transparent ring-0 focus:ring-2 focus-within:ring-proto-brand focus:ring-proto-brand focus:ring-offset-2 focus-within:ring-offset-black focus:ring-offset-black transition "
          />
        </>
      )}

      {props.icon === 'password' && (
        <Lock
          weight="bold"
          className="absolute top-1/2 right-4 w-6 h-6 text-proto-stroke  group-focus:text-proto-brand group-focus-within:text-proto-brand transition  group-focus:scale-105 group-focus-within:scale-105 -translate-y-1/2"
        />
      )}

      {props.icon === 'email' && (
        <At
          weight="bold"
          className="absolute top-1/2 right-4 w-6 h-6 text-proto-stroke  group-focus:text-proto-brand group-focus-within:text-proto-brand transition  group-focus:scale-105 group-focus-within:scale-105 -translate-y-1/2"
        />
      )}

      {props.icon === 'user' && (
        <UserCircle
          weight="bold"
          className="absolute top-1/2 right-4 w-6 h-6 text-proto-stroke  group-focus:text-proto-brand group-focus-within:text-proto-brand transition  group-focus:scale-105 group-focus-within:scale-105 -translate-y-1/2"
        />
      )}
    </div>
  )
}
