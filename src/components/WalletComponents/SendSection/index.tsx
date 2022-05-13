import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Export, Money, UserCircle } from 'phosphor-react'
import { simpleAPI } from '../../../lib/api'
import { UserProps } from '../../../utils/user.props'
import { Listbox } from '@headlessui/react'
import { useAuth } from '../../core/Auth/index'
import { SendTransactionButton } from '../SendTransactionButton/index'
import { BitcoinAmountButton } from '../BitcoinAmountButton/index'
import { number } from 'yup/lib/locale'

type CoinProps = {
  _15m: number
  last: number
  buy: number
  sell: number
  symbol: string
}

export function SendSection() {
  const [coinRegionCode, setRegionCode] = useState('BRL')
  const [currentBitcoinAmount, setCurrenBitcoinAmount] = useState(1)
  const [coinInfo, setCoinInfo] = useState<CoinProps | any>()
  const [users, setUsers] = useState<UserProps[] | null>(simpleAPI.get())
  const [transactionReceiver, setTransactionReceiver] = useState<string>()
  const auth = useAuth()

  useEffect(() => {
    getBitcoinConversion()
  }, [])

  useEffect(() => {
    getBitcoinConversion()
  }, [coinRegionCode])

  const getBitcoinConversion = async () => {
    try {
      const response = await axios.get('https://blockchain.info/ticker')
      setCoinInfo(response.data[coinRegionCode])
    } catch (error) {
      //console.log(error)
    }
  }

  function FixPrice(num: number) {
    const output = new Intl.NumberFormat([], {
      style: 'currency',
      currency: coinRegionCode
    }).format(num)
    return output
  }

  function handleCoinCodeSwitch() {
    if (coinRegionCode === 'BRL') setRegionCode('USD')
    else setRegionCode('BRL')
  }

  function handleBitcoinAmount(amount: number) {
    setCurrenBitcoinAmount(amount)
  }

  function handleSendTransaction() {
    const currentDate = new Date()
    simpleAPI.addTransaction(auth.user, {
      wasSent: true,
      bitcoinName: 'BTC',
      target: transactionReceiver || 'Aux',
      value: currentBitcoinAmount,
      date: `${currentDate.getDay()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`
    })
  }

  return (
    <section className="flex relative flex-col gap-3 p-4 w-full rounded-lg border-2 border-proto-stroke sm:w-2/3">
      <div className="flex justify-between items-center w-full">
        <Export weight="bold" className="w-6 h-6 text-white" />
        <Money
          weight="bold"
          className="w-6 h-6 text-proto-brand animate-pulse cursor-pointer"
          onClick={handleCoinCodeSwitch}
        />
      </div>
      <span className="text-2xl font-bold text-white">Enviar</span>
      <div className="flex flex-col gap-2 items-center w-full">
        <div className="flex justify-between items-center w-full">
          <span className="text-2xl font-bold text-white">
            {currentBitcoinAmount}
          </span>
          <div className="flex gap-2 items-center">
            <BitcoinAmountButton
              onSelectBitcoinAmount={() => handleBitcoinAmount(1 / 4)}
              text="1/4"
            />
            <BitcoinAmountButton
              onSelectBitcoinAmount={() => handleBitcoinAmount(1 / 2)}
              text="Metade"
            />
            <BitcoinAmountButton
              onSelectBitcoinAmount={() => handleBitcoinAmount(1)}
              text="Total"
            />
            <span className="text-2xl font-bold text-white">BTC</span>
          </div>
        </div>
        <hr className="my-4 w-full h-[1.25px] bg-proto-stroke" />
        <div className="flex justify-between items-center w-full">
          <span className="text-2xl font-bold text-white">
            {FixPrice(+coinInfo?.last * currentBitcoinAmount)}
          </span>
          <span className="text-2xl font-bold text-white">
            {coinRegionCode}
          </span>
        </div>
        <div className="flex relative w-full">
          <select
            defaultValue="Escolha o recebedor"
            onChange={(event) => setTransactionReceiver(event?.target?.value)}
            className="relative w-full text-proto-stroke bg-proto-dashboard-background border-0 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-proto-brand"
          >
            {users!.map((element: UserProps, idx: number) => (
              <>
                <option
                  key={idx}
                  value={element.username}
                  className="p-3 bg-proto-dashboard-background"
                >
                  {element.username}
                </option>
              </>
            ))}
          </select>
        </div>
        <div className="flex justify-end mt-4 w-full">
          <SendTransactionButton
            disabled={
              transactionReceiver !== undefined && currentBitcoinAmount > 0
            }
            onButtonClick={handleSendTransaction}
            text="Enviar"
          />
        </div>
      </div>
    </section>
  )
}
