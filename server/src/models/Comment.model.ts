import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    text:{type:String,required:true},
    cardId:{type:Schema.Types.ObjectId,ref:"Card",required:true},
    createdAt:{type:Date,default:Date.now},

})
export const Comment = mongoose.model('Comment',CommentSchema)