import React, { useEffect, useState } from 'react'
import { ArrowsDownUp } from 'phosphor-react'
import { TransactionCard } from '../TransactionCard/index'
import { simpleAPI } from '../../../lib/api'
import { UserProps, TransactionType } from '../../../utils/user.props'

export function Transactions() {
  const [users, setUsers] = useState<UserProps[] | null>([])

  useEffect(() => {
    setUsers(simpleAPI.get())
  }, [])

  return (
    <div className="flex flex-col flex-1 gap-3 p-4 min-h-[450px] rounded-lg border-2 border-proto-stroke">
      <ArrowsDownUp weight="bold" className="w-6 h-6 text-white" />
      <span className="text-2xl font-bold text-white">Transações</span>
      <div className="flex overflow-y-auto flex-col gap-3 justify-start px-3 w-full h-[300px] max-h-full">
        {users?.map((element: UserProps, idx: number) => (
          <>
            {element.transactions.map((trans: TransactionType, idx: number) => (
              <TransactionCard
                key={idx}
                bitcoinName={trans.bitcoinName}
                date={trans.date}
                target={trans.target}
                value={trans.value}
                wasSent={trans.wasSent}
              />
            ))}
          </>
        ))}
      </div>
    </div>
  )
}
