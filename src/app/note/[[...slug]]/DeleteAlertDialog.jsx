import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog"
import { Button } from "@/ui/button"
import { TrashIcon } from "@radix-ui/react-icons"
import { redirect } from 'next/navigation'

export default function DeleteAlertDialog ({ currentBookId, note }) {
  const [open, setOpen] = useState(false)

  const deleteNote = async () => {
    const res = await fetch('http://localhost:3000/deleteNote/' + note.id, { method: 'DELETE' })
    const { error } = await res.json()
    if (!error) {
      setOpen(false)
      redirect(`/note/${currentBookId}`)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="link"><TrashIcon className="mr-2"/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定删除?</AlertDialogTitle>
          <AlertDialogDescription>
            此操作无法撤消，这将永久删除。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={deleteNote}>确定</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}