const mongoose =require( 'mongoose')

const itemSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true,
        unique:true
    },
    cost:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Item",itemSchema);