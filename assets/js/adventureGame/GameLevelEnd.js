import GamEnvBackground from './GameEngine/GameEnvBackground.js';
import BackgroundParallax from './GameEngine/BackgroundParallax.js';
import Player from './GameEngine/Player.js';
import Npc from './GameEngine/Npc.js';  // Direct import for portal creation
import Collectible from './GameEngine/Collectible.js';
import Quiz from './Quiz.js';
import Game from './Game.js';
import Enemy from './GameEngine/Enemy.js';
import DialogueSystem from './DialogueSystem.js';

class GameLevelEnd {
  constructor(gameEnv) {
    console.log("Initializing GameLevelEnd...");
    
    // Store the game environment reference
    this.gameEnv = gameEnv;
    
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;
    
    //this.eyesCollected = 0;
    this.endTime = null;
    this.startTime = Date.now();
    this.gameCompleted = false;
    
    // Initialize the dialogue system
    this.dialogueSystem = new DialogueSystem();
    /*
    // Parallax background configuration
    const image_src_parallax = path + "/images/gamify/parallaxbg.png";
    const image_data_parallax = {
        name: 'parallax_background',
        id: 'parallax-background',
        greeting: "A mysterious parallax effect in the background.",
        src: image_src_parallax,
        pixels: {height: 1140, width: 2460},
        position: { x: 0, y: 0 },
        velocity: 0.2,  // Slower velocity for a more subtle effect
        layer: 0,  // Explicitly set the layer to 0 (furthest back)
        zIndex: 1  // Use positive z-index but keep it low
    };
    */
    const image_src_end = path + "/images/gamify/NewWorld.png";
    const image_data_end = {
        name: 'end',
        id: 'end-background',
        greeting: "The End opens before you, a vast black void in the distance. The stone beneath your feet is yellowish and hard, and the air tingles.",
        src: image_src_end,
        pixels: {height: 2560, width: 1536},
        layer: 1,  // Set layer to 1 to be in front of parallax
        zIndex: 5  // Higher z-index to appear above parallax
    };
    
    // Player data for Player (Sigma)
const sprite_src_sigma = path + "/images/gamify/PlayerDragon.png";
const SIGMA_SCALE_FACTOR = 5;
const sprite_data_sigma = {
    id: 'Sigma Boy',
    greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
    src: sprite_src_sigma,
    SCALE_FACTOR: SIGMA_SCALE_FACTOR,
    STEP_FACTOR: 500,
    ANIMATION_RATE: 10,
    INIT_POSITION: { x: 2000, y: 20/15 },
    pixels: { height: 760, width: 772 },
    orientation: { rows: 1, columns: 1 },
    down: { row: 0, start: 0, columns: 1 },
    downRight: { row: 0, start: 0, columns: 1 },
    downLeft: { row: 0, start: 0, columns: 1 },
    left: { row: 0, start: 0, columns: 1, flip: true },
    right: { row: 0, start: 0, columns: 1, flip: false },
    up: { row: 0, start: 0, columns: 1 },
    upLeft: { row: 0, start: 0, columns: 1 },
    upRight: { row: 0, start: 0, columns: 1 },
    flipX: false,
    hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
    keypress: { up: 87, left: 65, down: 83, right: 68 }
};
    
    const sprite_src_alex = path + "/images/gamify/images.png";
    const alex_SCALE_FACTOR = 5.5;
    const sprite_data_alex = {
        id: 'Gigachad',
        greeting: "Hey, Im Gigachad",
        src: sprite_src_alex,
        SCALE_FACTOR: alex_SCALE_FACTOR,
        STEP_FACTOR: 500,
        ANIMATION_RATE: 25,
        INIT_POSITION: { x: width/0, y: height/2 },
        pixels: {height: 225, width: 225},
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        downRight: {row: 0, start: 0, columns: 1},
        downLeft: {row: 0, start: 0, columns: 1},
        left: {row: 0, start: 0, columns: 1 },
        right: {row: 0, start: 0, columns: 1 },
        up: {row: 0, start: 0, columns: 1 },
        upLeft: {row: 0, start: 0, columns: 1},
        upRight: {row: 0, start: 0, columns: 1},
        flipX: true,
        hitbox: { widthPercentage: 0.01, heightPercentage: 0.1 },
        keypress: { up: 73, left: 74, down: 75, right: 76 } // Using I, J, K, L for Alex to differentiate from Steve
    };
    
      // NPC data for King
const sprite_src_king = path + "/images/gamify/RealKing.png";
const sprite_greet_king = "Hi I am a wizard, I can help you go wherever you would like";
const sprite_data_king = {
    id: 'The King',
    greeting: sprite_greet_king,
    src: sprite_src_king,
    SCALE_FACTOR: 4,
    ANIMATION_RATE: 50,
    pixels: { height: 640, width: 640 },
    INIT_POSITION: { x:  width/2, y: height - 370 },
    orientation: { rows: 1, columns: 1 },
    down: { row: 0, start: 0, columns: 1 },
    hitbox: { widthPercentage: 0.05, heightPercentage: 0.05 },
    dialogues: [
        "Finally some company, this is the cloud kingdom, here you are completly free from all worries, and just live life",
    
    ],
    reaction: function() {
        if (this.dialogueSystem) {
            this.showReactionDialogue();
        } else {
            console.log(sprite_greet_tux);
        }
    },
    interact: function() {
        if (this.dialogueSystem) {
            this.showRandomDialogue();
        }
    }
};

    // Store a reference to the current instance to use in closures
    const self = this;

    this.classes = [
      { class: GamEnvBackground, data: image_data_end },         // Then regular background
      { class: Player, data: sprite_data_sigma },
      { class: Npc, data: sprite_data_king},
      { class: Player, data: sprite_data_alex },
    ];
    
    if (this.gameEnv) {
    console.log("Setting up gameEnv references in GameLevelEnd");
    this.gameEnv.gameControl = gameEnv.gameControl;
    this.gameEnv.game = gameEnv.game;
    }
    // Create eye counter UI
    //this.createEyeCounter();
    
    // Create the standalone stopwatch - wait for the stats container to be available
    setTimeout(() => this.createStandaloneStopwatch(), 100);
    
    // Make sure the game environment is properly set up
    if (this.gameEnv) {
        this.gameEnv.gameControl = gameEnv.gameControl;
        this.gameEnv.game = gameEnv.game;
    }
  }
  
  // Create portal to return to desert
  createDOMPortal() {
        console.log("Creating DOM portal element");
        
        // Get screen dimensions
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        // Define portal position (customize to move it to end island)
        const portalX = screenWidth * 0.85; // 80% from the left (right side)
        const portalY = screenHeight * 0.45; // 30% from the top (upper area)
        
        const portal = document.createElement('div');
        portal.id = 'dom-portal';
        
        // Add necessary properties for collision handling
        portal.spriteData = {
            id: 'End Portal',
            greeting: "Return to Desert?",
            src: "./images/gamify/exitportalfull.png"
        };
        
        // Position the portal at custom coordinates
        portal.style.position = 'fixed';
        portal.style.top = `${portalY}px`;
        portal.style.left = `${portalX}px`;
        portal.style.transform = 'translate(-50%, -50%)';
        
        portal.style.width = '50px';
        portal.style.height = '50px';
        
        // FIX: use this.gameEnv.path instead of path
        if (this.gameEnv && this.gameEnv.path) {
            portal.style.backgroundImage = `url('${this.gameEnv.path}/images/gamify/exitportalfull.png')`;
        } else {
            // Fallback to a relative path if gameEnv.path is not available
            portal.style.backgroundImage = "url('./images/gamify/exitportalfull.png')";
            console.warn("Warning: gameEnv.path is not available, using relative path");
        }
        
        portal.style.backgroundSize = 'contain';
        portal.style.backgroundRepeat = 'no-repeat';
        portal.style.backgroundPosition = 'center';
        portal.style.zIndex = '999';
        portal.style.cursor = 'pointer';
        
        // Add an instruction overlay
        const instructions = document.createElement('div');
        instructions.style.position = 'absolute';
        instructions.style.bottom = '-40px';
        instructions.style.left = '0';
        instructions.style.width = '100%';
        instructions.style.textAlign = 'center';
        instructions.style.color = 'white';
        instructions.style.fontSize = '14px';
        instructions.style.padding = '5px';
        instructions.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        instructions.style.borderRadius = '5px';
        instructions.textContent = 'Return to Desert';
        
        portal.appendChild(instructions);
        
        // Add click event to return to desert
        portal.addEventListener('click', () => {
            // Clean up any existing game objects
            if (this.gameEnv) {
                this.gameEnv.destroy();
            }
            
            // Try to use gameControl if available
            if (this.gameEnv && this.gameEnv.gameControl) {
                // Set the level index to 0 (Desert level)
                this.gameEnv.gameControl.currentLevelIndex = 0;
                
                // Stop the current game loop
                if (this.gameEnv.gameControl.gameLoop) {
                    cancelAnimationFrame(this.gameEnv.gameControl.gameLoop);
                }
                
                // Transition to the desert level
                this.gameEnv.gameControl.transitionToLevel();
            } else {
                // Fallback: reload the page
                location.reload();
            }
        });
        
        // Add portal appearance effect
        portal.style.opacity = '0';
        portal.style.transform = 'translate(-50%, -50%) scale(0.1)';
        portal.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(portal);
        
        // Animate portal appearance
        setTimeout(() => {
            portal.style.opacity = '1';
            portal.style.transform = 'translate(-50%, -50%) scale(1)';
            
            // Add pulsating glow effect
            const glowAnimation = document.createElement('style');
            glowAnimation.innerHTML = `
                @keyframes portalPulse {
                    0% { box-shadow: 0 0 20px rgba(138, 43, 226, 0.7); }
                    50% { box-shadow: 0 0 50px rgba(138, 43, 226, 0.9); }
                    100% { box-shadow: 0 0 20px rgba(138, 43, 226, 0.7); }
                }
            `;
            document.head.appendChild(glowAnimation);
            
            portal.style.animation = 'portalPulse 2s infinite';
        }, 100);
    }
  
  // Show completion message on the eye counter
  showCompletionMessage(isNewRecord) {
    const counterContainer = document.getElementById('eye-counter-container');
    const counterText = document.getElementById('eye-counter');
    
    if (counterContainer && counterText) {
      // Update counter text
      counterText.textContent = `12/12 - ALL COLLECTED!`;
      counterText.style.color = '#00FFFF';
      
      // Add new record message if applicable
      if (isNewRecord) {
        const recordMsg = document.createElement('div');
        recordMsg.textContent = "NEW RECORD!";
        recordMsg.style.color = 'gold';
        recordMsg.style.fontWeight = 'bold';
        recordMsg.style.fontSize = '14px';
        recordMsg.style.marginTop = '5px';
        recordMsg.style.textAlign = 'center';
        counterContainer.appendChild(recordMsg);
        
        // Animate the message
        recordMsg.style.animation = 'blink 1s infinite';
        const style = document.createElement('style');
        if (!document.getElementById('blink-animation')) {
          style.id = 'blink-animation';
          style.innerHTML = `
            @keyframes blink {
              0% { opacity: 1; }
              50% { opacity: 0.5; }
              100% { opacity: 1; }
            }
          `;
          document.head.appendChild(style);
        }
      }
      
      // Add instruction for portal
      const portalMsg = document.createElement('div');
      portalMsg.textContent = "Click portal to return";
      portalMsg.style.color = 'white';
      portalMsg.style.fontSize = '12px';
      portalMsg.style.marginTop = '5px';
      portalMsg.style.textAlign = 'center';
      counterContainer.appendChild(portalMsg);
    }
  }
  
  // Create the standalone stopwatch - positioned to the left of balance container
  createStandaloneStopwatch() {
    console.log("Creating stopwatch");
    
    // Get the stats container to position timer relative to it
    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer) {
      console.error("Stats container not found, delaying timer creation");
      setTimeout(() => this.createStandaloneStopwatch(), 200);
      return;
    }
    
    // Get the position of the stats container
    const statsRect = statsContainer.getBoundingClientRect();
    
    // Create container
    const timer = document.createElement('div');
    timer.id = 'game-timer';
    timer.style.position = 'fixed';
    timer.style.top = `${statsRect.top}px`;  // Same top position as stats container
    timer.style.right = `${window.innerWidth - statsRect.left + 10}px`;  // 10px to the left of stats container
    timer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    timer.style.color = 'white';
    timer.style.padding = '10px 20px';
    timer.style.borderRadius = '10px';
    timer.style.zIndex = '1000';
    timer.style.fontSize = '20px';
    timer.style.fontWeight = 'bold';
    timer.style.border = '2px solid #4a86e8';
    timer.style.boxShadow = '0 0 10px rgba(74, 134, 232, 0.7)';
    
    // Add label and time
    const timerLabel = document.createElement('div');
    timerLabel.textContent = 'TIME';
    timerLabel.style.fontSize = '12px';
    timerLabel.style.fontWeight = 'bold';
    timerLabel.style.color = 'white';
    timerLabel.style.marginBottom = '5px';
    timerLabel.style.textAlign = 'center';
    
    const timerDisplay = document.createElement('div');
    timerDisplay.textContent = '00:00.0';
    timerDisplay.style.color = '#4a86e8';
    timerDisplay.style.textAlign = 'center';
    
    timer.appendChild(timerLabel);
    timer.appendChild(timerDisplay);
    document.body.appendChild(timer);
    
    // Start timer
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
        if (this.gameCompleted) return;
        
        const elapsed = (Date.now() - this.startTime) / 1000;
        timerDisplay.textContent = this.formatTime(elapsed);
        this.currentTime = elapsed;
    }, 100);
  }
  
  // Format time as MM:SS.T
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const tenths = Math.floor((seconds * 10) % 10);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${tenths}`;
  }
  // Create a UI counter for the eyes
  createEyeCounter() {
    const counterContainer = document.createElement('div');
    counterContainer.id = 'eye-counter-container';
    counterContainer.style.position = 'fixed';
    counterContainer.style.top = '180px'; // Position it below the stats
    counterContainer.style.right = '10px';
    counterContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    counterContainer.style.color = 'white';
    counterContainer.style.padding = '10px';
    counterContainer.style.borderRadius = '10px';
    counterContainer.style.display = 'flex';
    counterContainer.style.flexDirection = 'column'; // Changed to column for adding messages
    counterContainer.style.alignItems = 'center';
    counterContainer.style.fontFamily = "'Minecraft', sans-serif";
    counterContainer.style.zIndex = '1000';
    counterContainer.style.border = '2px solid #4a86e8';
    counterContainer.style.boxShadow = '0 0 10px rgba(74, 134, 232, 0.7)';
    counterContainer.style.minWidth = '150px'; // Ensure room for completion message
    
    // Load Minecraft-style font
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Create eye counter row with icon and counter
    const counterRow = document.createElement('div');
    counterRow.style.display = 'flex';
    counterRow.style.alignItems = 'center';
    counterRow.style.width = '100%';
    
    // Create eye icon - FIX: use this.gameEnv.path instead of path
    const eyeIcon = document.createElement('div');
    eyeIcon.style.width = '25px';
    eyeIcon.style.height = '25px';
    
    // Check if gameEnv exists before accessing path
    if (this.gameEnv && this.gameEnv.path) {
        eyeIcon.style.backgroundImage = `url('${this.gameEnv.path}/images/gamify/eyeOfEnder.png')`;
    } else {
        // Fallback to a relative path if gameEnv.path is not available
        eyeIcon.style.backgroundImage = "url('./images/gamify/eyeOfEnder.png')";
        console.warn("Warning: gameEnv.path is not available, using relative path");
    }
    
    eyeIcon.style.backgroundSize = 'contain';
    eyeIcon.style.backgroundRepeat = 'no-repeat';
    eyeIcon.style.marginRight = '10px';
    
    // Create counter text
    const counterText = document.createElement('div');
    counterText.id = 'eye-counter';
    counterText.textContent = `0/12`;
    counterText.style.fontSize = '18px';
    counterText.style.color = '#4a86e8';
    counterText.style.textShadow = '0 0 5px rgba(74, 134, 232, 0.7)';
    
    // Assemble counter
    counterRow.appendChild(eyeIcon);
    counterRow.appendChild(counterText);
    counterContainer.appendChild(counterRow);
    document.body.appendChild(counterContainer);
  }
  
  /* Update the eye counter display
  updateEyeCounter() {
    const counterText = document.getElementById('eye-counter');
    if (counterText) {
      counterText.textContent = `${this.eyesCollected}/12`;
      
      // Add visual feedback when collecting an eye
      counterText.style.transform = 'scale(1.5)';
      counterText.style.color = '#00FFFF';
      
      // Reset after animation
      setTimeout(() => {
        counterText.style.transform = 'scale(1)';
        counterText.style.color = '#4a86e8';
      }, 300);
    }
  }
  */
  
  // New method to update player's balance
  updatePlayerBalance(amount) {
    // Get the current balance from UI
    const balanceElement = document.getElementById('balance');
    if (!balanceElement) {
      console.error("Balance element not found");
      return;
    }
    
    // Parse current balance
    let currentBalance = parseInt(balanceElement.innerHTML) || 0;
    
    // Add amount to balance
    const newBalance = currentBalance + amount;
    
    // Update UI
    balanceElement.innerHTML = newBalance;
    
    // Store in localStorage
    localStorage.setItem('balance', newBalance);
    
    // Visual feedback for balance change
    balanceElement.style.transform = 'scale(1.5)';
    balanceElement.style.color = '#00FFFF';
    setTimeout(() => {
      balanceElement.style.transform = 'scale(1)';
      balanceElement.style.color = '#4a86e8';
    }, 300);
    
    // If we have access to the Java API endpoint, update server-side balance
    if (Game.id && Game.javaURI) {
      this.updateServerBalance(Game.id, amount);
    }
    
    // Show floating +100 text near the eye
    this.showFloatingPoints(amount);
  }
  
  // Update balance on server
  updateServerBalance(personId, amount) {
    // Check if Game and fetchOptions are available
    if (!Game.javaURI || !Game.fetchOptions) {
      console.error("Cannot update server balance - missing Game.javaURI or Game.fetchOptions");
      return;
    }
    
    // Endpoint for updating balance
    const endpoint = `${Game.javaURI}/rpg_answer/updateBalance/${personId}/${amount}`;
    
    // Send request to update balance
    fetch(endpoint, Game.fetchOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to update balance: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Balance updated on server:", data);
      })
      .catch(error => {
        console.error("Error updating balance on server:", error);
      });
  }
  
  // Show floating points animation
  showFloatingPoints(amount) {
    // Create floating text element
    const floatingPoints = document.createElement('div');
    floatingPoints.textContent = `+${amount}`;
    floatingPoints.style.position = 'fixed';
    floatingPoints.style.color = '#4a86e8';
    floatingPoints.style.fontSize = '24px';
    floatingPoints.style.fontWeight = 'bold';
    floatingPoints.style.textShadow = '0 0 10px rgba(74, 134, 232, 0.7)';
    floatingPoints.style.zIndex = '9999';
    
    // Get position of eye counter for reference
    const eyeCounter = document.getElementById('eye-counter-container');
    if (eyeCounter) {
      const rect = eyeCounter.getBoundingClientRect();
      floatingPoints.style.top = `${rect.top - 30}px`;
      floatingPoints.style.left = `${rect.left + 20}px`;
    } else {
      // Fallback position
      floatingPoints.style.top = '100px';
      floatingPoints.style.right = '30px';
    }
    
    // Create animation
    floatingPoints.style.animation = 'float-up 1.5s ease-out forwards';
    const style = document.createElement('style');
    if (!document.getElementById('float-animation')) {
      style.id = 'float-animation';
      style.innerHTML = `
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add to document and remove after animation
    document.body.appendChild(floatingPoints);
    setTimeout(() => {
      floatingPoints.remove();
    }, 1500);
  }
}

export default GameLevelEnd;