import mongoose ,{Schema} from 'mongoose'


const BoardSchema = new Schema ({
    title: {type:String,required:true},
    image:{type:String,required:false,default:''},
    color:{type:String,required:false,default:''},
    coverState:{type:String,required:false},
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    members:[{type:Schema.Types.ObjectId,ref:'User'}],
    inviteToken:{type:String}
})

export const Board = mongoose.model('Board',BoardSchema)