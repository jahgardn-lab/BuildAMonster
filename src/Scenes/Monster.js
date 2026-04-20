class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.armOffset = 80;
        this.armOffsetDown = 60;
        this.mouthOffset = 0;
        this.eyeOffset = 40;
        this.legOffset = 40;
        this.legOffsetDown = 150
        this.buttonOffset = -115;
        this.hornOffset = 50;
        this.hornOffsetDown = -100; 
        
        this.aKey = null;
        this.dKey = null;

        this.aDist = -10;
        this.dDist = 10;

        this.counter = 0;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        //adding arms
        my.sprite.leftArm = this.add.sprite(this.bodyX + this.armOffset, this.bodyY + this.armOffsetDown, "monsterParts", "arm_whiteE.png");
        my.sprite.rightArm = this.add.sprite(this.bodyX - this.armOffset, this.bodyY + this.armOffsetDown, "monsterParts", "arm_whiteE.png");
        my.sprite.rightArm.flipX = true; 

        //adding body
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_darkF.png");

        //Adding mouth
        my.sprite.mawSmile = this.add.sprite(this.bodyX+this.mouthOffset, this.bodyY, "monsterParts", "mouth_closed_teeth.png");
        my.sprite.mawFangs = this.add.sprite(this.bodyX+this.mouthOffset, this.bodyY, "monsterParts", "mouthD.png");
        my.sprite.mawFangs.visible = false;

        //Adding eyes
         my.sprite.eyeOne = this.add.sprite(this.bodyX+this.eyeOffset, this.bodyY-this.eyeOffset, "monsterParts", "eye_cute_light.png");
         my.sprite.eyeTwo = this.add.sprite(this.bodyX-this.eyeOffset, this.bodyY-this.eyeOffset, "monsterParts", "eye_cute_light.png");

         //Adding legs
        my.sprite.leftLeg = this.add.sprite(this.bodyX + this.legOffset, this.bodyY + this.legOffsetDown, "monsterParts", "leg_whiteB.png");
        my.sprite.rightLeg = this.add.sprite(this.bodyX - this.legOffset, this.bodyY + this.legOffsetDown, "monsterParts", "leg_whiteB.png");
        my.sprite.rightLeg.flipX = true; 

        //Adding head accessories
        //I know this is an eye sprite, it's for the aesthetic vision, trust
        my.sprite.headButton = this.add.sprite(this.bodyX, this.bodyY+this.buttonOffset, "monsterParts", "eye_blue.png");
        my.sprite.leftHorn = this.add.sprite(this.bodyX + this.hornOffset, this.bodyY + this.hornOffsetDown, "monsterParts", "detail_white_horn_small.png");
        my.sprite.rightHorn = this.add.sprite(this.bodyX - this.hornOffset, this.bodyY + this.hornOffsetDown, "monsterParts", "detail_white_horn_small.png");
        my.sprite.rightHorn.flipX = true;

        let fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        let sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


        //Event input: dimple smile, on d key press
        fKey.on('down', (key, event) => {
            my.sprite.mawSmile.visible = false;
            my.sprite.mawFangs.visible = true;
	    });

        //Event input: regular smile, on s key press
        sKey.on('down', (key, event) => {
            my.sprite.mawSmile.visible = true;
            my.sprite.mawFangs.visible = false;
	    });
        
        this.aKey = this.input.keyboard.addKey("A");
        this.dKey = this.input.keyboard.addKey("D");
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        if(this.aKey.isDown){
            for(const sprt in my.sprite){
                this.my.sprite[sprt].x += this.aDist
            }   
        }
        if(this.dKey.isDown){
            for(const sprt in my.sprite){
                this.my.sprite[sprt].x += this.dDist
            }   
        }
        
        }


    move(sprites, dist){
        for(let sprite of Object.vaules(sprites)){
            sprite.x = sprite.x + dist;
        }
    }

}