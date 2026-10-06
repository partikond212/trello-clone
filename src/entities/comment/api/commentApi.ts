import { API_BASE_URL } from "@/shared/config/apiBaseUrl"
import { throwApiError } from "@/shared/utils/apiError"

const COMMENTS_API = `${API_BASE_URL}/api/comments`
type CommentResponse  = {
    text:string,
    cardId:string,
    createdAt:string,
    _id:string,
}
export const getComments = async(cardId:string) => {
     const res = await fetch(`${COMMENTS_API}?cardId=${cardId}`)
    if(!res.ok) await throwApiError(res, 'Не удалось найти комментарии этой карточки')

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
    if(!res.ok) await throwApiError(res, 'Не удалось создать комментарий')

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

    if(!res.ok) await throwApiError(res, 'Не удалось удалить комментарий')
}



export const editComment = async(text:string,commentId:string) => {
     const res = await fetch(`${COMMENTS_API}/${commentId}`,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            text
        })

    })


    if(!res.ok) await throwApiError(res, 'Не удалось отредактировать комментарий')

        const data:CommentResponse = await res.json()

        return {
            id:data._id,
            text:data.text,
            cardId:data.cardId,
            createdAt:data.createdAt
        }
}


