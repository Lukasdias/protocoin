import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'phosphor-react'
import { TransactionType } from 'utils/user.props'

export function TransactionCard({
  wasSent,
  target,
  value,
  bitcoinName,
  date
}: TransactionType) {
  return (
    <div className="flex gap-3 justify-center p-6 w-full bg-black rounded-lg">
      <div className="flex justify-between items-center w-full">
        <div className="flex relative gap-2 justify-center items-center w-full">
          {wasSent ? (
            <ArrowUpRight weight="bold" className="w-6 h-6 text-proto-stroke" />
          ) : (
            <ArrowDownRight
              weight="bold"
              className="w-6 h-6 text-proto-stroke"
            />
          )}
          <span className="flex flex-col flex-1 font-bold text-white text-ellipsis">
            {`Você ${wasSent ? 'enviou para ' : 'recebeu de '} ${target}`}
            <span className="text-[14px] text-proto-stroke">{date}</span>
          </span>

          <span className="my-auto font-bold text-proto-brand">
            {`${value} ${bitcoinName}`}
          </span>
        </div>
      </div>
    </div>
  )
}
