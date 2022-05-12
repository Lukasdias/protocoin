import React from 'react'
import { SpinnerGap } from 'phosphor-react'
export function DashboardSkeleton() {
  return (
    <>
      <SpinnerGap
        weight="bold"
        className="m-auto w-[30vw] h-[30vh] text-proto-brand animate-spin"
      />
    </>
  )
}
