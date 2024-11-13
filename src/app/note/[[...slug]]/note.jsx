'use client'

import { Button } from "@/ui/button"
import { Pencil2Icon } from "@radix-ui/react-icons"

export default function Note ({ note }) {
  return (
    <>
      <div className="border-b border-solid border-black h-14 flex items-center pl-4">
        { note.name }
        <Button variant="link"><Pencil2Icon className="mr-2"/></Button>
      </div>
    </>
  )
}