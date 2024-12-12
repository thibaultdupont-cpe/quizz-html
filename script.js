function generateQuizz() {
    const containers = document.getElementsByClassName('quizz');
    Array.from(containers).forEach(container => {
        const id = container.id;
        fetch(id+'.json')
            .then(response => response.json())
            .then(questions => {
                const table = document.createElement('table');
                const tbody = document.createElement('tbody');
    
                questions.forEach((q, index) => {
                    const row = document.createElement('tr');
    
                    const questionCell = document.createElement('td');
                    questionCell.textContent = q.question;
    
                    const answerCell = document.createElement('td');
                    const answerDiv = document.createElement('div');
    
                    if (q.type === 'vrai/faux') {
                        const trueOption = document.createElement('input');
                        trueOption.type = 'radio';
                        trueOption.name = `answer-${id}-${index}`;
                        trueOption.value = 'vrai';
    
                        const trueLabel = document.createElement('label');
                        trueLabel.textContent = 'Vrai';
    
                        const falseOption = document.createElement('input');
                        falseOption.type = 'radio';
                        falseOption.name = `answer-${id}-${index}`;
                        falseOption.value = 'faux';
    
                        const falseLabel = document.createElement('label');
                        falseLabel.textContent = 'Faux';
    
                        answerDiv.appendChild(trueOption);
                        answerDiv.appendChild(trueLabel);
                        answerDiv.appendChild(falseOption);
                        answerDiv.appendChild(falseLabel);
                    } else if (q.type === 'valeur') {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.id = `answer-${id}-${index}`;
                        answerDiv.appendChild(input);
                    }
    
                    answerCell.appendChild(answerDiv);
                    row.appendChild(questionCell);
                    row.appendChild(answerCell);
                    tbody.appendChild(row);
    
                    const feedbackRow = document.createElement('tr');
                    const feedbackCell = document.createElement('td');
                    feedbackCell.colSpan = 2;
                    feedbackCell.id = `feedback-${id}-${index}`;
                    feedbackCell.className = 'feedback';
                    feedbackRow.appendChild(feedbackCell);
                    tbody.appendChild(feedbackRow);
                });
    
                table.appendChild(tbody);
                container.appendChild(table);
    
                const validateButton = document.createElement('button');
                validateButton.textContent = 'Valider toutes les réponses';
                validateButton.addEventListener('click', () => validateAll(questions, id));
                container.appendChild(validateButton);
            });
    });
}

function validateAll(questions, id) {
    questions.forEach((q, index) => {
        let userAnswer = '';
        if (q.type === 'vrai/faux') {
            const selectedOption = document.querySelector(`input[name='answer-${id}-${index}']:checked`);
            userAnswer = selectedOption ? selectedOption.value : '';
        } else if (q.type === 'valeur') {
            userAnswer = document.getElementById(`answer-${id}-${index}`).value.trim();
        }

        const feedbackCell = document.getElementById(`feedback-${id}-${index}`);
        feedbackCell.textContent = '';

        if (userAnswer.toLowerCase() === q.correct_answer.toLowerCase()) {
            feedbackCell.textContent = q.correct_message;
            feedbackCell.style.color = 'green';
        } else {
            feedbackCell.textContent = q.incorrect_message;
            feedbackCell.style.color = 'red';
        }
    });
}
