const startQuizBtn = document.getElementsByClassName("Start-Quiz")[0]
const startQuiz = document.getElementById("Start-Quiz")
const QuizScreen = document.getElementById("Quiz-Screen")
const EndQuiz = document.getElementById("End-Quiz")
const OptionsContainer = document.getElementsByClassName("Options-Container")[0]
const QuestionNo = document.getElementById("Current-Question")
const TotalQuestion = document.getElementById("Total-Question")
const Progress = document.getElementsByClassName("Progress")
const FinalScore = document.getElementById("FinalScore")
const restartQuiz = document.getElementsByClassName("Restart-Quiz")[0]
let Current_Question = 0
let Score = 0

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Rome", "Berlin"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Mars", "Venus", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        correct: "William Shakespeare"
    },
    {
        question: "What is the largest mammal on Earth?",
        answers: ["Blue Whale", "Elephant", "Giraffe", "Polar Bear"],
        correct: "Blue Whale"
    },
    {
        question: "Which language is used for web apps?",
        answers: ["JavaScript", "Python", "C++", "Java"],
        correct: "JavaScript"
    }
];

TotalQuestion.innerText= quizQuestions.length
percentage = (100/quizQuestions.length)

startQuizBtn.addEventListener("click", () => {
    startQuiz.classList.remove("active")
    QuizScreen.classList.add("active")
})

const Question_Updator = () => {

    OptionsContainer.innerHTML = ""
    if (Current_Question >= quizQuestions.length) {
        QuizScreen.classList.remove("active")
        EndQuiz.classList.add("active")
        FinalScore.innerText = percentage * Score
        return
    }

    Progress[0].style.width = (percentage * Current_Question) + "%"

    QuizScreen.children[0].innerText = quizQuestions[Current_Question].question;
    QuestionNo.innerText = Current_Question+1

    quizQuestions[Current_Question].answers.forEach((ans) => {

        const Button = document.createElement("button")
        Button.className = "Option"
        Button.innerText = ans
        Button.addEventListener("click", (e) => {
            const Status = e.target.innerText === quizQuestions[Current_Question].correct
            if(Status) {
                Button.classList.add("Correct")
                Score++
            }else{
                Button.classList.add("Incorrect")
            }
            
            Array.from(OptionsContainer.children).forEach(btn => btn.disabled = true);
            setTimeout(()=>{
                Current_Question++
                Question_Updator();
            }, 1000)
        })
        OptionsContainer.append(Button)
       
    })
        

}

Question_Updator()


restartQuiz.addEventListener("click",()=>{
    EndQuiz.classList.remove("active")
    startQuiz.classList.add("active")
    Current_Question = 0
    Score = 0
    Question_Updator()
})


