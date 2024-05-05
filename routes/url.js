const express=require('express');
const {generateNewShortUrl,getAnalytics}=require('../controllers/url');
const router=express.Router();
const URL=require('../model/url');

// router.get("/:shortId",async(req,res)=>{
//     const shortId=req.params.shortId;
//     const entry=await URL.findOneAndUpdate(
//         {
//             shortId,
//         },
//         {
//             $push:{
//                 visitHistory:{
//                     timestamp:Date.now(),
//                 }
//             },
//         }
//     );
   
//     res.redirect(entry.redirectUrl);
// })

router.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{ $push:{
        visitHistory: {
            timestamp : Date.now(),
        },
    } });
    res.redirect(entry.redirectUrl)
});

router.delete('/deletebyid/:Id',async(req,res)=>{
    await URL.findByIdAndDelete(req.params.Id);
    res.json({status:"deleted successfully"});
})

router.post("/create",generateNewShortUrl);

router.get('/getAnalytics/:shortId',getAnalytics);

module.exports=router;