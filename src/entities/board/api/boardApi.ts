import type { Board } from "../../../pages/board-page/model/useBoard";
import type { Image } from "../../../shared/utils/uploadImage";

const API_URL = 'http://localhost:5000/api';

type BoardResponse = {
    title:string,
    _id:string,
    image:Image
}
export const fetchBoards = async():Promise<Board[]> => {
    const res  = await fetch(`${API_URL}/boards`)
    if(!res.ok) throw new Error('Не удалось получить данные о досках(fetch)');
    const data:BoardResponse[] = await res.json()
    return data.map((board) => ({
        id:board._id,
        title:board.title,
        image:board.image
    }))

}

export const createBoard = async(title:string,image:Image):Promise<Board>  => {
    const res = await fetch(`${API_URL}/boards`,{
        method:'POST',
        headers : {'Content-Type':'application/json'},
        body:JSON.stringify({title,image})
    })
     if(!res.ok) throw new Error('Не удалось получить данные о досках');
    const data:BoardResponse = await  res.json()
    return {
        id:data._id,
        title:data.title,
        image:data.image || '',
    } 
}


export const fetchBoardById = async(id:string): Promise<Board> => {
    const res = await fetch(`${API_URL}/boards/${id}`)
    if(!res.ok)throw new Error(`Не удалось получить данные о конкретной доске с id-${id}`);
    const data:BoardResponse = await res.json()
    return {
        id:data._id,
        title:data.title,
    }
}

export const deleteBoard = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/boards/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Не удалось удалить доску');
};

export const editBoard = async(id:string,title:string,image:Image) => {
const res = await fetch(`${API_URL}/boards/${id}`,{
    method:'PATCH',
    body:JSON.stringify({
        title,
        image
    }),
    headers:{
        'Content-Type':'application/json'

}})
if (!res.ok) throw new Error('Не удалось редактировать доску');

 const data = await res.json()

 return {
    image:data.image,
    title:data.title,
 }
}