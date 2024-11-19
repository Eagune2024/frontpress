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

export default function DeleteAlertDialog ({ currentBookId }) {
  const [open, setOpen] = useState(false)

  const deleteBook = async () => {
    const res = await fetch('http://localhost:3000/deleteBook/' + currentBookId, { method: 'DELETE' })
    const { error } = await res.json()
    if (!error) {
      setOpen(false)
      redirect('/note')
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="link"><TrashIcon className="mr-2"/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定删除笔记本?</AlertDialogTitle>
          <AlertDialogDescription>
            此操作无法撤消，该笔记本上的所有笔记也会被删除。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={deleteBook}>确定</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}