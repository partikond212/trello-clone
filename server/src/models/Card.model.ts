import mongoose ,{Schema} from 'mongoose'


const CardSchema = new Schema({
 title:{type:String,required:false},
 description:{type:String,required:false,default:''
 },
 columnId:{type:Schema.Types.ObjectId,ref:'Column',required:true},
 order:{type:Number,default:0},
 completedTaskCount:{type:Number,required:false},
 totalTaskCount:{type:Number,required:false},
 priority:{type:String,enum:['high','mid','low']},
 tags: [{ type: String, enum: ['Баг', 'Фича', 'Дизайн', 'Срочно', 'Инфра', 'Документы'], default: [] }],
 dueDate:{type:Date,required:false,},
 tasks:[{
    taskTitle:{type:String,required:true},
   isDone:{type:Boolean,required:false}

 }]
})

export const Card = mongoose.model('Card',CardSchema)