

let deckId = 0
document.getElementById("new-deck").addEventListener("click", handleClick)
document.getElementById("draw-cards").addEventListener("click", drawCards)

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/", {method: "GET"})
        .then(res => res.json())
        .then(data => {deckId = data.deck_id})
}

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=4`, {method: "GET"})
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            data.cards.map(card => document.getElementById("card-images").innerHTML += `
                <img src="${card.image}">
            `)
        })
}