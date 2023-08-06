const currdate= document.getElementById('date');
let weathercon=document.getElementById("weathercon");
const tempStatus="{%tempStatus%}";

const getCurrDay=()=>{
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let currentTime= new Date();
    return weekday[currentTime.getDay()];
}

const getCurrTime = ()=>{
    let now = new Date();
    var months= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let hours= now.getHours();
    let min= now. getMinutes();
    // let sec=now.getSeconds();
    let Per='AM';
    if(hours>11){
        Per='PM';
        if(hours>12)
        hours-=12;
    }
    if(min<10)
    min="0"+min;
    if(hours<10)
    hours="0"+hours;
    // if(sec<10)
    // sec="0"+sec;

    return months[now.getMonth()] + " "+ now.getDate()+ " | "+hours+":"+min+Per;
}

currdate.innerHTML= getCurrDay() +" | " + getCurrTime();