const express = require ("express");
const mongoose = require("mongoose");
const User = require("./module/userModule.js");
const userRoute = require("./routes/userRoute.js");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

app.use(express.json());
dotenv.config();

// routes
app.use("/api/user", userRoute);
app.use(cors({
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST'],
    credentials: true
}));

//app.use(cors());

//app.use(express.json());
app.listen(8000,() => {
    console.log("server is running in port 8000")
});
// app.use("/api/product",async (req,res) => {
//     try {
//         const product = await Product.create(req.body);
//         res.status(200).json(product);
//     }
//         catch (error){
//             res.status(500).json({message: error.message});

//         }
//     });

    // create a product

    // app.post("/api/products",async(req,res) =>{
    //     try {
    //         const product = await Product.create(req.body);
    //         res.status(200).json(product);
    //     }
    //     catch(error){
    //         res.status(500).json({message:error.message});
    //     }
        
    // });

    // Get user by id

    // app.get("/api/products/:id",async(req,res) =>{
    //     try {
    //         const {id} = req.params;
    //         const product = await Product.findById(id);
    //         res.status(200).json(product);
    //     }
    //     catch(error){
    //         res.status(500).json({message:error.message});
    //     }
        
    // });

    // Update a product

    // app.update("/api/products/:id",async(req,res) =>{
    //     try {
    //         const {id} = req.params;
    //         const product = await Product.findByIdAndUpdate(id. req.body);
    //         if (!product)
    //         res.status(200).json(product);
    //     }
    //     catch(error){
    //         res.status(500).json({message:error.message});
    //     }
        
    // });



    mongoose
    .connect(
        process.env.MONGO_URL

    )
    .then(() => {
        console.log("database connected");
    })
    .catch(() => {
        console.log("database not connected");
    });
