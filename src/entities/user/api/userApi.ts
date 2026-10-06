import type { User } from "../model/User"
import { API_BASE_URL } from "@/shared/config/apiBaseUrl"
import { throwApiError } from "@/shared/utils/apiError"

const USER_API=`${API_BASE_URL}/api/users`

type AuthResponse = {
    token:string,
    user:User
}
export const registUser = async(name:string,email:string,password:string,avatar?:string) =>  {
    const res = await fetch(`${USER_API}/register`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            name,
            email,
            password,
            avatar,
        })
    })
    if(!res.ok) {
        await throwApiError(res, 'Не удалось зарегистрировать пользователя')
    }
    const data:AuthResponse = await res.json()
    return data
}

export const loginUser = async(email:string,password:string,avatar?:string) =>  {
   const res = await fetch(`${USER_API}/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password,avatar }),
})

    if(!res.ok) {
        await throwApiError(res, 'Не удалось войти')
    }
    const data:AuthResponse = await res.json()
    return data
}


export const getMe = async(token:AuthResponse['token']) =>  {
   const res = await fetch(`${USER_API}/me`, {
  method: 'GET',
  headers: { Authorization: `Bearer ${token}` }
})

    if(!res.ok) {
        await throwApiError(res, 'Не удалось найти данного пользователя')
    }
    const data:User = await res.json()
    return data
}

export const editUserInfo = async(token:AuthResponse['token'],avatar:User['avatar'],email?:string,name?:string) =>  {
   const res = await fetch(`${USER_API}/me`, {
  method: 'PATCH',
  headers: {Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
  body:JSON.stringify({
    avatar,
    email,
    name
  })
})

    if(!res.ok) {
        await throwApiError(res, 'Не удалось обновить профиль')
    }
    const data:User = await res.json()
    return data
}



