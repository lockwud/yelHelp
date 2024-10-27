import { HttpException } from "../utils/httpError";
import { HttpStatus } from "../utils/httpStatusCode";
import {prisma} from "../utils/prismaUtil"
import{userSchema, userDto} from "../validators/userSchema"
import {passwordHasher, passwordVerifier} from "../utils/bcrypt"

export const userService = {
    async createUser(data: userDto, picture: {photoUrl: string, photoKey: string}){
        const validate = userSchema.safeParse(data)
        if(!validate.success){
            const errors = validate.error.issues.map(
                ({ message, path }) => `${path.join(".")}: ${message}`
            );
            throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));
        }else{
            const check = await prisma.user.findFirst({
                where:{
                    email: data.email
                },
            })
            if(check){
                throw new HttpException(HttpStatus.CONFLICT, "Email already exists")
            }else{
                const hashedPassword = await passwordHasher.hashPassword(data.password)
                const user = await prisma.user.create({
                    data:{
                        ...data,
                        password: hashedPassword,
                        photoKey: picture.photoKey,
                        photoUrl: picture.photoUrl

                    }
                })
                const {password, ...userWithoutPasssword} = user
                return userWithoutPasssword
            }}},

            async updateUser(id: string, data: userDto){
                const validate = userSchema.safeParse(data)
                if(!validate.success){
                    const errors = validate.error.issues.map(
                        ({ message, path }) => `${path.join(".")}: ${message}`
                    );
                    throw new HttpException(HttpStatus.BAD_REQUEST, errors.join(". "));
                }else{
                    const user = await prisma.user.update({
                        where:{
                            id: id
                        },
                        data
                    })
                    if(!user){
                        throw new HttpException(HttpStatus.NOT_FOUND, "User not found")
                    }else{
                        return user
                    }
                }
            },
            
            async signIn(email: string, password: string){
                const user = await prisma.user.findUnique({
                    where:{
                        email
                    }
                })
                if(!user){
                    throw new HttpException(HttpStatus.NOT_FOUND, "Invalid email or Password")

                }else{
                    const verifyPassword = await passwordVerifier.verifyPassword(password, user.password)
                    if(!verifyPassword){
                        throw new HttpException(HttpStatus.NOT_FOUND, "Invalid email or Password")
                    }else{
                        const {password, ...userWithoutPassword} = user
                        return userWithoutPassword
                    }
                }
            },

            async deleteUser(id: string){
                const user = await prisma.user.delete({
                    where:{
                        id: id
                    }
                })
                if(!user){
                    throw new HttpException(HttpStatus.NOT_FOUND, "User not found")
                }else{
                    return user
                }
            }
}

