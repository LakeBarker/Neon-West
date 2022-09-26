//Initializing all variables
const crdTypes = ["Attack","Guard","Reload"]
const atckValues = [1, 2, 2, 2, 2, 2, 2, 2]
const grdValues = [1, 4, 4, 4, 4]
const reldValues = [1, 1, 1, 1, 1]
const ammoDisp = document.getElementById('ammoDisplay')
const healthDisp = document.getElementById('healthDisplay') 
const pDeck = []
let drawDeck = playerDeck()
shuffle(drawDeck)
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
    constructor(health, ammoCount) {
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


//------------------------Start of Functions----------------------------------------------------------------------------------------------//

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
        handCard.classList.add('card', drawDeck[0].type)
        handCard.id = `h${i}`
        handCard.innerText = drawDeck[0].type + ' ' + drawDeck[0].value
        playerHand.appendChild(handCard)
        drawDeck.splice(0,1)
    }   
}
// dealHand()
//function to be called when the player clicks a card
function banditAction() {
    let banditAct = [1,2,3,4,5,6,7,8,9,10]
    banditAct = Math.floor((Math.random() * banditAct.length))
    if (banditAct<=7) {
        cyBandit.health = cyBandit.health + 4
        // get element
    } else {
        pChar.health = pChar.health - 4
    }
}

function playCard() {   
    console.log(`Card ${this.id} Clicked!`)
    if (this.classList.contains("Attack")) {
        cyBandit.health = cyBandit.health - 2
        console.log(`${cyBandit.health}`)
        pChar.ammoCount = pChar.ammoCount - 1
            if (cyBandit.health<=0) {
                cyBandit.alive = false
                const winCon = document.getElementById('dropTarget')
                const winMessage = document.createElement('h1')
                winMessage.innerText = `Another Step Closer to the CEO...`
                //------------Don't actually need to create a new dive, just replace text//
                // const winMessage = document.createElement('div')
                // winMessage.innerHTML = 'Another Step Closer to the CEO...'
                // winMessage.classList.add('winMessage')
                // winCon.appendChild(winMessage)
            } else {
                
                return cyBandit.health
            }
    } else if (this.classList.contains("Guard")) {
        pChar.health = pChar.health+ 4
        console.log(`${pChar.health}`)
    } else if (this.classList.contains("Reload")) {
        pChar.ammoCount = pChar.ammoCount+1
    }

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
//------------------------Listeners and the actual actions----------------------------------------------------------------------------------------------//
//when page loads, a new deck is created and shuffled
document.addEventListener('DOMContentLoaded', function() {
    let drawDeck = playerDeck()
    shuffle(drawDeck)
    dealHand()
    document.getElementById('h0').addEventListener("click", playCard);
    document.getElementById('h1').addEventListener("click", playCard);
    document.getElementById('h2').addEventListener("click", playCard);
    document.getElementById('h3').addEventListener("click", playCard);
    document.getElementById('h4').addEventListener("click", playCard);
    document.getElementById('h5').addEventListener("click", playCard);
    
    const drawPile = document.getElementById('drawPile')
    drawPile.innerText = `${drawDeck.length}`

    const discardPile = document.getElementById('discardPile')
    discardPile.innerText = 18 - `${drawDeck.length}`

})

// const playH0 = document.getElementById('h0').addEventListener("click", playCard);
// const playH1 = document.getElementById('h1').addEventListener("click", playCard);
// const playH2 = document.getElementById('h2').addEventListener("click", playCard);
// const playH3 = document.getElementById('h3').addEventListener("click", playCard);
// const playH4 = document.getElementById('h4').addEventListener("click", playCard);
// const playH5 = document.getElementById('h5').addEventListener("click", playCard);
