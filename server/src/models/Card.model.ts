import mongoose ,{Schema} from 'mongoose'


const CardSchema = new Schema({
 title:{type:String,required:true},
 description:{type:String,required:false,default:''
 },
 columnId:{type:Schema.Types.ObjectId,ref:'Column',required:true},
 order:{type:Number,default:0}
})

export const Card = mongoose.model('Card',CardSchema)