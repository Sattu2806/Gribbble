'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import { registerSchema } from '@/Schema/RegisterSchema'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'
import { registerUser } from '@/actions/register'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
  

type Props = {}

const RegisterForm = (props: Props) => {
    const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema)
    })
    const router = useRouter()
    
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof registerSchema>) {
        try {
            const response = await registerUser(values)
            if(response.message){
                toast.success(response.message)
                router.push('/login')
            }else{
                toast.error(response.error)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='max-w-screen-md my-10 mx-auto'>
        <Card className='p-4'>
        <CardHeader>
            <div className='flex items-center justify-center py-2'>
                <Image className='w-1/2 h-auto' src='/gribble.png' width={200} height={150} alt='Gribble Logo'/>
            </div>
            <CardTitle className='text-center font-medium text-2xl text-pink-700'>Regitser</CardTitle>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="doe jones" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type='email' placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type='password' placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        </Card>
    </div>
  )
}

export default RegisterForm