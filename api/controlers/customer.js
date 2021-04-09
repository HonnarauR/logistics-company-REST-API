const mongoose =require('mongoose');
const Customer = require('../models/customer');


// checks for Customer , if not found creates new Customer
exports.foundOrCreate=(req,res,next)=>{
    Customer.findOne({ customerName:req.body.customerName.toLowerCase() },(err,result)=>{
        if(err){
            res.status(400).json({
                message:"Unable to find Cutomer details"
            })
        }else{
            //result == null,no data found
            if(result==null){

                const customer = new Customer({
                    _id : new mongoose.Types.ObjectId(),
                    customerName:req.body.customerName.toLowerCase(),
                    city:req.body.city
                })
    
                customer.save()
                .then(innerRes=>{
                    req.customerInfo=innerRes;
                    next();
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({
                        message:"Unable to create New Customer",
                        error: err
                    })
                })
            }
            else{
                req.customerInfo=result;
                next();
            }
           
        }
      
    })
    
}
