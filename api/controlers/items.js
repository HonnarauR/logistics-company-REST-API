const mongoose = require('mongoose') 
const express = require('express') 
const Item = require('../models/items') 

// Creates a new Item
exports.create= (req,res,next)=>{
    const item=new Item({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name.toLowerCase(),
        cost : req.body.cost
    })

    item.save()
    .then(result=>{
        const message="Item Saved successfully";
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

exports.get_all_items=(req,res,next)=>{
    Item.find().exec()
    .then(docs=>{
        const resultObject={
            count: docs.length,
            Items_Details: docs.map(doc=>{
                    return {
                        _id:doc._id,
                        name :doc.name,
                        cost:doc.cost,
                    }
                }) 
        }

        if(docs.length===0){
            res.status(404).json({
                message:"No Items available"
            })
        }
        res.status(200).json(resultObject);
    })
}

// Updates all fields requested in req.body
exports.update_Item=(req,res,next)=>{
    const filter = { _id: req.params.ItemId };
    const update = req.body;

    //I am using new=true, to get the document after updating
    Item.findOneAndUpdate(filter,update,{new: true,runValidators: true},(err,result)=>{
        if(err){
            res.status(400).json({err});
        }
        res.status(200).json({
            message:"Item updated Successfull",
            result:result
        })
    })   
}

// Checks whether the Item is available or not
exports.isItemAvailable=(req,res,next)=>{
    Item.findOne({name:req.body.itemName.toLowerCase()},(err,result)=>{
        if(err){
            console.log(err);
            res.status(400).json({
                err
            })
        }else{
            if(result!==null){
                req.itemInfo=result;
                next();
            }else{
                res.status(404).json({message:"Unable to find Item"});
            }    
        }
    })
}

