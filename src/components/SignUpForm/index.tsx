import React, { useState, useRef, FormEvent } from 'react'
import { FormInput } from 'components/FormInput'
import Brand from './../../public/proto-brand-with-icon.svg'
import { UserProps } from '../../utils/user.props'
import { FormButton } from '../FormButton/index'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

interface SignUpProps {
  onSelectNewLoginType: () => void
}

interface Values {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
}

const SignUpSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'Muito pequeno!')
    .max(15, 'Muito Longo!')
    .required('Necessário'),
  lastname: Yup.string()
    .min(2, 'Muito pequeno!')
    .max(15, 'Muito Longo!')
    .required('Necessário'),
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_.-]*$/, { message: 'Somente letras, números e _' })
    .min(2, 'Muito pequeno!')
    .max(15, 'Muito Longo!')
    .required('Necessário'),
  password: Yup.string()
    .min(6, 'Muito pequeno!')
    .max(14, 'Muito Longo!')
    .required('Necessário'),
  email: Yup.string()
    .matches(
      /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i,
      {
        message: 'Tente algo como usuario@proto.com'
      }
    )
    .email('Email Inválido')
    .required('Necessário')
})

export function SignUp({ onSelectNewLoginType }: SignUpProps) {
  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: ''
        }}
        // validate={(values: Values) => {
        //   const errors = {
        //     firstname: {},
        //     lastname: {},
        //     username: {},
        //     email: {},
        //     password: {}
        //   }
        //   if (!values.username) {
        //     errors.username = 'Nome de usuário é necessário'
        //   }
        //   if (!values.firstname) {
        //     errors.firstname = 'Primeiro nome é necessário'
        //   }
        //   if (!values.lastname) {
        //     errors.lastname = 'Último nome é Necessário'
        //   }
        //   if (!/^[a-zA-Z0-9]{6,}$/i.test(values.email)) {
        //     errors.password = 'Insira no mínimo 6 caracteres'
        //   }
        //   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{4,}$/i.test(values.email)) {
        //     errors.email = 'E-mail é inválido'
        //   }
        //   return errors
        // }}
        validationSchema={SignUpSchema}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500))
          alert(JSON.stringify(values, null, 2))
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-6 justify-center items-center px-10 w-[100vw] h-[100vh] bg-black sm:w-[600px] sm:h-screen">
            <img
              src={Brand}
              alt="proto coin brand"
              className="w-full max-h-[86px]"
            />
            <section className="flex flex-col gap-3 mt-[32px] w-full max-w-[410px]">
              <div className="flex relative gap-2 w-full">
                <FormInput
                  name="firstname"
                  placeholder="Nome"
                  type="text"
                  isInvalid={
                    errors.firstname && touched.firstname ? true : false
                  }
                />
                <ErrorMessage
                  name="firstname"
                  component="div"
                  className="absolute -top-5 left-0 font-sans text-xs font-bold text-proto-wallet-down"
                />
                <FormInput
                  isInvalid={errors.lastname && touched.lastname ? true : false}
                  name="lastname"
                  placeholder="Sobrenome"
                  type="text"
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="absolute -top-5 left-[51%] font-sans text-xs font-bold text-proto-wallet-down"
                />
              </div>
              <FormInput
                isInvalid={errors.username && touched.username ? true : false}
                name="username"
                placeholder="Username"
                type="text"
                icon="user"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="font-sans text-xs font-bold text-proto-wallet-down"
              />
              <FormInput
                isInvalid={errors.email && touched.email ? true : false}
                name="email"
                placeholder="Email"
                type="email"
                icon="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="font-sans text-xs font-bold text-proto-wallet-down"
              />
              <FormInput
                isInvalid={errors.password && touched.password ? true : false}
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
              <FormButton icon="check" text="CRIAR CONTA" />
              <p className="text-base text-center text-white">
                Já tem conta?{' '}
                <a
                  onClick={onSelectNewLoginType}
                  className="text-proto-brand hover:text-proto-stroke underline underline-offset-2  transition duration-200 cursor-pointer"
                >
                  entrar
                </a>
              </p>
            </section>
          </Form>
        )}
      </Formik>
    </>
  )
}
