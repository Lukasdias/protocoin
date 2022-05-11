import React, { ChangeEvent, FormEvent, useRef } from 'react'
import Brand from './../../public/proto-brand-with-icon.svg'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import { FormInput } from '../FormInput/index'
import { FormButton } from '../FormButton/index'

interface SignInProps {
  onSelectNewLoginType: () => void
}

export function SignIn({ onSelectNewLoginType }: SignInProps) {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={(values) => {
        const errors = {
          username: {},
          email: {}
        }
        if (!values.username) {
          errors.username = 'Campo Necessário'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
        ) {
          errors.username = 'E-mail inválido'
        }
        return errors
      }}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <Form className="flex flex-col gap-6 justify-center items-center px-10 w-[100vw] h-[100vh] bg-black sm:w-full sm:max-w-[500px] sm:h-[500px] sm:max-h-[500px] sm:rounded-[50px]">
        <img
          src={Brand}
          alt="proto coin brand"
          className="w-full max-h-[78px]"
        />

        <div className="flex flex-col gap-4 w-full ">
          <FormInput
            name="username"
            placeholder="Username ou email"
            type="text"
            icon="user"
          />
          <ErrorMessage
            name="username"
            component="div"
            className="font-sans text-xs font-bold text-proto-wallet-down"
          />
          <FormInput
            name="password"
            placeholder="Senha"
            type="password"
            icon="password"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="font-sans text-xs font-bold text-proto-wallet-down"
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
      </Form>
    </Formik>
  )
}
