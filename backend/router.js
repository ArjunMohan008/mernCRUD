const express = require("express");
const router = express.Router();
const infoSchema = require("./infoSchema");

// Create
router.post("/", async (req,res) => {
    console.log(req.body);
    var data = new infoSchema({
        Name : req.body.Name,
        Age : req.body.Age,
        City : req.body.City
    });

    await data.save();
    res.json(data);
})

// getAll
router.get("/", async(req,res) => {
    var getAll = await infoSchema.find();
    res.status(200).json(getAll);
})

// Update
router.put("/update", async(req,res) => {
    console.log(req.body);
    var updateInfo = await infoSchema.update({_id:req.body._id},{$set:{
        Name : req.body.Name,
        Age : req.body.Age,
        City : req.body.City
    }});
    res.json(updateInfo);
})

// Delete
router.delete("/del/:id", async(req,res) => {
    var deleteInfo = await infoSchema.findByIdAndDelete(req.params.id).then(e=> {
        res.json({message:"Deleted successfully"});
    });
})

module.exports = router;
