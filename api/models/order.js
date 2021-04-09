const mongoose =require( 'mongoose')

const orderSchema = mongoose.Schema({
    orderNumber:{
        type:Number,
        unique:true
    },
    itemId:{
        type:String,
        required:true
    },
    price:{
        type:Number
    },
    customerId:{
        type:String
    },
    deliveryVehicleId:{
        type:String
    },
    isDelivered:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("Order",orderSchema);

// employeeController.save = function(req, res) {
//     Employee.find().sort({unitNo : -1}).limit(1).then((data) => {
//         if(data){
//             console.log(data[0].unitNo);
//             updatedunitNo = data[0].unitNo+1;
//             var employee = new Employee({
//                 name : req.body.name,
//                 email : req.body.email,
//                 phone : req.body.phone,
//                 unitNo : updatedunitNo
//             });
//             employee.save(function(err, employee) {
//                 if (err) {
//                     console.log(err);
//                     res.render("../views/employees/create");
//                 } else {
//                     console.log("Successfully created an employee.");
//                     console.log("new employee : "+employee);
//                     res.json({ employee: employee });
//                 }
//             });
//         }
//     });