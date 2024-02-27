const question=document.getElementById("question");
const choice=Array.from(document.getElementsByClassName("choice-text"));
const questioncountertext=document.getElementById("questioncounter");
const scoretext=document.getElementById("score");
const progressbarfulltext=document.getElementById("progressbarfull");
const game=document.getElementById("game");
const loader=document.getElementById("loader");



let currques={};
// let acceptingAnswers=false;
let score=0;
let quescounter=0;
let availableques=[];
let questions=[];
/*---->fetch question from local json file code snippet*/ 
/********run with live server********/
// fetch("questions.json")
//   .then((res)=>{
//     return res.json(); 
//     /*result of parsing the body text as JSON*/
// })
// /*promise chain*/
//  .then((loadedques)=>{
// //     /*the - callback function loadedques represents the parsed JSON data obtained from the response body.*/
//   questions=loadedques; 
// //    /*By assigning loadedques to questions, you make the JSON data accessible for further processing or usage within your application.*/
//     startGame();

// })
// .catch(err=>{
//      console.error(err);
//  });


/*----> fetch question from api(open trivia api) code snippet*/
fetch("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple")
   .then(res=>{
    return res.json();
   })
   .then(loadedques=>{
    // console.log(loadedques.results);
        questions=loadedques.results.map(loadedquestion=>{/*results,incorrect, correct are related to api variable/array names*/
        const formattedques={
        question:loadedquestion.question,
       };
       const answerchoices=[...loadedquestion.incorrect_answers];
       formattedques.answer=Math.floor(Math.random()*4)+1;
       answerchoices.splice(formattedques.answer-1,0,loadedquestion.correct_answer);
      answerchoices.forEach((choice,index)=>{
            formattedques["choice" +(index+1)]=choice;
      });
     return formattedques;
    
    });
    game.classList.remove("hidden");
    loader.classList.add("hidden");
    console.log("Loader removed");
    console.log("Loader classList:", loader.classList);

// Check if the loader element is correctly selected
console.log("Loader element:", loader);


    startGame();
   })
   .catch(err=>{
    console.error(err);
   });

   

const correctreward=10;
const maxques=10;
function startGame(){
    quescounter=0;
    score=0;
    availableques=[...questions];
    getnewquestion();
    // game.classList.remove("hidden");
    // loader.classList.add("hidden");
};
function getnewquestion(){
    
    choice.forEach(choice => {
        choice.parentElement.classList.remove("correct", "incorrect");
    });
    if(availableques.length==0||quescounter>=maxques){
        localStorage.setItem("mostrecentscore",score);
        return window.location.assign("\end.html");
    }
   quescounter++;
   questioncountertext.innerText="Question "+ quescounter + "/" + maxques;
   progressbarfulltext.style.width=`${(quescounter/maxques)*100}%`;
   
   const quesindex= Math.floor(Math.random()*availableques.length);
   currques=availableques[quesindex];
   question.innerText=currques.question;
   choice.forEach(choice=>{
    const number=choice.dataset["number"];
    choice.innerText=currques["choice"+number];
   });
   availableques.splice(quesindex,1);
   acceptingAnswers=true;
};
choice.forEach(choice=>{
    choice.addEventListener('click',e=>{
    //    if(!acceptingAnswers)
    //    return;
    // acceptingAnswers=false;
    const selectedChoice=e.target;
    const selectedanswer=selectedChoice.dataset["number"];
    const classtoapply=selectedanswer==currques.answer?"correct":"incorrect";
    if (classtoapply === "incorrect") {
        const correctChoiceNumber = currques.answer;
        const correctChoiceElement = document.querySelector(`.choice-text[data-number="${correctChoiceNumber}"]`);
        correctChoiceElement.parentElement.classList.add("correct");
    }
    
    
    if(classtoapply=="correct"){
         incrementscore(correctreward);
    }
    selectedChoice.parentElement.classList.add(classtoapply);
     setTimeout(()=>{ //() is a callback function
        // selectedChoice.parentElement.classList.remove(classtoapply);
        getnewquestion();
     },1000);
    });
});
function incrementscore(num){
    score+=num;
    scoretext.innerText=score;
};




