import type { User } from "@/entities/user/model/User";
import type { BoardT } from "../../../pages/board-page/model/useBoard";
import type { Image } from "../../../shared/utils/uploadImage";
import { API_BASE_URL } from "@/shared/config/apiBaseUrl";
import { throwApiError } from "@/shared/utils/apiError";

const API_URL = `${API_BASE_URL}/api`;

type BoardResponse = {
    title:string,
    _id:string,
    image?:Image,
    cardsCount?:number,
    columnsCount?:number,
    color?:string,
    coverState?:BoardT['coverState'],
    owner:User,
    members?:User[],
    inviteToken?:string
}
export const fetchBoards = async(token:string):Promise<BoardT[]> => {
    const res  = await fetch(`${API_URL}/boards`,{
        method:"GET",
        headers:{Authorization:`Bearer ${token}`}
    } )
    if(!res.ok) await throwApiError(res, 'Не удалось получить данные о досках');
    const data:BoardResponse[] = await res.json()
    return data.map((board) => ({
        id:board._id,
        title:board.title,
        image:board.image,
        columnsCount:board.columnsCount,
    cardsCount:board.cardsCount,
    color:board.color,
   members:board.members,
    coverState:board.coverState,
    owner:board.owner
    }))

}

export const createBoard = async(title:string,image?:Image,color?:string,coverState?:BoardT['coverState'],token?:string):Promise<BoardT>  => {
    const res = await fetch(`${API_URL}/boards`,{
        method:'POST',
        headers : {'Content-Type':'application/json',Authorization:`Bearer ${token}`},
        body:JSON.stringify({title,image,color,coverState})
    })
     if(!res.ok) await throwApiError(res, 'Не удалось создать доску');
    const data:BoardResponse = await  res.json()
    return {
        id:data._id,
        title:data.title,
        image:data.image || '',
        color:data.color,
        members:data.members,
        coverState:data.coverState,
        owner:data.owner,
    inviteToken:data.inviteToken,
    } 
}


export const fetchBoardById = async(id:string): Promise<BoardT> => {
    const res = await fetch(`${API_URL}/boards/${id}`)
    if(!res.ok) await throwApiError(res, 'Не удалось получить данные о доске');
    const data:BoardResponse = await res.json()
    return {
        id:data._id,
        title:data.title,
        members:data.members,
        owner:data.owner,
    }
}

export const deleteBoard = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/boards/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) await throwApiError(res, 'Не удалось удалить доску');
};

export const editBoard = async(id:string,title:string,image?:string,color?:string,coverState?:string) => {
const res = await fetch(`${API_URL}/boards/${id}`,{
    method:'PATCH',
    
    headers:{
        'Content-Type':'application/json'

},body:JSON.stringify({
        title,
        image,
        color,
        coverState,
    }),})
if (!res.ok) await throwApiError(res, 'Не удалось редактировать доску');

 const data:BoardResponse = await res.json()

 return {
     title:data.title,
    image:data.image,
    color:data.color,
    coverState:data.coverState,
    members:data.members
 }
}


export const joinBoardByToken = async(inviteToken:string,JWTToken:string) => {
const res = await fetch(`${API_URL}/boards/join/${inviteToken}`,{
    method:'POST',
    
    headers:{
        'Content-Type':'application/json',Authorization:`Bearer ${JWTToken}`

}})
if (!res.ok) await throwApiError(res, 'Не удалось присоединиться к доске');

 const data:BoardResponse = await res.json()

 return data
}


export const generateInviteToken = async(id:string,JWTToken:string) => {
const res = await fetch(`${API_URL}/boards/${id}/invite-token`,{
    method:'POST',
    
    headers:{
        'Content-Type':'application/json',Authorization:`Bearer ${JWTToken}`

}})
if (!res.ok) await throwApiError(res, 'Не удалось создать ссылку-приглашение');

 const data:BoardResponse = await res.json()

 return data.inviteToken
}

