// selecting items
const flashCards = document.querySelector(".flashcards");
const createBox = document.querySelector(".create-box");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const newCard = document.querySelector(".newBtn");
const delCard = document.querySelector(".delBtn");
const saveBtn = document.querySelector(".saveBtn");
const closeBtn = document.querySelector(".closeBtn");
let contentArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

newCard.addEventListener("click", showCreateBox);
delCard.addEventListener("click", delFlashCards);
saveBtn.addEventListener("click", addFlashCards);
closeBtn.addEventListener("click", hideCreateBox);


// functions
function showCreateBox() {
    createBox.style.display = "block";
}

function hideCreateBox() {
    createBox.style.display = "none";
}

function addFlashCards() {
    // creating a dictonary of the values user puts in the textarea
    if (question.value == '' || answer.value == '') {
        alert("Please enter values");
    } else {

        var flashCard_info = {
            'my_question': question.value,
            'my_answer': answer.value
        };

        contentArray.push(flashCard_info);
        localStorage.setItem("items", JSON.stringify(contentArray));
        divMaker(contentArray[contentArray.length - 1]);
        setBackToDefault();
    }
}

// so that when the window loads a div is made for every flashcard in the localStorage
contentArray.forEach(divMaker);

function divMaker(text) {
    var div = document.createElement("div");
    var h2_question = document.createElement("h2");
    var h2_answer = document.createElement("h2");
    var answerBtn = document.createElement("button");

    div.className = "flashcard";

    h2_question.setAttribute("style", "border-top: 1px solid red;padding: 15px; margin-top: 30px;text-transform:capitalize");
    h2_question.innerHTML = text.my_question;
    
    answerBtn.setAttribute("style","border: none; display:flex; margin: 1rem 0.5rem; background: #fff; color: red; font-size: 1.1rem")
    answerBtn.innerHTML = `Show Answer`;
    
    h2_answer.setAttribute("style", "text-align: left;  color: black; display:none; margin: 1rem; text-transform: capitalize");
    h2_answer.innerHTML = text.my_answer;

    // they append in this order
    div.appendChild(h2_question);
    div.appendChild(answerBtn);
    div.appendChild(h2_answer);

    answerBtn.addEventListener("click", () => {
        if (h2_answer.style.display == "none") {
            h2_answer.style.display = "block"
            answerBtn.textContent = "Hide Answer";
            answerBtn.style.color = "blue";
        } else {
            h2_answer.style.display = "none"
            answerBtn.textContent = "Show Answer";
            answerBtn.style.color = "red";
        }
    });

    // appending the div to the container to display
    flashCards.appendChild(div);
}

function delFlashCards() {
    localStorage.clear();
    flashCards.innerHTML = '';
    contentArray = [];
}

function setBackToDefault() {
    question.value = "";
    answer.value = "";
}