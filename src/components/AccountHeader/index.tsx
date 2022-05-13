import React, { Fragment } from 'react'
import Brand from './../../public/proto-brand-with-icon.svg'
import { Popover, Transition } from '@headlessui/react'
import { CurrencyBtc, Wallet, UserCircle, ArrowDown } from 'phosphor-react'
import { useAuth } from '../core/Auth/index'
import { useNavigate } from 'react-router-dom'
interface AccountHeaderProps {
  onChangeAccountSection?: () => void
  onChangeAccountSectionToDashboard: () => void
  onChangeAccountSectionToWallet: () => void
}

export function AccountHeader({
  onChangeAccountSection,
  onChangeAccountSectionToDashboard,
  onChangeAccountSectionToWallet
}: AccountHeaderProps) {
  const navigate = useNavigate()
  const auth = useAuth()
  return (
    <>
      <header className="flex relative flex-col justify-between items-center py-6 px-3 w-full sm:flex-row">
        <img src={Brand} alt="brand" className="max-w-[210px]" />

        <nav className="flex relative gap-5 justify-around items-center px-4 mt-8 w-full sm:justify-end sm:mt-0 sm:w-auto">
          <button
            className="group transition: flex gap-2 items-center text-sm font-bold text-white focus-within:text-proto-brand hover:text-proto-brand focus:text-proto-brand focus-within::border-0 focus:border-0 outline-none focus-within:ring-0
          focus:ring-0 duration-200   cursor-pointer
          "
            onClick={onChangeAccountSectionToDashboard}
          >
            <CurrencyBtc
              weight="bold"
              className="w-6 h-6 transition duration-200 ease-out group-hover:-translate-y-1 group-focus:-translate-y-1"
            />
            Dashboard
          </button>
          <button
            className="group  flex gap-2 items-center text-sm font-bold text-white focus-within:text-proto-brand hover:text-proto-brand focus:text-proto-brand focus-within::border-0 focus:border-0 outline-none focus-within:ring-0 focus:ring-0 transition duration-200  cursor-pointer"
            onClick={onChangeAccountSectionToWallet}
          >
            <Wallet
              weight="bold"
              className="w-6 h-6  transition duration-200 ease-out group-hover:-translate-y-1 group-focus:-translate-y-1"
            />
            Wallet
          </button>
          <Popover className="relative">
            <Popover.Button className="group flex relative gap-2 items-center text-sm font-bold text-white focus-within:text-proto-brand hover:text-proto-brand focus:text-proto-brand text-ellipsis focus-within::border-0 focus:border-0 outline-none focus-within:ring-0 focus:ring-0 transition duration-200  cursor-pointer">
              {/* <UserCircle
                weight="bold"
                className="w-6 h-6 transition duration-200 ease-out group-hover:-translate-y-1 group-focus:-translate-y-1"
              /> */}
              {auth.user}
              <ArrowDown
                weight="bold"
                className="w-6 h-6 transition duration-200 ease-out group-hover:translate-y-1 group-focus:translate-y-1"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-10 right-0 z-50">
                <button
                  className="group flex py-2 px-6 w-full min-w-[124px] text-sm font-bold text-white hover:text-proto-brand focus:text-proto-brand bg-black rounded outline-none transition duration-200 ease-out"
                  onClick={() => {
                    auth.logOut(() => navigate('/'))
                  }}
                >
                  Sair
                </button>
              </Popover.Panel>
            </Transition>
          </Popover>
        </nav>
      </header>
    </>
  )
}
