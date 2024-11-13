'use client'

import { Button } from "@/ui/button"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { useAppContext } from "@/app/appContext";

export default function Note ({ note }) {
  const { session } = useAppContext()

  return (
    <>
      <div className="border-b border-solid border-black h-14 flex items-center pl-4">
        { note.name }
        { session && <Button variant="link"><Pencil2Icon className="mr-2"/></Button> }
      </div>
    </>
  )
}