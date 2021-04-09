const express = require ('express')
const orderControler = require ('../controlers/order.js')
const customerController = require('../controlers/customer.js')
const vehicleController = require("../controlers/vehiles")
const itemCountroller = require("../controlers/items")

const router=express.Router();

router.post("/createOrder",
        customerController.foundOrCreate,                                  
        itemCountroller.isItemAvailable,
        vehicleController.is_vehicle_available,
        orderControler.create_order,
        vehicleController.chengeOrderCount    
);

router.get("/",orderControler.get_all_orders);

router.patch("/:orderID",
        orderControler.orderInfo,
        orderControler.updateStatus,
        vehicleController.chengeOrderCount
);

module.exports=router;