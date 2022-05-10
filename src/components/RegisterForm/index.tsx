import React, { useState, useRef, FormEvent } from 'react'
import { FormInput } from 'components/FormInput'
import Brand from './../../public/proto-brand-with-icon.svg'
import { UserProps } from '../../utils/user.props'
import { FormButton } from '../FormButton/index'

interface RegisterFormProps {
  onSelectNewLoginType: () => void
  onCreateAccount: (event: FormEvent, newUser: UserProps) => void
}

export function RegisterForm({
  onCreateAccount,
  onSelectNewLoginType
}: RegisterFormProps) {
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  return (
    <form
      className="flex flex-col gap-6 justify-center items-center px-10 w-[100vw] h-[100vh] bg-black sm:w-[600px] sm:h-screen"
      onSubmit={(event) =>
        onCreateAccount(event, {
          firstName: firstNameRef.current?.value,
          lastName: lastNameRef.current?.value,
          username: usernameRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value
        })
      }
    >
      <img src={Brand} alt="proto coin brand" className="w-full max-h-[86px]" />
      <section className="flex flex-col gap-3 mt-[32px] w-full max-w-[410px]">
        <div className="flex gap-2 w-full">
          <FormInput inputRef={firstNameRef} placeholder="Nome" type="text" />
          <FormInput
            inputRef={lastNameRef}
            placeholder="Sobrenome"
            type="text"
          />
        </div>
        <FormInput
          inputRef={usernameRef}
          placeholder="Username"
          type="text"
          icon="user"
        />
        <FormInput
          inputRef={emailRef}
          placeholder="Email"
          type="text"
          icon="email"
        />
        <FormInput
          inputRef={passwordRef}
          placeholder="Senha"
          type="password"
          icon="password"
        />
        <FormButton icon="check" text="CRIAR CONTA" />
        <p className="text-base text-center text-white">
          Já tem conta?{' '}
          <span
            onClick={onSelectNewLoginType}
            className="text-proto-brand hover:text-proto-stroke underline underline-offset-2  transition duration-200 cursor-pointer"
          >
            entrar
          </span>
        </p>
      </section>
    </form>
  )
}
