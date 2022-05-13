import { Dashboard } from '../../components/DashboardComponents/DashboardBody'
import { Wallet } from 'components/WalletComponents/WalletBody'
import React, { useState, Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { AccountHeader } from '../../components/AccountHeader/index'
type AccountSectionType = 'DASHBOARD' | 'WALLET'

const AccountSectionWrapper = (children: any) => {
  return { children }
}

export function Account() {
  const [accountSection, setAccountSection] =
    useState<AccountSectionType>('DASHBOARD')

  function handleAccountSectionChange() {
    if (accountSection === 'DASHBOARD') setAccountSection('WALLET')
    else setAccountSection('DASHBOARD')
  }

  function handleAccountSectionDashboard() {
    setAccountSection('DASHBOARD')
  }
  function handleAccountSectionWallet() {
    setAccountSection('WALLET')
  }

  return (
    <>
      <div className="flex overflow-hidden flex-col w-screen h-screen bg-black">
        <AccountHeader
          onChangeAccountSectionToDashboard={handleAccountSectionDashboard}
          onChangeAccountSectionToWallet={handleAccountSectionWallet}
        />

        <Transition
          unmount={false}
          show={accountSection === 'DASHBOARD'}
          enter="transition  duration-200 transform"
          enterFrom="-translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition duration-200 transform"
          leaveFrom="translate-x-0 opacity-0"
          leaveTo="-translate-x-full opacity-100"
        >
          <Dashboard />
        </Transition>
        <Transition
          show={accountSection === 'WALLET'}
          enter="transition  duration-200 transform"
          enterFrom="translate-x-full opacity-0"
          enterTo="-translate-x-0 opacity-100"
          leave="transition duration-200 transform"
          leaveFrom="-translate-x-0 opacity-0"
          leaveTo="translate-x-full opacity-100"
        >
          <Wallet />
        </Transition>
      </div>
    </>
  )
}
