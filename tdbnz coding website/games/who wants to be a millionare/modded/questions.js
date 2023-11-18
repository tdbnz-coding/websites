// questions.js
// Question data

export const allQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: "Paris",
    value: 100,
  },
  {
    question: "What mathematical constant is approximately equal to 2.71828?",
    options: ["Pi (π)", "Euler's Number (e)", "Golden Ratio (φ)", "Imaginary Unit (i)"],
    correctAnswer: "Euler's Number (e)",
    value: 200,
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
    value: 300,
  },
  {
    question: "In which year did World War II end?",
    options: ["1943", "1945", "1950", "1939"],
    correctAnswer: "1945",
    value: 500,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    value: 1000,
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Ringgit"],
    correctAnswer: "Yen",
    value: 2000,
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Mars",
    value: 4000,
  },
  {
    question: "In which year did the Titanic sink?",
    options: ["1912", "1920", "1931", "1945"],
    correctAnswer: "1912",
    value: 8000,
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    value: 16000,
  },
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra",
    value: 32000,
  },
  {
    question: "Which of these is a prime number?",
    options: ["9", "15", "21", "19"],
    correctAnswer: "19",
    value: 64000,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci",
    value: 125000,
  },
  {
    question: "What is the largest ocean?",
    options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
    value: 250000,
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "South Korea", "Vietnam"],
    correctAnswer: "Japan",
    value: 500000,
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    correctAnswer: "Mount Everest",
    value: 1000000,
  },
];

// Utility function to shuffle an array
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Utility function to format a number with commas
export function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}