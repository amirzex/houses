"use client"

import { useLogin } from '@/core/api/auth/login/queries'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Form = () => {
    const router = useRouter()
    const { mutate, isPending } = useLogin()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        mutate(
            { email, password },
            {
                onSuccess: () => {
                    toast.success("ورود با موفقیت انجام شد")
                    router.push("/")
                    router.refresh()
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || "خطایی رخ داده است ❌")
                }
            }
        )
    }

    return (
        <div>
            <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field-input rounded-full border border-border/80 bg-card"
                    placeholder="ایمیل خود را وارد کنید"
                    type="email"
                    required
                />

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="field-input rounded-full border border-border/80 bg-card"
                    placeholder="رمز عبور خود را وارد کنید"
                    type="password"
                    required
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="btn-brand-lg mt-2 w-full disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isPending ? "در حال ورود..." : "ورود به حساب کاربری"}
                </button>

                <Link href='/forget' className="mt-1 text-center text-sm font-bold text-brand transition-opacity hover:opacity-80">
                    رمز خود را فراموش کرده‌اید؟
                </Link>
            </form>
        </div>
    )
}

export default Form
