const express=require('express');
const financialRecord=require('../modal/financial-record');
const router=express.Router();


router.get('/getAllByUserId/:userId',async (req,res)=>{
    let {userId}=req.params;
    try {
        let result=await financialRecord.find({userId:userId});
        if(result.length===0){
            return res.status(404).send("No records found for the user");
        }
        res.status(200).send(result);

    } catch (error) {
        res.status(500).send(error);
    }
})

router.post("/",async (req,res)=>{
    const record=req.body;
    console.log(req.body);

    try {
        const result=new financialRecord(record);
        const savedResult=await result.save();    

        if(savedResult){
            res.status(200).send(savedResult);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error); 
    }
})

router.put("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const newRecord=req.body;
        const record=await financialRecord.findByIdAndUpdate(id,newRecord,
            {new:true});

        if(!record) return res.status(404).send();

        res.status(200).send(record);
    }
    catch(err){
        res.status(500).send(err);
    }
})
router.delete("/:id",async (req,res)=>{
    const {id}=req.params;
    try {
        const record=await financialRecord.findByIdAndDelete(id);
        if(!record) return res.status(404).send();
        res.status(200).send(record);
    } catch (error) {
        res.status(500).send(err);
    }
})
module.exports=router;