import mongoose ,{Schema} from 'mongoose'


const BoardSchema = new Schema ({
    title: {type:String,required:true},
    image:{type:String,required:false,default:''}
})

export const Board = mongoose.model('Board',BoardSchema)