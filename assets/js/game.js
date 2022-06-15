// fight or skip function
var fightOrSkip = function() {

    //ask player if they'd like to fight or skip using function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // Conditional Recursive Function Call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {

        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");

            playerInfo.playerMoney = playerInfo.money - 10;

            return true;
        
        }
        else {

            return false;

        }

    }

}


// FIGHT
var fight = function(enemy) {

    //randomize starting turn
    var isPlayerTurn = true;

    if(Math.random() > 0.5) {
        isPlayerTurn = false;
    }


    // main fight loop
    while (playerInfo.health > 0 && enemy.health > 0) {

        if(isPlayerTurn){

            //Valid Fight or Skip funcation call
            if(fightOrSkip()) {

                break;

            }


            // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

  
            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                //award player money for winning
                playerInfo.money = playerInfo.money + 20;
                
                break;
            } 
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        }


        //player gets attacked first
        else {

            // remove player's health by subtracting the amount set in the enemy.attack variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );
  

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");

                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }

        }

        isPlayerTurn = !isPlayerTurn;

    }

}




// function to start new game
var startGame = function() {

    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {

        if (playerInfo.health > 0) {
    
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
    
            var pickedEnemyObj = enemyInfo[i];
    
            pickedEnemyObj.health = randomNumber(40, 60);
        
            fight(pickedEnemyObj);
            
            // Shop
            if ( playerInfo.health > 0 && i < enemyInfo.length - 1) {

                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if (storeConfirm) {

                    shop();

                }

            }
        
        }
    
        else {
    
            window.alert("You have lost your robot in battle! Game Over!");
            
            break;
            
        }
    
    }    

    // loop end, play again or defeat
    endGame();

};


//function to end the entire game
var endGame = function() {

    // Player Win
    if (playerInfo.health > 0) {

        window.alert("Great job, you've survived the game! You now had a score of " + playerInfo.money + ". Let's see how you did!");

        // check localStorage for high score, if it's not there, use 0
        var highScore = localStorage.getItem("highscore");
        if (highScore === null) {
            highScore = 0;
        }

        // if player has more money than the high score, player has new high score!
        if (playerInfo.money > highScore) {

            localStorage.setItem("highscore", playerInfo.money);
            localStorage.setItem("name", playerInfo.name);

            alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");

        } 
        else {
            alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
        }

    }

    else {

        window.alert("You've lost your robot in battle.")

    }


    // Play again query
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {

        //restart game
        startGame();
    }
    else {

        window.alert("Thank you for playing Robot Gladiators! Come back soon!")

    }
}


var shop = function() {

    // ask player shop choice
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );

    // string to int converter
    shopOptionPrompt = parseInt(shopOptionPrompt);

    // Shop switch
    switch (shopOptionPrompt) {

        case 1:
            
            playerInfo.refillHealth();

            break;

        case 2:
            
            playerInfo.upgradeAttack();

            break;

        case 3:
            window.alert("Leaving the store.");

            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop() to force player choice
            shop();

            break;
        
    }

};


// random number generator
var randomNumber = function(min, max) {

    var value = Math.floor(Math.random() *(max - min + 1)) + min;

    return value;

}


// Name Function
var getPlayerName = function () {

    var name = "";

    while(name === "" || name === null){
        name = window.prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);

    return name;
    
};


// Player Object
var playerInfo = {

    name: getPlayerName(),

    health: 100,

    attack: 10,

    money: 10,

    reset: function() {

        this.health = 100;
        this.money = 10;
        this.attack = 10;

    },

    refillHealth: function() {

        if(this.money >= 7) {

            window.alert("Refilling player's health by 20 for 7 dollars.")
            this.health += 20;
            this.money -= 7;

        }
        else {
            window.alert("You don't have enough money!")
        }
    },

    upgradeAttack: function() {

        if(this.money >= 7) {

            window.alert("Upgrading player's attack by 6 for 7 dollars.")
            this.attack += 6;
            this.money -= 7;

        }
        else {
            window.alert("You don't have enough money!")
        }

    }

};

// Enemy Array
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
]


// start the game when the page loads
startGame();