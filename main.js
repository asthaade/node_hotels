var prompt = require('prompt-sync')();
const age = prompt("enter your age ");
    if(age < 18){
    console.log("you get 20% discount");
}else if(age >18 && age < 65){
    console.log("Normal tickets price applies");
}else{
    console.log("you got 30% discount");
}