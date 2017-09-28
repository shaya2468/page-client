var moment = require('moment');
//console.log(moment)


var stam = 1506591132 * 1000;


var mean = moment(stam).fromNow(); 

console.log(mean);

