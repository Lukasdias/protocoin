import React, {
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
  useState
} from 'react'
import Brand from './../../public/proto-brand-with-icon.svg'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuth } from './../core/Auth/index'
import { FormInput } from '../FormInput/index'
import { FormButton } from '../FormButton/index'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { simpleAPI } from '../../lib/api'
import { UserProps } from '../../utils/user.props'

interface SignInProps {
  onSelectNewLoginType: () => void
}

const SignInSchema = Yup.object().shape({
  key: Yup.string().required('Necessário'),
  password: Yup.string().required('Necessário')
})

export function SignIn({ onSelectNewLoginType }: SignInProps) {
  const navigate = useNavigate()
  const auth = useAuth()
  const [userNotFound, setUserNotFound] = useState<boolean>(false)
  const [isWrongPassword, setIsWrongPassword] = useState(false)

  function handleUserNotFound() {
    setUserNotFound(true)
    setTimeout(() => setUserNotFound(false), 5000)
  }

  function handleIsWrongPassword() {
    setIsWrongPassword(true)
    setTimeout(() => setIsWrongPassword(false), 5000)
  }

  return (
    <Formik
      initialValues={{ key: '', password: '' }}
      validationSchema={SignInSchema}
      onSubmit={(values) => {
        const response = simpleAPI.signIn(values.key, values.password)
        if (response) {
          const id = response.username || values.key
          auth.log(id, () => navigate(`${id}/account`, { replace: true }))
        }
        if (response === null) handleUserNotFound()
        if (!response) handleIsWrongPassword()
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-6 justify-center items-center px-10 w-[100vw] h-[100vh] bg-black sm:w-full sm:max-w-[500px] sm:h-[500px] sm:max-h-[500px] sm:rounded-[50px]">
          <img
            src={Brand}
            alt="proto coin brand"
            className="w-full max-h-[78px]"
          />

          <div className="flex flex-col gap-4 w-full ">
            {userNotFound ? (
              <>
                <FormInput
                  name="key"
                  placeholder="Username ou email"
                  type="text"
                  icon="user"
                  isInvalid={true}
                />
                <span className="font-sans text-xs font-bold text-proto-wallet-down">
                  Usuário não encontrado
                </span>
              </>
            ) : (
              <>
                <FormInput
                  name="key"
                  placeholder="Username ou email"
                  type="text"
                  icon="user"
                  isInvalid={errors.key && touched.key ? true : false}
                />
                <ErrorMessage
                  name="key"
                  component="div"
                  className="font-sans text-xs font-bold text-proto-wallet-down"
                />
              </>
            )}
            {isWrongPassword ? (
              <>
                <FormInput
                  name="password"
                  placeholder="Senha"
                  type="password"
                  icon="password"
                  isInvalid={true}
                />
                <span className="font-sans text-xs font-bold text-proto-wallet-down">
                  Senha inválida
                </span>
              </>
            ) : (
              <>
                <FormInput
                  name="password"
                  placeholder="Senha"
                  type="password"
                  icon="password"
                  isInvalid={errors.password && touched.password ? true : false}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="font-sans text-xs font-bold text-proto-wallet-down"
                />
              </>
            )}
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
      )}
    </Formik>
  )
}
