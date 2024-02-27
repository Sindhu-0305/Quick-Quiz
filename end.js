const username=document.getElementById("username");
const savescorebtn=document.getElementById("save");
const finalscore=document.getElementById("finalscore");
const mostrecentscore=localStorage.getItem("mostrecentscore");

const highscore=JSON.parse(localStorage.getItem("highscore")) || [];/*parse-to convert string to array or to get string as array*/
const max_highscore=5;


finalscore.innerText=mostrecentscore;
username.addEventListener('keyup',()=>{
   savescorebtn.disabled=!username.value;
   
    // console.log(username.value);
});




function savehighscore(e){
  e.preventDefault();  
  const score={ /*score object*/
      
      score:mostrecentscore,
      name:username.value
  };
  highscore.push(score);
  // highscore.sort(a,b=>{
  //      return b.score-a.score;
  // })
  highscore.sort((a,b)=> b.score - a.score);/*sorting in decreasing order saying that if b score is higher than the a score then put b before a*/
  /*arrow functions has implicit return so no need for return keyword and a semicolon */
  highscore.splice(5)/*remove high scores after 5 elements*/
  /*local storage only uses key values pairs with the value being a string*/
/*stringify-to convert arr to string*/
  localStorage.setItem("highscore",JSON.stringify(highscore));
  window.location.assign("index.html");/*take back to home page after saving score*/
  
}