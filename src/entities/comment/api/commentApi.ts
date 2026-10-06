import { API_BASE_URL } from "@/shared/config/apiBaseUrl"

const COMMENTS_API = `${API_BASE_URL}/api/comments`
type CommentResponse  = {
    text:string,
    cardId:string,
    createdAt:string,
    _id:string,
}
export const getComments = async(cardId:string) => {
     const res = await fetch(`${COMMENTS_API}?cardId=${cardId}`)
    if(!res.ok) throw new Error('Не удалось найти комментарии этой карточки')

    const comments:CommentResponse[] = await res.json() 

    return comments.map((comment) => ({
        text:comment.text,
        cardId:comment.cardId,
        createdAt:comment.createdAt,
        id:comment._id

    }))
}


export const createComment = async(text:string,cardId:string) => {
     const res = await fetch(`${COMMENTS_API}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        text,
        cardId

    })
     })
    if(!res.ok) throw new Error('Не удалось создать комментарий для этой карточки')

    const comment:CommentResponse = await res.json() 

    return {
        text:comment.text,
        cardId:comment.cardId,
        createdAt:comment.createdAt,
        id:comment._id

    }
}

export const deleteComment = async(commentId:string) => {
     const res = await fetch(`${COMMENTS_API}/${commentId}`,{
        method:'DELETE',

    })
     
    if(!res.ok) throw new Error('Не удалось найти комментарии этой карточки')
}



export const editComment = async(text:string,commentId:string) => {
     const res = await fetch(`${COMMENTS_API}/${commentId}`,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            text
        })

    })

     
    if(!res.ok) throw new Error('Не удалось найти комментарии этой карточки')

        const data:CommentResponse = await res.json()

        return {
            id:data._id,
            text:data.text,
            cardId:data.cardId,
            createdAt:data.createdAt
        }
}


