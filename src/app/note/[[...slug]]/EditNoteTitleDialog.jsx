'use client'

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog"
import { Button } from "@/ui/button"
import { Label } from "@/ui/label"
import { Input } from "@/ui/input"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { redirect } from 'next/navigation'

export default function EditNoteTitleDialog ({ currentBookId, note }) {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  const openChange = (open) => {
    setName('')
    setOpen(open)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3000/editNote', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...note,
        name,
      })
    })
    const { error } = await res.json()
    if (!error) {
      setOpen(false)
      redirect(`/note/${currentBookId}/${note.id}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger asChild>
        <Button variant="link"><Pencil2Icon className="mr-2"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>修改标题</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">标题</Label>
              <Input
                id="name"
                value={name}
                className="col-span-3"
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">确认</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
