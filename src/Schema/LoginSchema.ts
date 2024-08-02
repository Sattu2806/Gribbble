import {z} from "zod"

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email"}),
    password:z.string().min(3, { message: "password must be at least 8 characters"}),
})