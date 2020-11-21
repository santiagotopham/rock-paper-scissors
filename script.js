const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const playerScore = document.querySelector('[data-player-score]')
const computerScore = document.querySelector('[data-computer-score]')

const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌',
        beats: 'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection

        const playerSelection = SELECTIONS.find(selection => selection.name === selectionName)

        makeSelection(playerSelection)
    })
})

function makeSelection(playerSelection){
    const computerSelection = randomSelection()
    console.log(playerSelection)
    console.log(computerSelection)
    const playerWinner = isWinner(playerSelection, computerSelection)
    const computerWinner = isWinner(computerSelection, playerSelection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(playerSelection, playerWinner)

    if (playerWinner) incrementScore(playerScore)
    if (computerWinner) incrementScore(computerScore)
}

function incrementScore(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner){

    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner(playerSelection, computerSelection){
    return playerSelection.beats === computerSelection.name
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}