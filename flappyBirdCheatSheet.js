// Phaser Cheat Sheet - Flappy Bird

// Create a Phaser Game
const config = {
    type: Phaser.AUTO, // Renderer type (WEBGL, CANVAS, AUTO)
    width: 800, // Game width in pixels
    height: 600, // Game height in pixels
    scene: {
        preload: preload, // Function to preload assets
        create: create, // Function to create game objects
        update: update // Function for game logic update loop
    }
};

const game = new Phaser.Game(config);

// Preload assets
function preload() {
    // Load images
    this.load.image('background', 'assets/background.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
    // Load audio
    this.load.audio('jumpSound', ['assets/jumpSound.mp3', 'assets/jumpSound.ogg']);
}

// Create game objects
function create() {
    // Add background
    this.add.image(400, 300, 'background');

    // Add bird sprite
    this.bird = this.physics.add.sprite(100, 300, 'bird');

    // Add pipes group
    this.pipes = this.physics.add.group();

    // Add input for bird flap
    this.input.on('pointerdown', flapBird, this);

    // Set up physics
    this.bird.setGravityY(800);
    this.physics.add.collider(this.bird, this.pipes, gameOver, null, this);

    // Score text
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    // Background music
    const bgMusic = this.sound.add('backgroundMusic');
    bgMusic.play();
}

// Game update loop
function update() {
    // Check for collision with world bounds
    if (this.bird.y > 600 || this.bird.y < 0) {
        gameOver();
    }
}

// Function to make the bird flap
function flapBird() {
    this.bird.setVelocityY(-300);
    // Play jump sound
    const jumpSound = this.sound.add('jumpSound');
    jumpSound.play();
}

// Function to handle game over
function gameOver() {
    this.physics.pause();
    // Display game over text
    this.add.text(300, 250, 'Game Over', { fontSize: '64px', fill: '#fff' });
}

// Function to spawn pipes
function spawnPipes() {
    // Create top and bottom pipes
    const pipeTop = this.pipes.create(800, Phaser.Math.Between(-100, 200), 'pipe').setScale(2).setFlipY(true);
    const pipeBottom = this.pipes.create(800, pipeTop.y + 800, 'pipe').setScale(2);

    // Set velocity for pipes
    pipeTop.setVelocityX(-200);
    pipeBottom.setVelocityX(-200);

    // Destroy pipes when they go out of bounds
    pipeTop.checkWorldBounds = true;
    pipeTop.outOfBoundsKill = true;
    pipeBottom.checkWorldBounds = true;
    pipeBottom.outOfBoundsKill = true;
}
