const User = require('../model/user');
const {v4:uuidv4} = require('uuid');
const {setUser} = require('../service/auth');

async function userSignUp(req,res){
    const {name,email,password} = req.body;
    const existingUserIDs = await User.find({}, { email: 1 });
    const isDuplicate=existingUserIDs.some(user=>user.email.toString()===req.body.email.toString());
//this line is used to check the respective email entered by user in signup page,whether
//it is present priorly or not !!    
    
    if(isDuplicate)
        {
            // return res.json({error:"this email already exist"});
            return res.render('signup',{"msg":"hello !"});
            
        }
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");  //redirecting to the html page
}

async function userLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user)return res.render("login",
        ()=>{console.log("invalid credentials")},
    )
    const sessionId = uuidv4();
    setUser(sessionId,user);    //we have set a user with the unique session id so that it shows that the user is logged in 
    res.cookie('uid',sessionId); //one cookie is generated which contains the session id which is called by name "uid"
    return res.redirect("/");  //redirecting to the speccified html page
}

module.exports={
    userSignUp,
    userLogin,
}