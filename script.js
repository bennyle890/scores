$(document).ready(function () {

    const questionsDiv = $('.quiz-questions');
    const timer = $('#time-left');
    let timeLeft = 75;
    let timeInterval;
    let questionIndex = 0;
    let score;

    const questions = [
        {
            q: '1. Which pokemon is not a normal starter pokemon?',
            a: ['A. Charmander', 'B. Bulbasaur', 'C. Squirtle', 'D. Togepi'],
            correct: 'D. Pikachu'
        },
        {
            q: '2. What type is super effective against ghost?',
            a: ['A. Normal', 'B. Dark', 'C. Grass', 'D. Bug'],
            correct: 'B. Dark'
        },
        {
            q: '3. What is the most effective Poke Ball in the game?',
            a: ['A. Great Ball', 'B. Master Ball', 'C. Ultra Ball', 'D. Timer Ball'],
            correct: 'B. Master Ball'
        },
        {
            q: '4. What is the device trainers use to keep record of their Pokemon encounters?',
            a: ['A. Pokecounter', 'B. Pokefinder', 'C. Pokephone', 'D. Pokedex'],
            correct: 'D. Pokedex'
        },
        {
            q: '5. If you need to buy supplies in the Pokemon world, where do you go?',
            a: ['A. Pokemon Center', 'B. Gym', 'C. Poke Mart', 'D. Poke Dep'],
            correct: 'C. Poke Mart'
        },
        {
            q: '6. If you need to revive your fainted Pokemon to full health, where do you go?',
            a: ['A. Mount Fuji', 'B. Pokemon Center', 'C. Pokemon Mansion', 'D. Gym'],
            correct: 'B. Pokemon Center'
        },
        {
            q: '7. Who are in Team Rocket?',
            a: ['A. Jessie, James, & Meowth', 'B. Jessie, James, & Pikachu', 'C. Jessie, Ash, & Red', 'D. Pikachu, Ash, & Misty'],
            correct: 'A. Jessie, James, & Meowth'
        },
        {
            q: '8. Which pokemon has the most evolutions?',
            a: ['A. Eevee', 'B. Slowbro', 'C. Tyrogue', 'D. Pikachu'],
            correct: 'A. Eevee'
        },
        {
            q: '9. Which of these Pokemon eventually evolve into Charizard?',
            a: ['A. Chatot', 'B. Chimchar', 'C. Charajabug', 'D. Charmander'],
            correct: 'D. Charmander'
        },
        {
            q: '10. What Pokemon type is Mistys specialty?',
            a: ['A. Poison', 'B. Ice', 'C. Water', 'D. Bug'],
            correct: 'C. Water'
        },
        ]

    const startTimer = () => {
        timeInterval = setInterval(function () {
            timer.text(timeLeft);
            timeLeft--;
        }, 1000);

        ask();
    }

    const checker = () => {
        questionIndex++;
        if (questions[questionIndex] === undefined) {
            endQuiz();
        } else {
            questionsDiv.empty();
            ask();
        }
    }


    const ask = () => {
        const newQ = $('<h3>').addClass(['header', 'question-header']).text(questions[questionIndex].q);
        const answersArray = questions[questionIndex].a;
        questionsDiv.append(newQ);


        for (let i = 0; i < answersArray.length; i++) {
            const answerChoice = $('<button>').addClass(['button', 'answer-btn']).attr('value', answersArray[i]).text(answersArray[i]);
            questionsDiv.append(answerChoice);
        }


        $('.answer-btn').on('click', function () {
            console.log('You answered: ' + this.value);
            if (questions[questionIndex].correct !== this.value) {
                timeLeft -= 10;
                checker();
            } else {
                console.log('Correct!');
                checker();
            }
        });

    }

    const endQuiz = () => {
        $('.row.centered').empty();
        score = timer.text();
        clearInterval(timeInterval);
        const formHeader = $('<h3>').text(`Game Over! Your score is ${score}.`);
        const newRow = $('<div>').addClass(['row', 'centered']);
        const form = $('<div>').addClass(['ui', 'form']);
        const field = $('<div>').addClass('field');
        const label = $('<label>').text('Enter Your Initials:');
        const input = $('<input>').attr({type: 'text', id: 'initials-input'});
        const submit = $('<input>').attr({type: 'submit', id: 'submitInitials-btn', class: 'ui button'}).text('Submit');
        $('.row.centered').append(formHeader);
        $('.ui.column.grid').append(newRow);
        $(newRow).append(form);
        $(field).append([label, input]);
        $(form).append([field, submit]);
        


        submit.on('click', function () {
            const initials = $('#initials-input').val().trim();
            let highScores = localStorage.getItem('highScores');

            if (highScores !== null) {
                highScores = JSON.parse(highScores);
            } else {
                highScores = [];
            }

            let scoreObj = {score, initials};
            highScores.push(scoreObj);
            localStorage.setItem('highScores', JSON.stringify(highScores));
            window.location.assign('/assets/scores.html');

        })
    }

    startTimer();

});

// High Scores
$(document).ready(function() {
    const tableBody = $('#table-body');
    const clearScoresBtn = $('#clearScores-btn');

    const getScores = () => {
        let highScores = JSON.parse(localStorage.getItem('highScores'));
        let sortedScores = highScores.sort(function(a, b) {
            return b.score - a.score;
        });

        for (let i = 0; i < sortedScores.length; i++) {
            const tableRow = $('<tr>');
            const initialsData = $('<td>').text(highScores[i].initials);
            const scoreData = $('<td>').text(highScores[i].score);
            tableBody.append(tableRow);
            tableRow.append([initialsData, scoreData]);

        }

        clearScoresBtn.on('click', function() {
            localStorage.clear();
            location.reload();
        });
    }

    

    getScores();

});