/*creating a interface to read the file*/
var read=require('fs');                                              //creating a interface to read the file
var lineReader = require('readline').createInterface({
	input: read.createReadStream('data.csv'),
});

/*insializing variables*/
var jsonArray=[];
var heading= [];
var row=0;

/*Reading the data from the csv file*/
lineReader.on('line', function (line) 								//Reading the data from the csv file
{
   
   if(row===0){
      heading =line.split(',');
       row++;
   }
   else
   {
       var currentLineData = line.split(',');
	   var jsonObj={};
       for (var j=0; j<heading.length; j++) {
			if(heading[j]=="Area Name"||heading[j]=="Age-group"||heading[j]=="Literate - Persons")
			{
				jsonObj[heading[j]] = currentLineData[j]; 			//Copying into the JSON object	
			}
              
       }
	   jsonArray.push(jsonObj);
       
	   
   }

});

/*Appending the data into output file*/
lineReader.on('close',function()
{
	var jso=JSON.stringify(jsonArray);
       read.appendFile('convertor_json2.json',jso,function(err) {});
});

		   
