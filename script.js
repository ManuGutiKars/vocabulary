const vocabulary = [
    { word: "Trademark", definition: "The name of a particular company or product which cannot be used by anyone else." },
    { word: "Labour costs", definition: "The money needed to pay workers in a company or a country." },
    { word: "Fee", definition: "An amount of money that you pay to do something, to use something, or to get a service." },
    { word: "Promotion", definition: "When someone is given a more important job in the same organisation." },
    { word: "Withdraw", definition: "To remove something, especially because of an official decision." },
    { word: "Target", definition: "Your audience." },
    { word: "Debt", definition: "A sum of money that is owed or due." },
    { word: "Refund", definition: "Pay back money, typically to a customer." },
    { word: "Outcome", definition: "The final result of an activity or process." },
    { word: "Inflation", definition: "The rate at which prices increase, or a continuing increase in prices." },
    { word: "Accountant", definition: "Someone whose job is to keep or examine the financial records of a company or organisation." },
    { word: "Stock", definition: "All the goods that are available in a shop." },
    { word: "Lease", definition: "To make an agreement by which someone pays you money to use something for a particular period of time." },
    { word: "Partnership", definition: "A company which is owned by two or more people." },
    { word: "Go into liquidation", definition: "To close a business because it has no money left." },
    { word: "Demand", definition: "A need for something to be sold or supplied." },
    { word: "Exploit", definition: "To use or develop something for profit or progress in business." },
    { word: "License", definition: "To give someone official permission to do or have something." },
    { word: "Hire", definition: "To begin to employ someone." },
    { word: "Deadline", definition: "A time by which something must have been done." },
    { word: "Risk", definition: "The possibility of financial loss." },
    { word: "Break into an area", definition: "To suddenly start an activity." },
    { word: "Recruitment", definition: "When you try to persuade someone to work for a company or to join an organisation." },
    { word: "Resign", definition: "To officially tell your employer that you are leaving your job." },
    { word: "Dismiss", definition: "To officially make someone leave their job." },
];

let usedDefinitions = []; // Arreglo para llevar el seguimiento de definiciones utilizadas

// Mezclar el array de forma aleatoria
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Referencias a los elementos del DOM
const definitionElem = document.getElementById("definition");
const optionsList = document.getElementById("optionsList");
const checkAnswerBtn = document.getElementById("checkAnswer");
const resultElem = document.getElementById("result");
const restartBtn = document.getElementById("restart");

let currentDefinition = {};
let options = [];
let score = { correct: 0, incorrect: 0 };
let answeredCount = 0;

// Mostrar una definición y opciones
function displayQuestion() {
    if (answeredCount >= vocabulary.length) {
        showFinalScore();
        return;
    }

    let availableDefinitions = vocabulary.filter(item => !usedDefinitions.includes(item.definition)); // Filtrar definiciones no utilizadas
    if (availableDefinitions.length === 0) {
        showFinalScore();
        return;
    }

    const shuffledDefinitions = shuffleArray(availableDefinitions);
    currentDefinition = shuffledDefinitions[Math.floor(Math.random() * shuffledDefinitions.length)];
    definitionElem.textContent = currentDefinition.definition;

    // Generar opciones con palabras
    options = [currentDefinition.word];
    while (options.length < 4) {
        const randomWord = vocabulary[Math.floor(Math.random() * vocabulary.length)].word;
        if (!options.includes(randomWord)) {
            options.push(randomWord);
        }
    }

    options = shuffleArray(options);
    optionsList.innerHTML = "";

    options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectOption(li));
        optionsList.appendChild(li);
    });
}

// Seleccionar opción
let selectedOption = null;
function selectOption(element) {
    if (selectedOption) {
        selectedOption.classList.remove("selected");
    }
    selectedOption = element;
    selectedOption.classList.add("selected");
}

// Comprobar respuesta
function checkAnswer() {
    if (!selectedOption) {
        resultElem.textContent = "Selecciona una opción.";
        return;
    }

    if (selectedOption.textContent === currentDefinition.word) {
        resultElem.textContent = "¡Correcto!";
        selectedOption.classList.add("correct");
        score.correct++;
    } else {
        resultElem.textContent = `Incorrecto. La respuesta correcta es: ${currentDefinition.word}.`;
        selectedOption.classList.add("incorrect");
        score.incorrect++;
    }

    // Añadir la definición actual a las usadas
    usedDefinitions.push(currentDefinition.definition);
    answeredCount++;
    updateScore();
    setTimeout(() => {
        selectedOption.classList.remove("selected");
        selectedOption = null;
        displayQuestion();
    }, 2000); // Espera 2 segundos antes de mostrar la siguiente pregunta
}

// Actualizar el marcador
function updateScore() {
    resultElem.innerHTML += `<br>Aciertos: ${score.correct} | Fallos: ${score.incorrect}`;
}

// Mostrar el puntaje final
function showFinalScore() {
    definitionElem.textContent = "¡Juego terminado!";
    optionsList.innerHTML = "";
    resultElem.innerHTML = `Aciertos: ${score.correct} | Fallos: ${score.incorrect}`;
    restartBtn.style.display = "block";
}

// Reiniciar juego
function restartGame() {
    score = { correct: 0, incorrect: 0 };
    answeredCount = 0;
    usedDefinitions = []; // Reiniciar las definiciones utilizadas
    resultElem.textContent = "";
    restartBtn.style.display = "none";
    displayQuestion();
}

// Inicializar juego
displayQuestion();
checkAnswerBtn.addEventListener("click", checkAnswer);
restartBtn.addEventListener("click", restartGame);
