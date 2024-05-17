
// This is made with respect to client side information
let currrentsong = new Audio();
async function getsongs(){

let a= await fetch("http://127.0.0.1:5500/new.html")
let response = await a.text();
// console.log(response)
let div = document.createElement("div")
div.innerHTML = response;
let as= div.getElementsByTagName("a")
let songs=[]; //important point to notice 

for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("/music/")[1])
    }
    
}

// console.log(songs);
return songs;


}


function timeconvert(seconds) {
    if (isNaN(seconds) || seconds < 0) {
      return "Invalid input";
    }
  
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds =Math.floor(seconds % 60);
  
    // Adding leading zeros if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }

const playmusic =(track)=>{

    
    var audio =new Audio("music/"+track)
    currrentsong.src="music/"+track;
    // console.log(audio);
    currrentsong.play();
    play.src="new/pause.svg"
    document.querySelector(".songname").innerHTML=track
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"

}



async function main(){
   
    let songs= await getsongs()
    // console.log(songs)

    let songul= document.querySelector(".songs").getElementsByTagName("ul")[0];

    for (const song of songs) {
        songul.innerHTML =songul.innerHTML + `<li>
        
        <img width="25px" height="25px" src="music.svg" alt="">
        <span style="margin-top:5px"> ${song.replace("%20"," ")}</span>
        <img id="song1" src="play.svg" alt="" width="25px" height="25px">
        </li>`;
        
    }

Array.from(document.querySelector(".songs").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", element=>{

        console.log(e.getElementsByTagName("span")[0].innerHTML)
        playmusic(e.getElementsByTagName("span")[0].innerHTML.trim())
    })
})

//attach an eventlistener to play next and previous

     play.addEventListener("click",()=>{

        if(currrentsong.paused){
            currrentsong.play()
            play.src="new/pause.svg"
        }
        else{
            currrentsong.pause()
            play.src="play.svg"
        }
     })
//listen for time update song
    currrentsong.addEventListener("timeupdate",()=>{
        // console.log(currrentsong.currentTime,currrentsong.duration);
        document.querySelector(".songtime").innerHTML=`${timeconvert(currrentsong.currentTime)}/${timeconvert
        (currrentsong.duration)}`;
       
       
        let a=(currrentsong.currentTime/currrentsong.duration);
        // console.log(a);
        
        //important for adding css with javascript
        
        if(a==1){
            document.querySelector(".circle").style.left="100%";

        }
        else{
            document.querySelector(".circle").style.left=a*100 + "%";
        }
        
        
        
    })


}

main();
// play();