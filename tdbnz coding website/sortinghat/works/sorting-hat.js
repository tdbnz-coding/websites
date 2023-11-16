var questions = [
  {
    question: "What is your favorite color?",
    answers: {
      Gryffindor: "Red",
      Hufflepuff: "Yellow",
      Ravenclaw: "Blue",
      Slytherin: "Green"
    }
  },
  {
    question: "What is your favorite animal?",
    answers: {
      Gryffindor: "Lion",
      Hufflepuff: "Badger",
      Ravenclaw: "Eagle",
      Slytherin: "Snake"
    }
  },
  {
    question: "What is your favorite subject?",
    answers: {
      Gryffindor: "Defense Against the Dark Arts",
      Hufflepuff: "Herbology",
      Ravenclaw: "Charms",
      Slytherin: "Potions"
    }
  },
  {
    question: "What is your greatest fear?",
    answers: {
      Gryffindor: "Failure",
      Hufflepuff: "Isolation",
      Ravenclaw: "Ignorance",
      Slytherin: "Death"
    }
  },
  {
    question: "What is your ambition?",
    answers: {
      Gryffindor: "Bravery",
      Hufflepuff: "Loyalty",
      Ravenclaw: "Wisdom",
      Slytherin: "Power"
    }
  }
];

var questionCount = 0;
var housePoints = {
  Gryffindor: 0,
  Hufflepuff: 0,
  Ravenclaw: 0,
  Slytherin: 0
};

function askQuestion() {
  var questionsDiv = document.getElementById("questions");
  var resultsDiv = document.getElementById("results");
  var startButton = document.querySelector("button");
  startButton.remove();

  var ask = function() {
    if (questionCount < questions.length) {
      var q = questions[questionCount];
      var answers = Object.keys(q.answers).map(function(key) {
        return "<button class='btn btn-primary' onclick='answerQuestion(\"" + key + "\", \"" + q.answers[key] + "\")'>" + q.answers[key] + "</button>";
      }).join(" ");
      questionsDiv.innerHTML = "<p>" + q.question + "</p>" + answers;
    } else {
      var house = getHouse(housePoints);
      resultsDiv.innerHTML = "<h2>You belong to " + house + "!</h2>";
      createCookie("house", house, 365);
    }
  };

  ask();
}

function answerQuestion(house, answer) {
  housePoints[house] += 1;
  questionCount += 1;
  askQuestion();
}

function getHouse(points) {
  var maxPoints = 0;
  var house = "";
  for (var key in points) {
    if (points[key] > maxPoints) {
      maxPoints = points[key];
      house = key;
    }
  }
  return house;
}

function createCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
