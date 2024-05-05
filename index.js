const express=require('express'); //requiring express for simplicity in node code 
const app=express();
const cookieParser=require('cookie-parser');//requiring cookie parser

//middlewares requiring
const {restrictToLoggedInUserOnly,checkAuth}=require('./middlewares/auth');

//routes requiring
const urlRoute=require('./routes/url'); 
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");

const {connectMongoDB}=require("./connection"); //connection to Mongodb{requiring}
const URL=require('./model/url');  //requiring the MODEL of our URL
const port=2004; //port at which server is running

const path=require('path');//for EJS path {to tell where are my ejs files}

connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=> //connecting mongoDB
    console.log("mongoDB connected successfully")
);

app.set("view engine","ejs");  //telling that i am using ejs engine
app.set("views",path.resolve("./views")); //telling that all my ejs files are in views folder

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//routes

app.use("/",checkAuth,staticRoute);
app.use("/user",userRoute);
app.use("/url",restrictToLoggedInUserOnly,urlRoute);

// app.get('/url/:shortId',async(req,res)=>{
//     const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate({
//         shortId
//     },{ $push:{
//         visitHistory: {
//             timestamp : Date.now(),
//         },
//     } });
//     res.redirect(entry.redirectUrl)
// });


app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})