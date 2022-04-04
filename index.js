

let deckId = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")

newDeckBtn.addEventListener("click", handleClick)
drawCardBtn.addEventListener("click", drawCards)

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/", {method: "GET"})
        .then(res => res.json())
        .then(data => {deckId = data.deck_id})
}

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=4`, {method: "GET"})
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `<img class="card" src=${data.cards[0].image} />`
            cardsContainer.children[1].innerHTML = `<img class="card" src=${data.cards[1].image} />`
        })
}