'use client'

import { Button } from "@/ui/button"
import { Pencil2Icon } from "@radix-ui/react-icons"
import EditNoteTitleDialog from "./EditNoteTitleDialog"

export default function Note ({ currentBookId, note }) {
  return (
    <>
      <div className="border-b border-solid border-black h-14 flex items-center pl-4">
        { note.name }
        <EditNoteTitleDialog currentBookId={currentBookId} note={note} />
      </div>
    </>
  )
}