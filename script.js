// ================== QUIZ DATA ==================
const quizData = {
  HTML: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlinks Text Markup Language",
        "Home Tool Markup Language",
      ],
      answer: 0,
    },
    {
      question: "Which tag is used for paragraphs?",
      options: ["<div>", "<p>", "<h1>", "<span>"],
      answer: 1,
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: 1,
    },
    {
      question: "Which tag is used for images?",
      options: ["<image>", "<img>", "<pic>", "<src>"],
      answer: 1,
    },
    {
      question: "HTML files are saved with which extension?",
      options: [".ht", ".html", ".hml", ".txt"],
      answer: 1,
    },
    {
      question: "Which tag is the largest heading?",
      options: ["<h6>", "<h4>", "<h1>", "<head>"],
      answer: 2,
    },
    {
      question: "Which tag is used to create lists?",
      options: ["<list>", "<ol>", "<ul>", "Both <ol> and <ul>"],
      answer: 3,
    },
    {
      question: "Which attribute is used to provide image path?",
      options: ["href", "link", "src", "path"],
      answer: 2,
    },
    {
      question: "Which tag is used to make text bold?",
      options: ["<bold>", "<b>", "<strong>", "Both <b> and <strong>"],
      answer: 3,
    },
    {
      question: "HTML is used to?",
      options: [
        "Style web pages",
        "Structure web pages",
        "Program logic",
        "Connect database",
      ],
      answer: 1,
    },
  ],

  CSS: [
    {
      question: "What does CSS stand for?",
      options: [
        "Color Style Sheets",
        "Cascading Style Sheets",
        "Creative Style System",
        "Computer Style Sheets",
      ],
      answer: 1,
    },
    {
      question: "Which property changes text color?",
      options: ["text-color", "font-color", "color", "bgcolor"],
      answer: 2,
    },
    {
      question: "Which symbol is used for class selector?",
      options: ["#", ".", "*", "&"],
      answer: 1,
    },
    {
      question: "Which symbol is used for id selector?",
      options: [".", "#", "*", "%"],
      answer: 1,
    },
    {
      question: "Which property sets background color?",
      options: ["color", "bgcolor", "background-color", "background"],
      answer: 2,
    },
    {
      question: "Which CSS property controls text size?",
      options: ["font-style", "text-size", "font-size", "size"],
      answer: 2,
    },
    {
      question: "Which display value hides the element?",
      options: ["block", "inline", "none", "hidden"],
      answer: 2,
    },
    {
      question: "Which property is used for spacing inside element?",
      options: ["margin", "padding", "border", "spacing"],
      answer: 1,
    },
    {
      question: "Flexbox is used for?",
      options: ["Database", "Layout design", "Animations", "API calls"],
      answer: 1,
    },
    {
      question: "Which unit is relative?",
      options: ["px", "cm", "em", "mm"],
      answer: 2,
    },
  ],

  JavaScript: [
    {
      question: "What is JavaScript?",
      options: [
        "Programming language",
        "Markup language",
        "Style language",
        "Database",
      ],
      answer: 0,
    },
    {
      question: "Which keyword declares a variable?",
      options: ["var", "int", "string", "float"],
      answer: 0,
    },
    {
      question: "Which symbol is used for comments?",
      options: ["//", "<!-- -->", "**", "##"],
      answer: 0,
    },
    {
      question: "Which function shows popup message?",
      options: ["console.log()", "alert()", "prompt()", "msg()"],
      answer: 1,
    },
    {
      question: "Which operator is used to compare value and type?",
      options: ["==", "=", "===", "!="],
      answer: 2,
    },
    {
      question: "Which data type stores true/false?",
      options: ["String", "Boolean", "Number", "Object"],
      answer: 1,
    },
    {
      question: "Which method gets HTML element by id?",
      options: [
        "getElement()",
        "querySelectorAll()",
        "getElementById()",
        "getId()",
      ],
      answer: 2,
    },
    {
      question: "Which loop runs at least once?",
      options: ["for", "while", "do-while", "foreach"],
      answer: 2,
    },
    {
      question: "JavaScript runs in?",
      options: ["Server only", "Browser", "Database", "Compiler"],
      answer: 1,
    },
    {
      question: "Which keyword defines a function?",
      options: ["method", "function", "def", "fun"],
      answer: 1,
    },
  ],
};

// ================== STATE VARIABLES ==================
let currentTopic = "";
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// ================== ELEMENTS ==================
const topicSelect = document.getElementById("topic");
const startBtn = document.getElementById("startBtn");
const topicScreen = document.getElementById("topicScreen");
const quizScreen = document.getElementById("quizScreen");
const topicCards = document.querySelectorAll(".topic-card");
const backBtn = document.getElementById("backBtn");

// ================== TOPIC CARD SELECTION ==================
topicCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Remove previous selection
    topicCards.forEach((c) => c.classList.remove("selected"));

    // Select new card
    card.classList.add("selected");
    currentTopic = card.dataset.topic;

    // Enable start button
    startBtn.disabled = false;
  });
});

// ================== START BUTTON ==================
startBtn.addEventListener("click", () => {
  if (!currentTopic) return;

  topicScreen.classList.add("hidden");

  setTimeout(() => {
    topicScreen.style.display = "none";
    quizScreen.style.display = "block";
  }, 400);

  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];

  // Add topic description
  const descriptionArea = document.getElementById("descriptionArea");
  if (descriptionArea) {
    descriptionArea.innerHTML = `
      <h2>${currentTopic} Quiz</h2>
      <p>
        Welcome! This quiz tests your basic understanding of ${currentTopic}.
        Answer carefully — each question has only one correct option.
      </p>
    `;
  }

  showQuestion();
});

// ================== SHOW QUESTION ==================
function showQuestion() {
  // ✅ Validate topic before showing
  if (!quizData[currentTopic]) {
    console.error("❌ Invalid topic:", currentTopic);
    return;
  }

  const quizArea = document.getElementById("quizArea");
  const questionData = quizData[currentTopic][currentQuestionIndex];

  // ✅ Update progress bar (if exists)
  const total = quizData[currentTopic].length;
  const current = currentQuestionIndex + 1;
  if (document.getElementById("progressText")) {
    document.getElementById(
      "progressText"
    ).innerText = `Question ${current} / ${total}`;
  }
  if (document.getElementById("progressFill")) {
    document.getElementById("progressFill").style.width = `${
      (current / total) * 100
    }%`;
  }

  // ✅ Display question and options
  quizArea.innerHTML = `
    <h3>${questionData.question}</h3>
    ${questionData.options
      .map(
        (option, index) => `
          <label>
            <input 
              type="radio" 
              name="answer" 
              value="${index}"
              ${userAnswers[currentQuestionIndex] === index ? "checked" : ""}
            >
            ${option.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </label><br>
        `
      )
      .join("")}

    <div class="nav-buttons">
      <button onclick="prevQuestion()">Back</button>
      <button onclick="nextQuestion()">Next</button>
    </div>
  `;
}

// ================== NEXT QUESTION ==================
function nextQuestion() {
  const selected = document.querySelector('input[name="answer"]:checked');

  if (!selected) {
    alert("Please select an answer");
    return;
  }

  const userAnswer = parseInt(selected.value);
  userAnswers[currentQuestionIndex] = userAnswer;
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData[currentTopic].length) {
    showQuestion();
  } else {
    calculateScore();
    showResult();
  }
}

// ================== PREVIOUS QUESTION ==================
function prevQuestion() {
  if (currentQuestionIndex === 0) return;
  currentQuestionIndex--;
  showQuestion();
}

// ================== CALCULATE SCORE ==================
function calculateScore() {
  score = 0;
  quizData[currentTopic].forEach((q, index) => {
    if (userAnswers[index] === q.answer) score++;
  });
}

// ================== SHOW RESULT ==================
function showResult() {
  document.getElementById("quizArea").innerHTML = "";
  document.getElementById(
    "resultArea"
  ).innerHTML = `<h3>Your Score: ${score} / ${quizData[currentTopic].length}</h3>`;
}

// ================== BACK BUTTON ==================
backBtn.addEventListener("click", () => {
  quizScreen.style.display = "none";
  topicScreen.style.display = "block";
  topicScreen.classList.remove("hidden");

  document.getElementById("quizArea").innerHTML = "";
  document.getElementById("resultArea").innerHTML = "";
});
