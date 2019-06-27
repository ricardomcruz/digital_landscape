//Information about current date

window.onload = function() {
  clock();  
    function clock() {
    var now = new Date();
    var TwentyFourHour = now.getHours();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
     
document.getElementById('hours').innerHTML = hours;
document.getElementById('minutes').innerHTML = minutes;
document.getElementById('seconds').innerHTML = seconds;





// Total cumulative minutes of current day
var currentTime = (60*hours) + minutes;
console.log(currentTime)

//The next variables should conect to real information about sun path in user location

var startSun = 7*60; 
var endSun = 21*60;
var midSun = 12*60;



var lightness = 100;  // from HS(L)

//Conversion of sun duration to desired color attribute.

function timePath(currentTime, startSun, midSun, endSun, lightness=100){
  
  var morningDuration = midSun - startSun;
  var afternoonDuration = endSun - midSun;
  
  var timeToLightnessMorning =  lightness / morningDuration;
  
  var timeToLightnessAfternoon =  lightness / afternoonDuration;
  var currentLightness = 0;
  
  
  
  if (currentTime >= startSun && currentTime < midSun){
    currentLightness = parseInt((currentTime-startSun) * timeToLightnessMorning);
    document.getElementById('sentence').innerHTML = "Good Morning";
  }
  else if (currentTime >= midSun && currentTime < endSun){
    currentLightness = parseInt((endSun-currentTime) * timeToLightnessAfternoon);
    document.getElementById('sentence').innerHTML = "Good Afternoon! You have to wait " + (endSun-currentTime) + " minutes to see the sunset" ;

  }
  else{
    currentLightness = 0;
    document.getElementById('sentence').innerHTML = "Hello Darkness";

  }
  return currentLightness
}

var L = timePath(currentTime, startSun, midSun, endSun);


//document.body.style.backgroundColor = "hsl(197, 71%, " + L+"%)";


document.body.style.backgroundImage = "linear-gradient(to top, hsl(197, 71%, " + L+"%), hsl(197, 71%, " + (L+5)+"%))";










    setTimeout(clock, 1000);
    }
}









// Get information about location


var requestUrl = "http://ip-api.com/json";

$.ajax({
  url: requestUrl,
  type: 'GET',
  success: function(json)
  {
    console.log("My country is: " + json.country);
  },
  error: function(err)
  {
    console.log("Request failed, error= " + err);
  }
});


// Get information about sunrise and sunset

function sunPosition(){
  req=new XMLHttpRequest();
  req.open("GET","https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today",true);
  req.send();
  req.onload=function(){
    
    json=JSON.parse(req.responseText);
    var sunrise=json.results.sunrise;
    var sunset=json.results.sunset;
    var dayLength=json.results.day_length;
    var civilBegin=json.results.civil_twilight_begin;
    var civilEnd=json.results.civil_twilight_end;
    var info = "The sunrise is at " + sunrise;
    document.getElementsByClassName('message')[0].innerHTML=JSON.stringify(info);
    
  };
};




document.addEventListener('DOMContentLoaded',function(){
  
  sunPosition()
  
});







// working

