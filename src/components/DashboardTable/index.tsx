import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'tabler-react'
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
  const [data, setData] = useState<TableDataType[]>([])

  useEffect(() => {
    async function getCurrencyData() {
      try {
        const response = await axios.get(
          'https://api.binance.com/api/v3/ticker/24hr'
        )
        setData(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getCurrencyData()
  }, [])

  function FixPrice(num: number) {
    const output = new Intl.NumberFormat([], {
      style: 'currency',
      currency: 'BRL'
    }).format(num)
    return output
  }

  function FixDate(date: Date) {
    const output = new Intl.DateTimeFormat(['ban', 'id']).format(date)
    return output
  }

  function handleSortByName() {
    const sortedData = data.sort((a, b) => 0 - (a.symbol > b.symbol ? -1 : 1))
    console.log(sortedData)
    setData(sortedData)
  }

  return (
    <div className="overflow-scroll relative justify-center mt-8 w-full max-w-full max-h-[600px] transition duration-300 sm:max-h-[500px] 2xl:max-h-[698px]">
      <Table className="p-4 w-full">
        <Table.Header>
          <Table.Row className="text-white">
            <Table.ColHeader>#</Table.ColHeader>
            <Table.ColHeader
              onClick={handleSortByName}
              className="cursor-pointer"
            >
              Nome
            </Table.ColHeader>
            <Table.ColHeader>Preço</Table.ColHeader>
            <Table.ColHeader>Preço %</Table.ColHeader>
            <Table.ColHeader>Preço de Abertura</Table.ColHeader>
            <Table.ColHeader>Max</Table.ColHeader>
            <Table.ColHeader>Min</Table.ColHeader>
            <Table.ColHeader>Volume</Table.ColHeader>
            <Table.ColHeader>Tempo de Abertura</Table.ColHeader>
            <Table.ColHeader>Tempo de Fechamento</Table.ColHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body className="gap-4 mt-5 ">
          {data?.map(({ ...item }: TableDataType, idx: number) => {
            try {
              return (
                <Table.Row
                  key={idx}
                  className=" text-xs text-white border-b-2 border-zinc-700 border-opacity-40 2xl:text-base "
                >
                  <Table.Col className="p-4  text-center">{idx}</Table.Col>
                  <Table.Col className=" text-center">{item.symbol}</Table.Col>
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
                </Table.Row>
              )
            } catch (error) {
              console.log(error)
            }
          })}
        </Table.Body>
      </Table>
    </div>
  )
}
