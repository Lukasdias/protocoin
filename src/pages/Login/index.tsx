import React, { useState, useMemo, Fragment, useEffect, FormEvent } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../../components/LoginForm/index'
import { Transition } from '@headlessui/react'
import { RegisterForm } from '../../components/RegisterForm/index'
import { UserProps } from 'utils/user.props'

export function Login() {
  const navigate = useNavigate()
  //Login
  const [currentLoginType, setCurrentLoginType] = useState<
    'register' | 'login'
  >('login')

  const [users, setUsers] = useState<UserProps[]>([])

  //Register
  function handleNewLoginType() {
    if (currentLoginType === 'register') setCurrentLoginType('login')
    if (currentLoginType === 'login') setCurrentLoginType('register')
  }

  async function handleSubmitLogin(
    event: FormEvent,
    username: string | undefined,
    password: string | undefined
  ) {
    event.preventDefault()

    console.log(username)
    console.log(password)

    navigate(`${username}/dashboard`)
  }

  async function handleCreateNewUser(event: FormEvent, newUser: UserProps) {
    event.preventDefault()

    localStorage.setItem('USERS', JSON.stringify(newUser))
  }

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('USERS') || '{}'))
  }, [])

  console.log(users)
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
        <LoginForm
          onSelectNewLoginType={handleNewLoginType}
          onLogin={handleSubmitLogin}
        />
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
        <RegisterForm
          onCreateAccount={handleCreateNewUser}
          onSelectNewLoginType={handleNewLoginType}
        />
      </Transition>
    </div>
  )
}
