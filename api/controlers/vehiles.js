const mongoose = require('mongoose') 
const express = require('express') 
const Vehicle = require('../models/DeliveryVehicle'); 
const { orderInfo } = require('./order');

exports.create= (req,res,next)=>{
    console.log(req.body.registrationNumber);

    //Removing the Spaces from the Registration number
    let re = / /gi;
    const Registration_Number=req.body.registrationNumber.replace(re,"");

//Creating a new Vehicle instance
    const vehicle=new Vehicle({
        registrationNumber : Registration_Number,
        vehicleType : req.body.vehicleType.toLowerCase(),
        city : req.body.city.toLowerCase(),
        activeOrdersCount:req.body.activeOrdersCount
    })

    vehicle.save()
    .then(result=>{
        const message="vehicle Saved successfully";
        console.log(message);
        res.status(201).json({
            message:message,
            result:result
        })
    })
    .catch(err=>{
        console.error(err);
        res.status(400).json({
            error:err
        })
    })
}

//to get details of all vehicle 
exports.all_vehicles=(req,res,next)=>{
    Vehicle.find()
    .exec()
    .then(docs=>{
        
    const resultObject={
        count: docs.length,
        Vehicle_Details: docs.map(doc=>{
                return {
                    registrationNumber:doc.registrationNumber,
                    vehicleType :doc.vehicleType,
                    city:doc.city,
                    activeOrdersCount:doc.activeOrdersCount
                    }
                }) 
        }

        if(docs.length===0){
            res.status(404).json({
                message:"No Vehicle details available"
            })
        }
        res.status(200).json(resultObject);
    })
}


//Updating information of one vehicle
exports.updateInfo=(req,res,next)=>{

    //Removing the Spaces from the Registration number
    let re = / /gi;
    const vehicleId=req.params.vehicleId.replace(re,"");
    const filter={registrationNumber:vehicleId};

    const entries=Object.keys(req.body)
    const updates={};

        for(let i=0;i<entries.length;i++){
            if(entries[i]!="activeOrdersCount"){
                updates[entries[i]]=Object.values(req.body)[i];
            }
        }

    //runValidators helps to run validation while updating
    Vehicle.findOneAndUpdate(filter,updates,{new:true,runValidators: true},(err,result)=>{
            if(err){
                console.log(err);
                res.status(400).json({
                    message:"Unable to update",
                    error : err
                })
            }
            else{
                res.status(200).json({
                    message:`Vehicle with Id ${vehicleId} updated Successfully`,
                    result:result
                })
            }       
    })
}

//The Order Count will be reduced if the order is Deliverd else it will be increased When Order is placed
exports.chengeOrderCount=(req,res,next)=>{

    console.log(req.orderInfo);
    //checking Delivery status
    const {deliveryVehicleId,isDelivered}=req.orderInfo;
    const helper=(isDelivered)? -1:1 ;

    Vehicle.updateOne({registrationNumber:deliveryVehicleId},{$inc:{activeOrdersCount:+(helper)}})
    .exec()
    .then(result=>{
        next();
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        })
    })
}

//Checks whether  vehicle is available in city the Customer city
exports.is_vehicle_available=(req,res,next)=>{
    Vehicle.find({city:req.body.city.toLowerCase()}).exec()
    .then(docs=>{
        const availableVehicles= docs.filter(doc=>doc.activeOrdersCount<2)

        if(availableVehicles.length>0){
           req.vehicleInfo=availableVehicles[0];
            next();

        }else{
            res.status(200).json({
                message:"No vehicle available for selected city"
            })
        }  
    })
    .catch(err=>{
        console.error(err);
        res.status(400).json({
            error:err
        })
    })
}



