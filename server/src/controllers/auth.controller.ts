import { Request,Response } from "express";
import { User } from "../models/User.model";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import { AuthedRequest } from "../middleware/auth.middleware";
export const register = async(req:Request,res:Response) => {
    try {
        const {name,password,email} = req.body
        const user = await User.findOne({
            email
        })

        if(user) {
            return res.status(400).json({message:'такой email уже занят'})
        }
        else {
            const passwordHash = await bcrypt.hash(password,10)
            const user =  new User({
                name,email,passwordHash
            })
           await  user.save()
           const token = jwt.sign({userId:user._id},process.env.JWT_SECRET!,{
            expiresIn:'7d'
           })
           res.status(201).json({token,user:{id:user._id,name:user.name,email:user.email}})
        }

    }

    catch(e) {
       console.error(e)
res.status(500).json({ error: 'Не удалось зарегистрировать пользователя' })

    }
}

export const login = async(req:Request,res:Response) => {
    try {
        const {password,email} = req.body
        const user = await User.findOne({
            email
        })

        if(!user) {
            return res.status(401).json({message:'неверный email или пароль '})
        }
        else {
         
            
            const isMatch = await bcrypt.compare(password,user.passwordHash)
            if(!isMatch) {
                 return res.status(401).json({message:'неверный email или пароль '})
            }
           
            
           
         
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET!,{
            expiresIn:'7d'
           })
           res.status(200).json({token,user:{id:user._id,name:user.name,email:user.email,avatar:user.avatar}})
         
        }

    }

    catch(e) {
       console.error(e)
res.status(500).json({ error: 'Не удалось зарегистрировать пользователя' })

    }
}


export const getMe = async(req:AuthedRequest,res:Response) => {
    try {
    
        const user = await User.findById(req.userId)

        if(!user) {
            return res.status(401).json({message:'Не удалось найти данного пользователя '})
        }
        res.json({ id: user._id, name: user.name, email: user.email,avatar:user.avatar })

    }

    catch(e) {
       console.error(e)
res.status(500).json({ error: 'Не удалось найти данного пользователя' })

    }
}
export const editUser = async(req:AuthedRequest,res:Response) => {
    try {
        const {avatar,email,name} = req.body
        const user = await User.findByIdAndUpdate(req.userId,{avatar,email,name},{new:true})

        if(!user) {
            return res.status(401).json({message:'Не удалось найти данного пользователя '})
        }
        res.json({ id:user._id,name:user.name,email:user.email,avatar:user.avatar })

    }

    catch(e) {
       console.error(e)
res.status(500).json({ error: 'Не удалось найти данного пользователя' })

    }
}






