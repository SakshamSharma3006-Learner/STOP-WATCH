const splash = document.getElementById("splash");
const container = document.querySelector(".container");

const display = document.getElementById("display");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

const laps = document.getElementById("laps");
const totalLaps = document.getElementById("totalLaps");
const bestLap = document.getElementById("bestLap");
const worstLap = document.getElementById("worstLap");
const clearBtn = document.getElementById("clearLaps");

const themeBtn = document.getElementById("themeBtn");

let startTime = 0;
let elapsed = 0;
let timer = null;
let lapTimes = [];

/* Splash Screen */

window.onload = () => {

setTimeout(() => {
splash.style.display = "none";
container.classList.remove("hide");
},3000);

};

/* Format Time */

function formatTime(ms){

let hrs = Math.floor(ms/3600000);
let mins = Math.floor((ms%3600000)/60000);
let secs = Math.floor((ms%60000)/1000);
let milli = ms%1000;

return(
String(hrs).padStart(2,"0")+":"+
String(mins).padStart(2,"0")+":"+
String(secs).padStart(2,"0")+"."+
String(milli).padStart(3,"0")
);

}

/* Update Display */

function update(){

elapsed = Date.now()-startTime;

display.textContent = formatTime(elapsed);

}

/* Start */

startBtn.onclick=()=>{

if(timer) return;

startTime = Date.now()-elapsed;

timer = setInterval(update,10);

};

/* Pause */

pauseBtn.onclick=()=>{

clearInterval(timer);

timer=null;

};

/* Reset */

resetBtn.onclick=()=>{

clearInterval(timer);

timer=null;

elapsed=0;

display.textContent="00:00:00.000";

lapTimes=[];

laps.innerHTML="";

totalLaps.textContent="0";

bestLap.textContent="--";

worstLap.textContent="--";

};
/* ---------- Lap ---------- */

lapBtn.onclick = () => {

    if (elapsed === 0) return;

    lapTimes.push(elapsed);

    const li = document.createElement("li");

    li.innerHTML = `
        <span>Lap ${lapTimes.length}</span>
        <span>${formatTime(elapsed)}</span>
    `;

    laps.prepend(li);

    totalLaps.textContent = lapTimes.length;

    let min = Math.min(...lapTimes);
    let max = Math.max(...lapTimes);

    bestLap.textContent = formatTime(min);
    worstLap.textContent = formatTime(max);

};

/* ---------- Clear Laps ---------- */

clearBtn.onclick = () => {

    lapTimes = [];

    laps.innerHTML = "";

    totalLaps.textContent = "0";
    bestLap.textContent = "--";
    worstLap.textContent = "--";

};

/* ---------- Theme Toggle ---------- */

if(localStorage.getItem("theme")==="light"){
    document.body.classList.add("light");
    themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';
}

themeBtn.onclick = () => {

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

        localStorage.setItem("theme","light");

    }else{

        themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

        localStorage.setItem("theme","dark");
    }

};

/* ---------- Keyboard Shortcuts ---------- */

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(timer){

            pauseBtn.click();

        }else{

            startBtn.click();

        }

    }

    if(e.key==="l" || e.key==="L"){

        lapBtn.click();

    }

    if(e.key==="r" || e.key==="R"){

        resetBtn.click();

    }

});

/* ---------- Prevent Selection ---------- */

document.addEventListener("selectstart",e=>e.preventDefault());

/* ---------- Ready ---------- */

display.textContent="00:00:00.000";