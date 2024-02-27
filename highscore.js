const highscorelist=document.getElementById("highscorelist");
const highscore=JSON.parse(localStorage.getItem("highscore")) || [];
/*parse-to convert string to array or to get string as array*/

highscorelist.innerHTML = highscore.map(score=>{/*go check each high score */
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");
