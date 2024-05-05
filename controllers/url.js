const shortid=require('shortid');
const URL=require('../model/url');

async function generateNewShortUrl(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required!!"});
    const shortID=shortid();
    await URL.create({
        shortId:shortID,
        redirectUrl:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    });

    //rendering html page

    return res.render('home',{
        id:shortID,
    })

    //rendering json format

    // return res.json({    
    //     id:shortID
    // })
}

async function getAnalytics(req,res){
    const shortId=req.param.shortId;
    const result=await URL.findOne(shortId);
    return res.json({
        totalclicks:result.visitHistory.length,
        analytics:result.visitHistory,
    })

}

module.exports={
    generateNewShortUrl,
    getAnalytics,
}