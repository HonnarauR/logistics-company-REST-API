const express = require ('express')
const itemsControllers = require ('../controlers/items')

const router=express.Router();

router.post('/createItem',itemsControllers.create);

router.get("/",itemsControllers.get_all_items);

router.patch('/:ItemId',itemsControllers.update_Item);

module.exports=router;