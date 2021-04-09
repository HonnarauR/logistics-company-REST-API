//Imports
const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
const dotenv = require ("dotenv")


//App level middlewares
const app=express();

app.use(express.json())
dotenv.config();
app.use(cors());

//Importing Routes
const itemRoute = require ("./api/routes/item")
const vehicleRoute = require('./api/routes/vehicle')
const orderRoutes = require("./api/routes/order")

//Connecting to Data Base
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(()=>console.log("Mongoose Connected"))
.catch(err=>console.log(err))


app.use("/items",itemRoute);
app.use('/vehicle',vehicleRoute)
app.use("/order",orderRoutes)

//Listner
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running in PORT ${PORT}`);
})