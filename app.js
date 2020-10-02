const numbers = document.querySelector('.numbers');
let time = document.querySelector('.time');
const buttons = document.querySelector('.buttons');
const stop = document.querySelector('.cli');
const clear = document.querySelector('.clear');
const set = document.querySelector('.set');

var x = document.getElementById("myAudio"); 
var timesPlayed = 0;
max_plays = 2;

let str;
let SECONDS = null;

// event listener for numbers
numbers.addEventListener('click', (e)=>{
   if(e.target.tagName == 'DIV'){ return }
    
    if(time.innerHTML.length == 0 || time.innerHTML.length == 1 ){
        let gTime = time.innerHTML + e.target.dataset.numb;
        let splitTime = gTime.split(':');
        SECONDS = (Number(splitTime));
    }

    if(time.innerHTML.length == 2){
       let fCut =time.innerHTML.split('');
       let sCut = [fCut[0], ':', fCut[1]];
       let aCut = sCut.join('');
       time.innerHTML = aCut; 
       gTime = aCut + e.target.dataset.numb;
       splitTime = gTime.split(':');
       SECONDS = (Number(splitTime[0]) * 60) + Number(splitTime[1]);
    }
    if( time.innerHTML.length == 4){
        let fCut =time.innerHTML.split('');
        let sCut = [fCut[0], fCut[2], ':' ,fCut[3] ];
        let aCut = sCut.join('');
        time.innerHTML = aCut;
        gTime = aCut + e.target.dataset.numb;
        splitTime = gTime.split(':');
        SECONDS = (Number(splitTime[0]) * 60) + Number(splitTime[1]);
    }
  
    if( time.innerHTML.length == 5){
        let fCut =time.innerHTML.split('');
        let sCut = [fCut[0],':', fCut[1],fCut[3], ':' , fCut[4] ];
        let aCut = sCut.join('');
        time.innerHTML = aCut;
        gTime = aCut + e.target.dataset.numb;
        splitTime = gTime.split(':');
        SECONDS = Number(splitTime[0] * 3600) + Number(splitTime[1] * 60) + Number(splitTime[2]);
    }
    if(time.innerHTML.length == 7){
        let fCut =time.innerHTML.split('');
        let sCut = [fCut[0], fCut[2], ':' , fCut[3], fCut[5], ':', fCut[6] ];
        let aCut = sCut.join('');
        time.innerHTML = aCut;
        gTime = aCut + e.target.dataset.numb;
        splitTime = gTime.split(':');
        SECONDS = Number(splitTime[0] * 3600) + Number(splitTime[1] * 60) + Number(splitTime[2]);
    }

    if(time.innerHTML.length < 8){
        time.innerHTML = `${time.innerHTML}${e.target.dataset.numb}`;
        str = time.innerHTML.toString()
        return str;
    } 
    
    return str, SECONDS; 
});

function playAudio (){
    x.play();
    timesPlayed++;
}

x.addEventListener('ended', function(){
    if(timesPlayed >= max_plays){
        timesPlayed = 0;
        return;
    }
    x.currentTime = 0;
    x.play();
    timesPlayed++;
})

//event listener for set and clear buttons
buttons.addEventListener('click', (e)=>{
    if(e.target.classList == 'clear'){
        time.innerHTML = '';
        SECONDS = 0;
        set.classList.remove('hide');
        
    }
    if(e.target.classList == 'set' && SECONDS){
        
        stop.classList.remove('hide');
        clear.classList.add('hide');
        set.classList.add('hide');

        let myVar = setInterval(function(){
            if(SECONDS <= 0){
                clearInterval(myVar)
                stop.classList.add('hide');
                clear.classList.remove('hide');
                time.innerHTML = `00s`;
                playAudio();
            
            }
            let minute = Math.floor(SECONDS / 60) % 60;
            minute = minute < 10 ? `0${minute}` : minute;
            let secunde = SECONDS % 60;
            secunde = secunde < 10 ? `0${secunde}` : secunde;
            let ore = Math.floor((SECONDS / 60) / 60);
            ore = ore < 10 ? `0${ore}` : ore;
        
            time.innerHTML = `${ore}hr ${minute}min ${secunde}s`;
            SECONDS--;
        }, 1000)
        
        stop.addEventListener('click', ()=>{
            stop.classList.add('hide');
            clear.classList.remove('hide');
            set.classList.remove('hide');
            clearInterval(myVar);
          
        } );

    }

});
