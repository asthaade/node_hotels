/*var add = function(a,b){
//    return a+b;
//}

//function add(a,b){
//   return a+b;
// }

var add = (a,b) => {return a+b}            //arrow function
var add = (a,b) => a+b;
var result = add(444,5);
console.log(result);
(function(){
    console.log('astha');
})();  */


/*function callback(){
    console.log('now adding is successfull completed')
}
function add(a,b,callback){
    var result = a+b;
    console.log('result :'+result);           // main function work completed
    callback();                               // after main function complete callback function is called
}
add(10000,12, callback); */


const add = function(a,b,astha){
    var result = a+b;
    console.log('result : ' +result);  // main function work completed
    astha();
}

add(2,10,function(){
    console.log('add completed');
});

add(2,8,() => console.log('add complted'));  // generally we use this function