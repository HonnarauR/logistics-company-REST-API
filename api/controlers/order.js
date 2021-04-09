const Order = require('../models/order');


// Creates new Order
exports.create_order =  (req,res,next)=>{

        Order.find({},{orderNumber:1}).sort({orderNumber : -1}).limit(1).exec()

        .then(docs=>{

            const seq=  (docs.length>0)? docs[0].orderNumber + 1 : 1;

            const order = new Order({
                orderNumber:seq,
                itemId:req.itemInfo._id,
                price:req.itemInfo.cost,
                customerId:req.customerInfo._id,
                deliveryVehicleId:req.vehicleInfo.registrationNumber,
            })

            order.save()
            .then(result=>{
                req.orderInfo=result;
                next();

                res.status(201).json({
                    orderNumber:result.orderNumber,
                    customerName:req.customerInfo.customerName,
                    itemName:req.itemInfo.name,
                    cost:req.itemInfo.cost,
                    city:req.customerInfo.city,
                    deliveryVehicleId:req.vehicleInfo.registrationNumber 
                })
            })
            .catch(err=>{
                console.log(err);
                res.status(200).json({
                    message:"Unable to place Order",
                    error:err
                })
            })
        })
        .catch(err2=>{
            console.log(err2);
            res.status(400).json({
                message:"Unable to find old orderNumber"
            })
        })

}


exports.get_all_orders=(req,res,next)=>{
    Order.find().exec()
    .then(docs=>{
        const All_Orders = {
            count:docs.length,
            Order_Details:docs.map(doc=>{
                return{
                    delivery_Status:doc.isDelivered,
                    orderNumber:doc.orderNumber,
                    itemId:doc.itemId,
                    price:doc.price,
                    customerId:doc.customerId,
                    deliveryVehicleId:doc.deliveryVehicleId,
                }
            })
        }
         res.status(200).json(All_Orders);
    })
    .catch(err=>res.status(400).json({
        message:"Unable get all Order details"
    }))
}

// Gives information about the order if order is available
exports.orderInfo=(req,res,next)=>{
    const orderId=req.params.orderID;
    Order.find({ orderNumber:orderId }).exec()
    .then(docs=>{
        if(docs.length>0){
            req.orderInfo=docs[0];
            next();
        }else{
            res.status(400).json({
                message:"orderId not found,InsideOrderInfo",
                err
            })
        }
    })
     .catch(err=>res.status(400).json({
         message:"orderId not found,InsideOrderInfo",
         err
     }))
}

// Updates the status of order once it is delivered
exports.updateStatus=(req,res,next)=>{
    const{isDelivered,orderNumber} =req.orderInfo
    Order.findOneAndUpdate({orderNumber:orderNumber},{$set:{isDelivered:true}},{new:true,runValidators: true},
        (err,result)=>{
            if(err){
                res.status(400).json({
                    message:"Unable to update status of Order",
                    error:err
                })
            }else{   
                next();
                res.status(200).json({
                    message: "Order Status Updated",
                    result  
                })
            }
    });
   
}
