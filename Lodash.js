const notes = require('./notes.js');
var _ = require('lodash');

var age = notes.age;

var result = notes.addnumber(age+18,10);
console.log(age);
console.log('result is : ' + result);

var data = ['person','person',1,2,1,2,'name','age'];
var filter = _.uniq(data);
console.log(filter);

console.log(_.isString(true));