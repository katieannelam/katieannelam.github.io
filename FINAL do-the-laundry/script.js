var timeleft = 10;
var dogtouch = false;
var downloadTimer = setInterval(countdown, 1200);
var r = document.querySelector(':root');
document.getElementById("restart").style.display = "none"; 

function countdown(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "";
    document.getElementById("restart").style.display = "block";
    document.getElementById("dogimage").src = 'happy-puppy.png';

  } else {
  	if (dogtouch == true){
  		document.getElementById("restart").style.display = "none";
  		if (timeleft >= 9){
  			document.getElementById("dogimage").src = 'angry-puppy.png';
  		}else{
  			document.getElementById("dogimage").src = 'main-puppy.png';
  		}
  	}
    document.getElementById("countdown").innerHTML = timeleft;
  }
  timeleft -= 1;
}

function mouseOver() {
  timeleft = 10;
  dogtouch = true;
}

function restart(){
	timeleft = 10;
	dogtouch = false;
	downloadTimer = setInterval(countdown, 1200);
	document.getElementById("dogimage").src = 'main-puppy.png';
}
