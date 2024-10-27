import {z} from "zod"
const gender = z.enum([
    "male",
    "female",
    "trans"
])



export const userSchema = z.object({
    fullname: z.string({required_error: "Name is required"})
    .trim()
    .min(1, {message: "Name can't be empty"}),
    email: z.string({required_error: "Emial is required"})
    .trim()
    .email({message: "Invalid email address"}),
    gender: gender,
    password: z.string({required_error: "Password is required"})
    .trim()
    .min(4, {message: "Password can't be empty"})
    .max(12, {message: "Password should not be less than 4 characters"}),
    contact: z.string({required_error: "Contact is required"})
    .trim()
    .min(1, {message: "Contact can't be empty"}),
    address: z.string({required_error: "Address is required"})
    .trim()
    .min(1, {message: "Address can't be empty"}),
    photoUrl: z.string(),
    photoKey: z.string()
})

export type userDto = z.infer<typeof userSchema>
