var playerName = window.prompt("What is your robot's name?");

var playerHealth = 100;

var playerAttack = 10;

var playerMoney = 10;


var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
console.log(enemyNames)

var enemyHealth = 50;

var enemyAttack = 12;


var fight = function(enemyName) {

    while (playerHealth > 0 && enemyHealth > 0) {

        //FIGHT or Skip Prompt
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? enter 'FIGHT' or 'SKIP' to choose.")


        // if player choses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
        
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if(confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");

                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney ", playerMoney);

                break;
            }

        }


        // if player choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {

            // remove enemy's health by subtracting the amount set in the playerAttack variable
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

  
            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");

                //award player money for winning
                playerMoney = playerMoney + 20;
                
                break;
            } 
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

  
            // remove player's health by subtracting the amount set in the enemyAttack variable
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );
  

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");

                break;
            }
            else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
            }

        }


        else {
            window.alert("You need to choose a valid option. Try again!");
        }

    }

}


// function to start new game
var startGame = function() {

    //reset player stats
    playerHealth = 100;

    playerAttack = 30;

    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {

        if (playerHealth > 0) {
    
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
    
            var pickedEnemyName = enemyNames[i];
    
            enemyHealth = 50;
        
            fight(pickedEnemyName);
            
            // Shop
            if ( playerHealth > 0 && i < enemyNames.length - 1) {

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
    if (playerHealth > 0) {

        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");

    }
    else {

        window.alert("You've lost your robot in battle.")

    }

    // Play again query
    var playAgainConfrim = window.confirm("Would you like to play again?");

    if (playAgainConfrim) {

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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // Shop switch
    switch (shopOptionPrompt) {

        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!")
            }

            break;

        case "UPGRADE":
        case "upgrade":
            if(playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!")
            }

            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");

            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop() to force player choice
            shop();

            break;
        
    }

};


// start the game when the page loads
startGame();