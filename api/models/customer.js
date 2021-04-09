const mongoose =require( 'mongoose')

const customerSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    customerName:{
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true,
    }
})

module.exports= mongoose.model("Customer",customerSchema);