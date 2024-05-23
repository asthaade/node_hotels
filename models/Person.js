const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define the Person schema
const personSchema = new mongoose.Schema({          // for more details go to mongoose documentation
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required: true,
        type:String
    }
});

personSchema.pre('save', async function(next){
    const person = this;

    // Hash the pasword only if it has been modified (or is new)
    if(!person.isModified('password')) return next();

    try{
        //hash function generation
        const salt = await bcrypt.genSalt(10);
        //Hash Password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        //Override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
});

personSchema.methods.comparePassword = async function(candidatePasword){
    try{
        //Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePasword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

//Create Person Model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;