const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

//Post route to add a MenuItem
router.post('/',async (req,res)=>{
    try{
            const data = req.body;    //Assuming the request body contains the person data

            //create a new Person document using the Mongoose model
            const newMenuItem = new MenuItem(data);

            //save the newPerson to the database
            const response = await newMenuItem.save();
            console.log('saved data');
            res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
  //get method to get the menu Items
    router.get('/',async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetcheed');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//Prameterized call for menu
router.get('/:taste',async(req,res)=>{
    try{
        const taste = req.params.taste;  //Extract the work type from the request(URL) parameters
        if(taste == 'spicy'|| taste == 'sour'|| taste == 'sweet'){
            const response = await MenuItem.find({taste:taste});
            console.log('Data fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid taste type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const ItemId = req.params.id;  //Extract the id from the URL parameter
        const updatedItemData = req.body; //Extract the person data from the request body

        const response = await MenuItem.findByIdAndUpdate(ItemId,updatedItemData,{
            new:true,    //Return the updated document
            runValidators:true   //Run Mongoose Validation
        })
        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }
        
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const itemId = req.params.id; //Extract the id from the URL parameter

        //Assuming you have a Menuitem model
        const response = await MenuItem.findByIdAndDelete(itemId);
        if(!response){
            res.status(404).json({error:'Person Not Found'});
        }else{
            console.log('Data deleted');
            res.status(200).json({message:'Data deleted Successfully'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
//Commnet added for testing purpose
module.exports = router;  //export the router