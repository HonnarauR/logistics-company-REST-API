const express = require ('express')
const vehicalController = require ('../controlers/vehiles')

const router=express.Router();

router.post("/addVehicleDetails",vehicalController.create);

router.get("/",vehicalController.all_vehicles);

router.patch("/:vehicleId",vehicalController.updateInfo);

module.exports=router;