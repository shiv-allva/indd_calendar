// Calendar app

var year = "1981";
var langCode = 'en';

//var year = prompt("Enter the year", new Date().getFullYear());

app.open(File($.fileName).parent.getFiles('template.indt'));

var doc = app.documents[0];
doc.textFrames.item('year').contents = ""+year;

var lang = {
    'en' : {
        weeks : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        months : ["January","February","March","April","May","June","July","August","September","October","November","December"]
    },
    'fr' : {
        weeks : ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],
        months : ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"]
    }
};


var monthsCnt = [];
for(var i=1;i<=12;i++){
    monthsCnt.push(new Date(parseInt(year), i, 0).getDate());
}

var cnt=new Date("January 1, "+year).getDay();
for(var i=0; i<12; i++){
    var table = doc.stories[1].tables[i];
    
    table.cells[0].contents = lang[langCode].months[i]; // header: month
    for(var k=0; k<7;k++){ // header: day
        table.cells[1+k].contents = lang[langCode].weeks[k][0]; 
    }
    
    var start = 8+cnt-1; // body logic
    for(var j=1; j<=monthsCnt[i];j++){
        table.cells[(start+j)].contents = ""+j;
        (cnt==6) ? cnt=0 : cnt++;
    }

    if(table.rows.lastItem().cells.everyItem().contents.toString().length <=6){
        table.rows.lastItem().remove();
    }

}

doc.save(File(File($.fileName).parent + '/calendar_'+Date.now()+'.indd'));
