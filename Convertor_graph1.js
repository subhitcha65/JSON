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
lineReader.on('line', function (line)           
{
   if(row===0){
		heading =line.split(',');
		row++;
   }
   else
   {
	   var jsonObj={};
       var currentLineData = line.split(',');
       for (var j=0; j<heading.length; j++) {
			if(heading[j]=="Area Name")
			{
				jsonObj[heading[j]] = currentLineData[j]; 				
			}
			else if(heading[j]=="Total Persons")
			{
				jsonObj[heading[j]] = currentLineData[j]; 			
			}
		}
		  jsonArray.push(jsonObj);
              
    }

});

/*Appending the data into output file*/
lineReader.on('close',function()
{
	var jso=JSON.stringify(jsonArray);
    read.appendFile('convertor_json1.json',jso,function(err) {});
});


