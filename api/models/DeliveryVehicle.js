const mongoose =require( 'mongoose')

const vehicleTypes={
    
}
const vehicleSchema=mongoose.Schema({

    registrationNumber:{
        type:String,
        required:true,
        unique:true   
    },
    vehicleType:{
        type:String,
        enum:['bike','truck']
    },
    city:{
        type:String,
        required:true
    },
    activeOrdersCount:{
        type:Number,
        max:2,
        default:0
    }

});

module.exports = mongoose.model("Vehicle",vehicleSchema);