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
import { redirect } from 'next/navigation'

export default function CreateBookDialog () {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  const openChange = (open) => {
    setName('')
    setOpen(open)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3000/createBook', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      })
    })
    const { error } = await res.json()
    if (!error) {
      setOpen(false)
      redirect('/note')
    }
  }

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger asChild>
        <Button className="rounded-b-none">添加笔记本</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>添加笔记本</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">名称</Label>
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
            <Button type="submit">创建</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
