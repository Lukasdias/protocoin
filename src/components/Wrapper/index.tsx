import React, { ReactElement } from 'react'

interface WrapperProps {
  children: any
}
export function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex relative flex-col w-screen h-screen bg-transparent">
      {children}
    </div>
  )
}
