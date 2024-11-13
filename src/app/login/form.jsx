'use client'

import supabase from "@/utils/supabaseClient";
import React, { useState } from 'react'
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Button } from "@/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/ui/card"
import { redirect } from "next/navigation";

export default function LoginForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!error) redirect("/")
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="mt-6">
          <div>
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div>
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">登陆</Button>
        </CardFooter>
      </form>
    </Card>
  )
}