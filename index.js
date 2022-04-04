let deckId = 0
let computerScore = 0
let myScore = 0
const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const headerEl = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

newDeckBtn.addEventListener("click", handleClick)
drawCardBtn.addEventListener("click", drawCards)

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/", {method: "GET"})
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining Cards: ${data.remaining}`
            deckId = data.deck_id
            drawCardBtn.disabled = false
            drawCardBtn.classList.remove("disabled")
        })
}

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`, {method: "GET"})
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining Cards: ${data.remaining}`
            cardsContainer.children[1].innerHTML = `<img class="card" src=${data.cards[0].image} />`
            cardsContainer.children[3].innerHTML = `<img class="card" src=${data.cards[1].image} />`
            headerEl.innerText = determineCardWinner(data.cards[0], data.cards[1])
            computerScoreEl.textContent = `Computer Score: ${computerScore}`
            myScoreEl.textContent = `My Score: ${myScore}`

            if(data.remaining === 0){
                drawCardBtn.disabled = true
                drawCardBtn.classList.add("disabled")
                if(computerScore > myScore){
                    headerEl.textContent = `Final Winner is Computer`
                }else if (myScore > computerScore){
                    headerEl.textContent = `Final Winner is You`
                }else {
                    headerEl.textContent = `It's a tie game!`
                }
                headerEl.style.color = "orange"
                headerEl.style.fontSize = "2em"
            }
        })
}

function determineCardWinner(card1, card2) {
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        return "You win!"
    } else {
        return "War"
    }
}
