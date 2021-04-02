class Player {
  constructor(){
    this.index = null;
    this.y = 0;
    this.x = 0;
    this.bullets = 100;
    this.name = null;
    this.score = 0;
    this.bulletsArr = [];
    this.health = 200;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var dbBullet = [];
    var dbBulletF = [];
    for(var i = 0; i < this.bulletsArr.length; i++){
     dbBullet[0] = this.bulletsArr[i].x;
     dbBullet[1] = this.bulletsArr[i].y;
     dbBullet[2] = this.bulletsArr[i].rotation;
     dbBulletF[i] = dbBullet;
    }
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      y:this.y,
      x:this.x,
     health:this.health,
      score: this.score,
      bullets: this.bullets,
      bulletsArr: dbBulletF,
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
   getCarsAtEnd(){
     var cr = database.ref('carsAtEnd');
     cr.on("value",(data)=>{
       carsAtEnd = data.val();
     })
   }
   static updateCarsAtEnd(rank){
     database.ref("/").update({
       carsAtEnd: rank
     });
   }
   makeBullets(x, y, r){
     if(frameCount%8 === 0 && this.bullets>0 && this.bulletsArr.length<=20){
      var bullet = createSprite(0, 0, 5, 5);
      bullet.addImage("bullet",bullet_img);
      bullet.depth  = 0;
      bullet.rotation = r
      bullet.scale = 0.3;
      bullet.x = this.x;
      bullet.y = this.y;
      bullet.lifetime = displayWidth;
      bullet.velocityY = y;
      bullet.velocityX = x;
      bullet.shapeColor = "white";
      this.bulletsArr.push(bullet);
      this.bullets--;
     }
   }
  
   updateEnemyHealth(index, health){
var playerIndex = "players/player"+ index;
database.ref(playerIndex).update({
  health:health
})



   }
  getLosingPlayer(){
    var cr = database.ref('losingPlayer');
    cr.on("value",(data)=>{
      losingPlayer = data.val();
    })
  }
  updateLosingPlayer(index){
    database.ref("/").update({
      losingPlayer: index
    });
  }
   
}
