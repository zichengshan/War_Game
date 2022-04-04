let deckId = 0
const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const headerEl = document.getElementById("header")
const remainingText = document.getElementById("remaining")

newDeckBtn.addEventListener("click", handleClick)
drawCardBtn.addEventListener("click", drawCards)

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/", {method: "GET"})
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining Cards: ${data.remaining}`
            deckId = data.deck_id
        })
}

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`, {method: "GET"})
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining Cards: ${data.remaining}`
            cardsContainer.children[0].innerHTML = `<img class="card" src=${data.cards[0].image} />`
            cardsContainer.children[1].innerHTML = `<img class="card" src=${data.cards[1].image} />`
            headerEl.innerText = determineCardWinner(data.cards[0], data.cards[1])

            if(data.remaining === 0){
                drawCardBtn.disabled = true
                drawCardBtn.classList.add("disabled")
            }
        })
}

function determineCardWinner(card1, card2) {
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    if (card1ValueIndex > card2ValueIndex) {
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        return "You win!"
    } else {
        return "War"
    }
}
