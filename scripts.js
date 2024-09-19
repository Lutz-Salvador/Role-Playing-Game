// Game variables
let xp = 0; // Player experience points
let health = 100; // Player health
let gold = 50; // Player gold
let currentWeapon = 0; // Current weapon index
let fighting; // Current monster index
let monsterHealth; // Current monster health
let inventory = ["stick"]; // Player inventory

// DOM element references
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Game data
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
]; // List of available weapons

const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 }
]; // List of available monsters

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  // ... other locations ...
];

// Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

/**
* Updates the game state and UI based on the current location.
* @param {Object} location - The current location object.
*/
function update(location) {
  // Hide monster stats by default
  monsterStats.style.display = "none";
 
  // Update button text and functions
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
 
  // Update game text
  text.innerHTML = location.text;
}

// ... other functions ...

/**
* Handles player attack.
*/
function attack() {
  // Monster attacks player
  text.innerText = "The " + monsters[fighting].name + " attacks.";
 
  // Player attacks monster
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
 
  // Calculate damage
  health -= getMonsterAttackValue(monsters[fighting].level);
 
  // Check if monster is hit
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
 
  // Update health and monster health
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
 
  // Check game over conditions
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
 
  // Randomly break player equipment
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}