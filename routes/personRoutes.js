const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

//Post route to add a person
router.post('/',async (req,res)=>{
    try{
          const data = req.body;  //Assuming the request body contains the person data

        //create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //save the newPerson to the database
        const response = await newPerson.save();
        console.log('saved data');
        res.status(200).json(response);
    }
    catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
    }
})

//Get method to get the person
router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//parameterized call of Person
router.get('/:workType',async(req,res)=>{
    try{
      const workType = req.params.workType; //Extract the work type from the request(URL) parameters
        if(workType == 'chef'|| workType == 'waiter' || workType =='manager'){
        const response = await Person.find({work : workType});
        console.log('response fetched');
        res.status(200).json(response);
        }else{
        res.status(404).json({error:'Invalid work type'});
    }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const personId = req.params.id; //Extract the id from the URL parameter
        const updatedPersonData = req.body;  //Extract the person data from the request body

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,  //Return the updated document
            runValidators:true,  //Run Mongoose Validation
        })

        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }
        
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.statusCode(500).json({error :'Internal Server Error'});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId = req.params.id; //Extract the id from the URL parameter

        //Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }else{
            console.log('data deleted');
        res.status(200).json({message:'Person deleted Successfully'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})
module.exports = router;     //export the router