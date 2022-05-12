import React, { useState } from 'react'
import BrandWhite from '../../public/proto-brand-white.svg'
import { useNavigate } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import { FeedbackDialog } from '../../components/FeedbackDialog/index'
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
  const [isSuccessFeedbackDialogOpen, setIsSuccessFeedbackDialogOpen] =
    useState(false)
  const [isFailedFeedbackDialogOpen, setIsFailedFeedbackDialogOpen] =
    useState(false)

  function handleCloseSuccessFeedbackDialog() {
    setIsSuccessFeedbackDialogOpen(false)
  }

  function handleCloseFailedFeedbackDialog() {
    setIsSuccessFeedbackDialogOpen(false)
  }

  function handleOpenFeedbackFailedDialog() {
    setIsFailedFeedbackDialogOpen(true)
    setTimeout(() => {
      setIsFailedFeedbackDialogOpen(false)
    }, 1250)
  }

  function handleOpenFeedbackSuccessDialog() {
    setIsSuccessFeedbackDialogOpen(true)
    setTimeout(() => {
      setIsSuccessFeedbackDialogOpen(false)
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
        <SignUp
          onSignUpFailed={handleOpenFeedbackFailedDialog}
          onSignUpSuccess={handleOpenFeedbackSuccessDialog}
          onSelectNewLoginType={handleNewLoginType}
        />
      </Transition>

      <FeedbackDialog
        isOpen={isSuccessFeedbackDialogOpen}
        onClose={handleCloseSuccessFeedbackDialog}
      >
        <span className="flex justify-center text-5xl font-bold text-center text-green-500">
          Usuário Cadastrado
        </span>
      </FeedbackDialog>

      <FeedbackDialog
        isOpen={isFailedFeedbackDialogOpen}
        onClose={handleCloseFailedFeedbackDialog}
      >
        <span className="flex justify-center text-5xl font-bold text-center text-red-600">
          Usuário ou Email já existem no sistema
        </span>
      </FeedbackDialog>

      <div className="hidden absolute right-9 bottom-3 lg:flex">
        <img className="w-[30vw] max-w-[329px]" src={BrandWhite} alt="" />
      </div>
    </div>
  )
}
