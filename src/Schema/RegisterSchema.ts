import {z} from "zod"

export const registerSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters"}),
    email: z.string().email({ message: "Invalid email"}),
    password:z.string().min(3, { message: "password must be at least 8 characters"}),
})