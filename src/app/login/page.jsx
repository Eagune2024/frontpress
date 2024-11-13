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

export default function LoginView () {
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
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          Boom
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">连接创意</p>
            <footer className="text-sm">瞬间启动，无缝编码</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              登陆
            </h1>
          </div>
          <div className="w-[400px] h-[300px]">
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
          </div>
        </div>
      </div>
    </div>
  )
}