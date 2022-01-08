//Dependencies 
const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')
const app = express();

// imported routes
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')

const initialDataRoute = require('./routes/admin/initialDataRoute')


//Middelwares
env.config();
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '/uploads/')));


//mongodb connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.jolft.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false
    }).then(
        ()=>{
  console.log("database connected");

});

//routing

app.use('/api',userRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api', productRoutes )
app.use('/api', cartRoutes)
app.use('/api', orderRoutes)

app.use('/api', initialDataRoute)


app.get('/',(req,res,next) => {
    res.status(200).json(
        {
            message:"The Server is Running!"
        }
    )
});



// Express APP
app.listen( process.env.PORT, () => { 
    console.log(`The Server is Running on PORT  ${process.env.PORT}`)
})

