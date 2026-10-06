import mongoose ,{Schema} from 'mongoose'


const ColumnSchema = new Schema({
    title:{type:String,required:true},
    boardId:{type:Schema.Types.ObjectId,ref:'Board',required:true},
    order:{type:Number,default:0}
})

export const Column = mongoose.model('Column',ColumnSchema)