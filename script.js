// Dữ liệu mẫu (mày thay bằng 500 câu thật sau)
let questions = {};

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        // Sau khi tải dữ liệu, mày có thể gọi hàm khởi động quiz
    })
    .catch(error => console.error('Lỗi khi tải dữ liệu:', error));

let currentChapter = '';
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 600; // 10 phút

function startQuiz(chapter) {
    currentChapter = chapter;
    currentQuestion = 0;
    score = 0;
    timeLeft = 600;
    document.getElementById('home').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('chapter-title').innerText = `Chương ${chapter.slice(-1)}`;
    startTimer();
    loadQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById('time').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft <= 0) endQuiz();
    }, 1000);
}

function loadQuestion() {
    const q = questions[currentChapter][currentQuestion];
    document.getElementById('question').innerText = q.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.innerText = `${String.fromCharCode(65 + index)}. ${opt}`;
        btn.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const q = questions[currentChapter][currentQuestion];
    if (selected === q.answer) score++;
    document.querySelectorAll('.option').forEach(btn => btn.disabled = true);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions[currentChapter].length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').innerText = `${score}/${questions[currentChapter].length}`;
}

function restartQuiz() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}