import React, { ChangeEvent, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Table } from 'tabler-react'
import { BuyCryptoButton } from '../BuyCryptoButton/index'
import { DashboardSkeleton } from './../DashboardSkeleton/index'
import { Listbox, Transition } from '@headlessui/react'
import { MinusCircle, PlusCircle } from 'phosphor-react'

type TableDataType = {
  symbol: string
  priceChangePercent: number
  lastPrice: number
  openPrice: number
  highPrice: number
  lowPrice: number
  volume: number
  openTime: Date
  closeTime: Date
}

export function DashboardTable() {
  const [fullSet, setFullSet] = useState<TableDataType[]>([])
  const [data, setData] = useState<TableDataType[]>([])
  const [maxTableSize, setMaxTableSize] = useState(0)
  const [isNotLoaded, setIsNotLoaded] = useState(true)

  useEffect(() => {
    getCurrencyData()

    setTimeout(() => {
      setMaxTableSize(50)
    }, 1000)
  }, [])

  useEffect(() => {
    setData([...fullSet.slice(0, maxTableSize)])
  }, [maxTableSize])

  const getCurrencyData = async () => {
    try {
      const response = await axios.get(
        'https://api.binance.com/api/v3/ticker/24hr'
      )
      setFullSet(response.data)
      setData([...fullSet.slice(0, maxTableSize)])
      setIsNotLoaded(false)
    } catch (error) {
      console.error(error)
    }
  }

  function FixPrice(num: number) {
    const output = new Intl.NumberFormat([], {
      style: 'currency',
      currency: 'BRL'
    }).format(num)
    return output
  }

  function FixDate(date: Date) {
    // const output = new Intl.DateTimeFormat(['ban', 'id']).format(date)
    const output = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
      .formatToParts(date)
      .reduce((acc: any, part: any) => {
        acc[part.type] = part.value
        return acc
      }, {})
    return `${output.day}/${output.month}/${output.year}, ${output.hour}:${output.minute} ${output.dayPeriod}`
  }

  function handleIncreaseMaxSetSize() {
    if (maxTableSize + 50 >= fullSet.length - 1) {
      setMaxTableSize(fullSet.length - 1)
    } else {
      setMaxTableSize(maxTableSize + 50)
    }
  }

  function handleDecreaseMaxSetSize() {
    if (maxTableSize - 50 <= 0) {
      setMaxTableSize(1)
    } else {
      setMaxTableSize(maxTableSize - 50)
    }
  }

  function handleSortByName() {
    const sortedData = fullSet
      .sort((a, b) => 0 - (a.symbol > b.symbol ? -1 : 1))
      .slice(0, maxTableSize)
    console.log(sortedData)
    setData([...sortedData])
  }

  function handleSortByPrice() {
    const sortedData = fullSet
      .sort((a, b) => (a.lastPrice > b.lastPrice ? -1 : 1))
      .slice(0, maxTableSize)
    setData([...sortedData])
  }

  function handleSortByDate() {
    const sortedData = fullSet
      .sort((a, b) => (a.openTime > b.openTime ? -1 : 1))
      .slice(0, maxTableSize)
    setData([...sortedData])
  }

  function handleFilterByString(event: ChangeEvent<HTMLInputElement>) {
    const filterData = fullSet.filter((element) => {
      return element.symbol
        .toUpperCase()
        .includes(event?.target.value.toUpperCase())
    })
    console.log(filterData)
    setData([...filterData.slice(0, maxTableSize)])
  }

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="overflow-scroll relative mt-8 w-[99%] h-[60vh] outline-none focus:outline-none transition duration-300 sm:overflow-x-hidden sm:overflow-y-auto sm:w-full sm:max-w-full 2xl:h-[70vh] scrollbar scrollbar-thin scrollbar-track-transparent scrollbar-thumb-proto-brand">
      {isNotLoaded ? (
        <DashboardSkeleton />
      ) : (
        <>
          <div className="flex flex-col gap-4 justify-center items-center mb-8 w-full sm:flex-row sm:justify-end sm:py-5 sm:pr-5">
            <input
              autoFocus
              type="text"
              placeholder="Digite o nome da moeda"
              onChange={(event) => handleFilterByString(event)}
              className="py-2 w-auto placeholder:text-xs placeholder:text-white text-proto-stroke bg-black bg-none rounded-md border-2 border-proto-stroke focus-within:border-transparent focus:border-transparent outline-none ring-0 focus:ring-2 focus-within:ring-proto-brand focus:ring-proto-brand focus:ring-offset-2 focus-within:ring-offset-black focus:ring-offset-black transition sm:placeholder:text-base"
            />
            <div className="flex gap-3 items-center text-white">
              <button
                className="group hover:text-proto-brand focus:text-proto-brand bg-none outline-none transition duration-200 focus:scale-105"
                onClick={handleDecreaseMaxSetSize}
              >
                <MinusCircle weight="bold" className="w-8 h-8" />
              </button>
              Itens Listados: {maxTableSize}
              <button
                className="group hover:text-proto-brand focus:text-proto-brand bg-none outline-none transition duration-200 focus:scale-105"
                onClick={handleIncreaseMaxSetSize}
              >
                <PlusCircle
                  weight="bold"
                  className="w-8 h-8 hover:text-proto-brand bg-none outline-none"
                />
              </button>
            </div>
          </div>
          <Table className="w-full outline-none focus:outline-none">
            <Table.Header>
              <Table.Row className="text-white">
                <Table.ColHeader height="24px">#</Table.ColHeader>
                <Table.ColHeader
                  onClick={handleSortByName}
                  className="hover:text-proto-brand active:text-proto-brand hover:rounded-md hover:border-b-2 hover:border-b-proto-brand transition duration-200 cursor-pointer"
                >
                  Nome
                </Table.ColHeader>
                <Table.ColHeader
                  className="hover:text-proto-brand active:text-proto-brand hover:rounded-md hover:border-b-2 hover:border-b-proto-brand transition duration-200 cursor-pointer"
                  onClick={handleSortByPrice}
                >
                  Preço
                </Table.ColHeader>
                <Table.ColHeader className="hover:text-proto-brand active:text-proto-brand hover:rounded-md hover:border-b-2 hover:border-b-proto-brand transition duration-200 cursor-pointer">
                  Preço %
                </Table.ColHeader>
                <Table.ColHeader className="hover:text-proto-brand active:text-proto-brand hover:rounded-md hover:border-b-2 hover:border-b-proto-brand transition duration-200 cursor-pointer">
                  Preço de Abertura
                </Table.ColHeader>
                <Table.ColHeader className="hover:text-proto-brand active:text-proto-brand hover:rounded-md hover:border-b-2 hover:border-b-proto-brand transition duration-200 cursor-pointer">
                  Max
                </Table.ColHeader>
                <Table.ColHeader className="hover:text-proto-brand active:text-proto-brand hover:rounded-md hover:border-b-2 hover:border-b-proto-brand transition duration-200 cursor-pointer">
                  Min
                </Table.ColHeader>
                <Table.ColHeader className="hover:text-proto-brand active:text-proto-brand hover:rounded-md hover:border-b-2 hover:border-b-proto-brand transition duration-200 cursor-pointer">
                  Volume
                </Table.ColHeader>
                <Table.ColHeader
                  className="hover:text-proto-brand active:text-proto-brand hover:rounded-md hover:border-b-2 hover:border-b-proto-brand transition duration-200 cursor-pointer"
                  onClick={handleSortByDate}
                >
                  Tempo de Abertura
                </Table.ColHeader>
                <Table.ColHeader className="hover:text-proto-brand active:text-proto-brand hover:rounded-md hover:border-b-2 hover:border-b-proto-brand transition duration-200 cursor-pointer">
                  Tempo de Fechamento
                </Table.ColHeader>
                <Table.ColHeader></Table.ColHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body className="gap-4 mt-5 ">
              {fullSet ? (
                <>
                  {data.map(({ ...item }: TableDataType, idx: number) => {
                    return (
                      <Table.Row
                        key={idx}
                        className="text-xs text-white border-b-2 border-zinc-700 2xl:text-base "
                      >
                        <Table.Col className="p-4 text-center">{idx}</Table.Col>
                        <Table.Col className=" text-center">
                          {item.symbol}
                        </Table.Col>
                        <Table.Col className="p-4  text-center">
                          {FixPrice(item.lastPrice)}
                        </Table.Col>
                        <Table.Col className="p-4  text-center">
                          {item.priceChangePercent}
                        </Table.Col>
                        <Table.Col className="p-4  text-center">
                          {FixPrice(item.openPrice)}
                        </Table.Col>
                        <Table.Col className="p-4  text-center">
                          {FixPrice(item.highPrice)}
                        </Table.Col>
                        <Table.Col className="p-4  text-center">
                          {FixPrice(item.lowPrice)}
                        </Table.Col>
                        <Table.Col className="p-4  text-center">
                          {FixPrice(item.volume)}
                        </Table.Col>
                        <Table.Col className="p-4  text-center">
                          {FixDate(item.openTime)}
                        </Table.Col>
                        <Table.Col className="p-4  text-center">
                          {FixDate(item.closeTime)}
                        </Table.Col>
                        <Table.Col className="border-b-proto-dashboard-background">
                          <BuyCryptoButton cryptoID={idx} />
                        </Table.Col>
                      </Table.Row>
                    )
                  })}
                </>
              ) : (
                <></>
              )}
            </Table.Body>
          </Table>
        </>
      )}
    </div>
  )
}
