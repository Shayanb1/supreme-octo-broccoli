// To build GameLevels, each contains GameObjects from below imports
import GamEnvBackground from './GameEngine/GameEnvBackground.js';
import Player from './GameEngine/Player.js';
import Npc from './GameEngine/Npc.js';
import Quiz from './Quiz.js';
import DialogueSystem from './DialogueSystem.js';
import GameControl from './GameEngine/GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';
import GameLevelMeteorBlaster from './GameLevelMeteorBlaster.js';
import GameLevelMinesweeper from './GameLevelMinesweeper.js';
import GameLevelEnd from './GameLevelEnd.js';

class GameLevelSkibidi {
  constructor(gameEnv) {
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_skibidi = path + "/images/gamify/backgroundg.jpg";
    //"/images/gamify/desert.png"; // be sure to include the path
    const image_data_skibidi = {
        name: 'desert',
        greeting: "Welcome to the desert!  It is hot and dry here, but there are many adventures to be had!",
        src: image_src_skibidi,
        pixels: {height: 639, width: 360}
        //{height: 580, width: 1038}
    };


    // Player data for Player (Sigma)
const sprite_src_sigma = path + "/images/gamify/PlayerDragon.png";
const SIGMA_SCALE_FACTOR = 5;
const sprite_data_sigma = {
    id: 'Sigma Boy',
    greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
    src: sprite_src_sigma,
    SCALE_FACTOR: SIGMA_SCALE_FACTOR,
    STEP_FACTOR: 350,
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

    


    // NPC data for Tux 
const sprite_src_tux = path + "/images/gamify/images.png";
const sprite_greet_tux = "Hi I am Tux, the Linux mascot. I am very happy to spend some linux shell time with you!";
const sprite_data_tux = {
    id: 'Gigachad',
    greeting: sprite_greet_tux,
    src: sprite_src_tux,
    SCALE_FACTOR: 4,
    ANIMATION_RATE: 50,
    pixels: { height: 225, width: 225 },
    INIT_POSITION: { x: 200, y: 22 },
    orientation: { rows: 1, columns: 1 },
    down: { row: 0, start: 0, columns: 1 },
    hitbox: { widthPercentage: 0.01, heightPercentage: 0.1 },
    dialogues: [
        "Try to find a way out of here, ive been trapped for millions of years",
        "I have been stuck here for a long time, it's nice to have some company",
        "I am the Gigachad, once a great warrior until I was trapped here",
        "Every day I dream to see the real world, do they still sing songs about me out there?",
        "I watched empires rise and fall from behind these cursed walls",
        "My name once shook the heavens... Now it echoes in silence",
        "Before I was trapped here, I was told there is a magic portal somewhere, but I never managed to find it",
    
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

// NPC data for wizard
const sprite_src_wizard = path + "/images/gamify/sw.png";
const sprite_greet_wizard = "Hi I am a wizard, I can help you go wherever you would like";
const sprite_data_wizard = {
    id: 'Wizard',
    greeting: sprite_greet_wizard,
    src: sprite_src_wizard,
    SCALE_FACTOR: 2.5,
    ANIMATION_RATE: 50,
    pixels: { height: 600, width: 600 },
    INIT_POSITION: { x:  width/2, y: height - 500 },
    orientation: { rows: 1, columns: 1 },
    down: { row: 0, start: 0, columns: 1 },
    hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
    dialogues: [
        "I have created a portal you can use to leave this place, use it as your own will...",
    
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

      const sprite_src_portal = path + "/images/gamify/portal.png";
      const sprite_greet_portal = "Teleport inside? Press E";
      const sprite_data_portal = {
          id: 'Mysterious Portal',
          greeting: sprite_greet_portal,
          src: sprite_src_portal,
          SCALE_FACTOR: 3,
          ANIMATION_RATE: 100,
          pixels: {width: 191, height: 263},
          INIT_POSITION: { x: 30, y: height - 200},
          orientation: {rows: 1, columns: 1 },
          down: {row: 0, start: 0, columns: 1 },
          hitbox: { widthPercentage: 0.05, heightPercentage: 0.2 },
          // Add dialogues array for random messages
          dialogues: [
              "Come inside where the secrets lie..",
          ],
          reaction: function() {
              // Don't show any reaction dialogue - this prevents the first alert
              // The interact function will handle all dialogue instead
          },
          interact: function() {
              // Clear any existing dialogue first to prevent duplicates
              if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) {
                  this.dialogueSystem.closeDialogue();
              }
              
              // Create a new dialogue system if needed
              if (!this.dialogueSystem) {
                  this.dialogueSystem = new DialogueSystem();
              }
              
              // Show portal dialogue with buttons
              this.dialogueSystem.showDialogue(
                  "Come inside, maybe this is the way out..",
                  "Mysterious Portal",
                  this.spriteData.src
              );
              
              // Add buttons directly to the dialogue
              this.dialogueSystem.addButtons([
                  {
                      text: "Enter Portal",
                      primary: true,
                      action: () => {
                          this.dialogueSystem.closeDialogue();
                          
                          // Clean up the current game state
                          if (gameEnv && gameEnv.gameControl) {
                              // Store reference to the current game control
                              const gameControl = gameEnv.gameControl;
                              
                              // Create fade overlay for transition
                              const fadeOverlay = document.createElement('div');
                              Object.assign(fadeOverlay.style, {
                                  position: 'fixed',
                                  top: '0',
                                  left: '0',
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: '#000',
                                  opacity: '0',
                                  transition: 'opacity 1s ease-in-out',
                                  zIndex: '9999'
                              });
                              document.body.appendChild(fadeOverlay);
                              
                              console.log("Starting End level transition...");
                              
                              // Fade in
                              requestAnimationFrame(() => {
                                  fadeOverlay.style.opacity = '1';
                                  
                                  // After fade in, transition to End level
                                  setTimeout(() => {
                                      // Clean up current level properly
                                      if (gameControl.currentLevel) {
                                          // Properly destroy the current level
                                          console.log("Destroying current level...");
                                          gameControl.currentLevel.destroy();
                                          
                                          // Force cleanup of any remaining canvases
                                          const gameContainer = document.getElementById('gameContainer');
                                          const oldCanvases = gameContainer.querySelectorAll('canvas:not(#gameCanvas)');
                                          oldCanvases.forEach(canvas => {
                                              console.log("Removing old canvas:", canvas.id);
                                              canvas.parentNode.removeChild(canvas);
                                          });
                                      }
                                      
                                      console.log("Setting up Dragon Realm...");
                                      
                                      // IMPORTANT: Store the original level classes for return journey
                                      gameControl._originalLevelClasses = gameControl.levelClasses;
                                      
                                      // Change the level classes to GameLevelEnd
                                      gameControl.levelClasses = [GameLevelEnd];
                                      gameControl.currentLevelIndex = 0;
                                      
                                      // Make sure game is not paused
                                      gameControl.isPaused = false;
                                      
                                      // Start the End level with the same control
                                      console.log("Transitioning to End level...");
                                      gameControl.transitionToLevel();
                                      
                                      // Fade out overlay
                                      setTimeout(() => {
                                          fadeOverlay.style.opacity = '0';
                                          setTimeout(() => {
                                              document.body.removeChild(fadeOverlay);
                                          }, 1000);
                                      }, 500);
                                  }, 1000);
                              });
                          }
                      }
                  },
                  {
                      text: "Too scared",
                      action: () => {
                          this.dialogueSystem.closeDialogue();
                      }
                  }
              ]);
          }
      }

    // List of objects defnitions for this level
    this.classes = [
      { class: GamEnvBackground, data: image_data_skibidi },
      { class: Player, data: sprite_data_sigma },
      { class: Npc, data: sprite_data_tux },
      { class: Npc, data: sprite_data_portal },
      { class: Npc, data: sprite_data_wizard }

    ];
  }

}

export default GameLevelSkibidi;