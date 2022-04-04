

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
            document.getElementById("cards").innerHTML = `
                <img src=${data.cards[0].image} />
                <img src=${data.cards[1].image} />
            `
        })
}