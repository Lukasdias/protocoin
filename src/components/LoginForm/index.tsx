import React, { ChangeEvent, FormEvent, useRef } from 'react'
import Brand from './../../public/proto-brand-with-icon.svg'

import { FormInput } from './../FormInput/index'
import { FormButton } from '../FormButton/index'

interface LoginFormProps {
  onSelectNewLoginType: () => void
  onLogin: (
    event: FormEvent,
    username: string | undefined,
    password: string | undefined
  ) => void
}

export function LoginForm({ onSelectNewLoginType, onLogin }: LoginFormProps) {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <form
        onSubmit={(event) =>
          onLogin(event, usernameRef.current?.value, passwordRef.current?.value)
        }
        className="flex flex-col gap-6 justify-center items-center px-10 w-[100vw] h-[100vh] bg-black sm:w-full sm:max-w-[500px] sm:h-[500px] sm:max-h-[500px] sm:rounded-[50px]"
      >
        <img
          src={Brand}
          alt="proto coin brand"
          className="w-full max-h-[78px]"
        />

        <div className="flex flex-col gap-4 w-full ">
          <FormInput
            inputRef={usernameRef}
            placeholder="Username ou email"
            type="text"
            icon="user"
          />
          <FormInput
            inputRef={passwordRef}
            placeholder="Senha"
            type="password"
            icon="password"
          />
        </div>

        <FormButton icon="arrow" text="ENTRAR" />

        <p className="text-base text-white">
          Ainda não tem conta?{' '}
          <span
            onClick={onSelectNewLoginType}
            className="text-proto-brand hover:text-proto-stroke underline underline-offset-2  transition duration-200 cursor-pointer"
          >
            criar conta
          </span>{' '}
        </p>
      </form>
    </>
  )
}
