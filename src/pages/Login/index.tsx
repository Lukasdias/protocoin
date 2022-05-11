import React, { useState, useMemo, Fragment, useEffect, FormEvent } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikContext } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import { UserProps } from 'utils/user.props'
import { simpleAPI, postResp, getResp } from 'lib/api'
import { FeedbackDialog } from '../../components/FeedbackDialog/index'
import { authResp } from '../../lib/api'
import { SignIn } from '../../components/SignInForm/index'
import { SignUp } from '../../components/SignUpForm/index'
import './styles.css'
export function Login() {
  const navigate = useNavigate()

  //Login
  const [currentLoginType, setCurrentLoginType] = useState<
    'register' | 'login'
  >('login')

  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false)
  const [isEmailInvalid, setIsEmailInvalid] = useState(false)
  const [isFeedbackDialogOpen, setFeedbackDialogOpen] = useState(false)

  function handleCloseFeedbackDialog() {
    setFeedbackDialogOpen(false)
  }

  function handleOpenFeedbackDialog() {
    setFeedbackDialogOpen(true)
    setTimeout(() => {
      setFeedbackDialogOpen(false)
    }, 1250)
  }

  //Register
  function handleNewLoginType() {
    if (currentLoginType === 'register') setCurrentLoginType('login')
    if (currentLoginType === 'login') setCurrentLoginType('register')
  }

  function handleSubmitLogin() {
    return
  }

  function handleCreateNewUser(event: FormEvent, newUser: UserProps) {
    event.preventDefault()

    const resp: postResp = simpleAPI.post(newUser)
    console.log(resp)

    switch (resp) {
      case 'both':
        setIsEmailInvalid(true)
        setIsUsernameInvalid(true)
        break
      case 'username':
        setIsUsernameInvalid(true)
        break
      case 'email':
        setIsEmailInvalid(true)
        break
      case true:
        handleOpenFeedbackDialog()
        handleNewLoginType()
        break
      case null:
        alert('Não foi possível criar o usuário')
        break
      default:
        break
    }

    setTimeout(() => {
      setIsEmailInvalid(false)
      setIsUsernameInvalid(false)
    }, 6000)
  }

  return (
    <div
      className={`login-container flex justify-center items-center w-screen h-screen bg-center p-3 sm:p-0 overflow-hidden relative`}
    >
      <Transition
        show={currentLoginType === 'login'}
        enter="transition ease-linear duration-300"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 -translate-x-0"
        leave="transition ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 translate-x-full"
      >
        <SignIn onSelectNewLoginType={handleNewLoginType} />
      </Transition>

      <Transition
        show={currentLoginType === 'register'}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className="absolute top-0 left-0"
      >
        <SignUp onSelectNewLoginType={handleNewLoginType} />
      </Transition>

      <FeedbackDialog
        isOpen={isFeedbackDialogOpen}
        onClose={handleCloseFeedbackDialog}
      >
        <span className="flex justify-center text-5xl font-bold text-center text-green-500">
          Usuário Cadastrado
        </span>
      </FeedbackDialog>
    </div>
  )
}
