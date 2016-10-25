/*creating a interface to read the file*/
var read=require('fs');                                             
var lineReader = require('readline').createInterface({
	input: read.createReadStream('data.csv'),
});

/*insializing variables*/
var jsonArray=[];
var heading= [];
var row=0;

/*Reading the data from the csv file*/
lineReader.on('line', function (line) {
   
   if(row === 0){
      heading=line.split(',');
       row++;
   }
   else {
       var currentLineData = line.split(',');
	   var jsonObj={};
       for (var j=0; j<heading.length; j++) {
		   if(heading[j] == "AreaName") {
				if(currentLineData[j+1] == "Total") {
					jsonObj[heading[j]] = currentLineData[j];
					count=1;
				}
				else{
					count=0;
				}
					
			}
			if(heading[j] == "Age-group") {
				if(currentLineData[j-1] == "Total") {
					jsonObj[heading[j]] = currentLineData[j];
					count=1;
				}
				else{
					count=0;
				}
					
			}
			else if(heading[j] == "Literate-Persons") {
				if(currentLineData[j-8] == "Total") {
					jsonObj[heading[j]] = currentLineData[j];
					count=1;
				}
				else{
					count=0;
				}
			}
              
       }
	   if(count == 1)
			jsonArray.push(jsonObj);   
   }

});

/*Appending the data into output file*/
lineReader.on('close',function() {
	var jso=JSON.stringify(jsonArray);
       read.appendFile('convertor_json2.json',jso,function(err) {});
});

		   
