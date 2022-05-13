//Original website: https://checkboxrace.com/
//Author: Tim Holman

//Something that drew me to this interaction is  that it's in the format of a game which makes it fun and engaging. While the layout and design is rather simple with a white background and black text, I think its simplicity actually supports the nature of the game. This game requires lots of concentration and little distraction, so I think the design reflects that well. By studying this code, I hope to learn how to generate a random stream of elements and use a clock as a time factor. 

//This section establishes single constant values
(() => {
    const allCheckboxes = document.querySelectorAll("input");
    const checkboxWrapper = document.querySelector(".checkboxes");
    const scoreBoard = document.querySelector(".score");
    const currentScore = document.querySelector(".current");
    const tips = document.querySelector(".tips");
    const timer = document.querySelector(".timer");
    const flagPiece = document.querySelector(".flagPiece");
    const finalTime = document.querySelector(".finalTime");
    const resetButton = document.querySelector(".resetButton");
    const endBoard = document.querySelector(".end");
    const boostWords = [
      "Speed!",
      "Nice!",
      "Fast!",
      "Power!",
      "Great!",
      "Awesome!",
      "Amazing!",
      "Super!",
    ];
  
//This is to reset the game
    resetButton.addEventListener("click", reset);
  
//This calls a function and sets a timer from 0
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  
    let animationFrame;
    let startTime;
  
    let currentIndex = 0;
  
    function startTimer() {
      startTime = Date.now();
      animationFrame = window.requestAnimationFrame(tick);
    }
  
//This sets the value of the timer thow count in miliseconds
    function msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 10)
          .toString()
          .padStart(2, "0"),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      return minutes + ":" + seconds + ":" + milliseconds;
    }
  
//This triggers the tick interaction of the checkbox 
    function tick() {
      var delta = Date.now() - startTime;
      timer.innerHTML = msToTime(delta);
  
      animationFrame = window.requestAnimationFrame(tick);
    }

//This determines the randomized height of each checkbox 
    function randomPosOrNeg(number) {
      const posOrNeg = Math.random() < 0.5 ? -1 : 1;
      return Math.min(Math.random() * number, window.innerHeight - 10) * posOrNeg;
    }
  
//This deterimes whether or not the following checkbox should be available, which depends on whether or not the previous checkbox has been checked
    function reset() {
      allCheckboxes.forEach((checkbox, index) => {
        checkbox.style.transform = "none";
        if (index !== 0) {
          checkbox.disabled = true;
        }
        checkbox.checked = false;
      });

      currentIndex = 0;
      checkboxWrapper.style.transform = `translateX(${-20 * currentIndex}px)`;
      currentScore.innerHTML = 0;
      tips.classList.remove("hide");
      startTime = null;
      scoreBoard.classList.remove("show");
      timer.innerHTML = "00:00:00";
      flagPiece.style.fill = "red";
      endBoard.classList.remove("show");
    }
  
//This makes the animations move vertically
    function addBoost(element) {
      let verticalMovement = new DOMMatrixReadOnly(
        window.getComputedStyle(element).transform
      ).f;
  
      const boostElement = document.createElement("div");
      boostElement.classList.add("boost");
      boostElement.style.top = `${
        checkboxWrapper.clientHeight / 2 + verticalMovement - 60
      }px`;
      boostElement.style.left = `${element.offsetLeft}px`;
      boostElement.innerHTML =
        boostWords[Math.floor(Math.random() * boostWords.length)];
      checkboxWrapper.appendChild(boostElement);
    }

//This determines whether or not all of the checkboxes have been checked
    document.body.addEventListener("click", () => {
      if (currentIndex === 0 || currentIndex === allCheckboxes.length) return;
  
      allCheckboxes[currentIndex].disabled = true;
      allCheckboxes[currentIndex - 1].checked = false;
      allCheckboxes[currentIndex - 1].disabled = false;
      currentIndex--;
      currentScore.innerText = currentIndex.toString().padStart(3, "0");
      checkboxWrapper.style.transform = `translateX(${-20 * currentIndex}px)`;
    });
  
//This stops the timer after all of the checkboxes have been checked. 
    allCheckboxes.forEach((checkbox, index) => {
      checkbox.addEventListener("click", (event) => {
        if (!startTime) {
          startTimer();
        }
  
        if (index === currentIndex) {
          if (currentIndex === 0) {
            tips.classList.add("hide");
            scoreBoard.classList.add("show");
          }
  
          event.stopPropagation();
  
          if (Math.random() > 0.6) addBoost(checkbox);
  
          currentIndex++;
          currentScore.innerText = currentIndex.toString().padStart(3, "0");
  
          if (currentIndex === allCheckboxes.length) {
            flagPiece.style.fill = "#00c800";
            cancelAnimationFrame(animationFrame);
            scoreBoard.classList.remove("show");
  
            var delta = Date.now() - startTime;
            finalTime.innerHTML = msToTime(delta);
            endBoard.classList.add("show");
            return;
          }
  
          allCheckboxes[currentIndex].disabled = false;
          checkboxWrapper.style.transform = `translateX(${-20 * currentIndex}px)`;
  
          allCheckboxes[
            currentIndex
          ].style.transform = `translateY(${randomPosOrNeg(5 + currentIndex)}px)`;
        } else if (currentIndex === allCheckboxes.length) {
          if (currentIndex === allCheckboxes.length) {
            event.stopPropagation();
            event.preventDefault();
          }
        }
      });
    });
  })();
  