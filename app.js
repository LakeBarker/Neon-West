//Initializing all variables
const crdTypes = ["Attack","Guard","Reload"]
const atckValues = [1, 2, 2, 2, 2, 2, 2, 2]
const grdValues = [1, 4, 4, 4, 4]
const reldValues = [1, 2, 2, 2, 2]
const ammoDisp = document.getElementById('ammoDisplay')
const healthDisp = document.getElementById('healthDisplay') 
const pDeck = []
let drawDeck = playerDeck()
//create player character stats
//First iteration not DRY, fixing with constructor function
// pCStats = [
//     health = 10,
//     ammoCount = 6,
//     alive = true
// ]

// cBStats = [
//     health = 6,
//     alive = true
// ]

class Fighter {
    //constructor goes within class to be more clean
    constructor(health, ammoCount, alive) {
        this.health = health,
        this.ammoCount = ammoCount,
        this.alive = true
    }
}

//now the Fighters need to be created
const pChar = new Fighter(10,6)
let cyBandit = new Fighter(8,6)

class Deck {
    constructor (cards = playerDeck()) {
        this.cards = cards
    }
}

class Card {
    constructor (type, value) {
        this.type = type
        this.value = value
    }
}
//create the deck, this loops through the suits and makes the deck (an array of two values) 
function playerDeck() {
    let pDeck = new Array ();

    for (i=0; i<crdTypes.length; i++) {
        if (i==0) {
        for (x=0; x < atckValues.length; x++) {
            let card = {type: crdTypes[i], value: atckValues[x]};
            pDeck.push(card);
            } 
        } else if(i==1) { 
            for (y=0; y < grdValues.length; y++) {
            let card = {type: crdTypes[i], value: grdValues[y]};
            pDeck.push(card);
            }
        } else if (i==2) {
        for (z=0; z < reldValues.length; z++) {
            let card = {type: crdTypes[i], value: reldValues[z]};
            pDeck.push(card);
            }
        }
    }
    return pDeck
}
//test initialize of a variable for our deck, then populate it with cards
// let drawDeck = playerDeck()
// shuffle(drawDeck)
// console.log(drawDeck)

//function to call when cards need to be dealt to the player's hand
function dealHand() {
    for (i=0; i<6; i++) {
        const playerHand = document.getElementById("handDisplay")
        const handCard = document.createElement('div')
        handCard.dataset.value = `${drawDeck[0].value}`
        handCard.classList.add('card')
        handCard.id = `h${i}`
        handCard.innerText = drawDeck[0].type + ' ' + drawDeck[0].value
        playerHand.appendChild(handCard)
        drawDeck.splice(0,1)
    }   
}
// dealHand()
//function to be called when the player clicks a card
function playCard() {

}

//for 500 iterations, this function will switch locations of cards in the deck at random, therefor shuffling it
function shuffle(pDeck) {
    for (i=0; i<500; i++) {
        let card1 = Math.floor((Math.random() * pDeck.length))
        let card2 = Math.floor((Math.random() * pDeck.length))
        let tempCard = pDeck[card1]

        pDeck[card1] = pDeck[card2]
        pDeck[card2] = tempCard
    }

}

//when page loads, a new deck is created and shuffled
document.addEventListener('DOMContentLoaded', function() {
    let drawDeck = playerDeck()
    shuffle(drawDeck)
    dealHand()
})