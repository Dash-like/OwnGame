class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car1.scale = 1.2;
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car2.scale = 1.5;
    for(var i =0; i <20; i++){
      otherBulletArr[i] = createSprite(0, 0);
      otherBulletArr[i].addImage(bullet_img);
      otherBulletArr[i].visible.false;
     otherBulletArr[i].scale = 0.3;
     otherBulletArr[i].depth = 0;
    }
    
    ele1 = createElement("h2");
        
    ele2 = createElement("h2");
       
    ele3 = createElement("h2");

    ele4 = createElement("h2");
        
    ele5 = createElement("h2");
       
    ele6 = createElement("h2");

    ele7 = createElement("h2");

    ele8 = createElement("h2")
    elements =[[ele1, ele2, ele3, ele7], [ele4, ele5, ele6, ele8]]
    cars = [car1, car2];
  }

  play(){
    form.hide();
    background(rgb(198,135,103));
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      var dispX = 100;
      //var display_position = 100;
       
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        
        
        if(index === 1){
          dispX = 100
          var color = "white";
        }else{
          dispX = width -200;
          var color = "red";
        }
        elements[index-1][0].position(dispX ,100)
        elements[index-1][1].position(dispX, 150)
        elements[index-1][2].position(dispX, 200)
        elements[index-1][3].position(dispX, 250)

        elements[index-1][0].html("Name: "+allPlayers[plr].name);
        elements[index-1][1].html("Health: "+allPlayers[plr].health); 
        elements[index-1][2].html("Score: "+allPlayers[plr].score); 
        elements[index-1][3].html("Bullets: "+allPlayers[plr].bullets);
       
        elements[index-1][0].style("color", color);
        elements[index-1][1].style("color", color);
        elements[index-1][2].style("color", color);
        elements[index-1][3].style("color", color);

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = allPlayers[plr].y;
        x = allPlayers[plr].x;

        cars[index-1].x = x;
        cars[index-1].y = y;

       // console.log(index, player.index)
       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          player.health = allPlayers[plr].health;
        }else{
          if(allPlayers[plr].bulletsArr){

          
       for(var i = 0;i< allPlayers[plr].bulletsArr.length; i++){
         otherBulletArr[i].x = allPlayers[plr].bulletsArr[i][0];
         otherBulletArr[i].y = allPlayers[plr].bulletsArr[i][1];
         otherBulletArr[i].rotation = allPlayers[plr].bulletsArr[i][2];
         otherBulletArr[i].visible = true;
       }
      }
        for(var i = 0; i < player.bulletsArr.length; i ++){
          if(player.bulletsArr[i].isTouching(cars[index-1])){
            var health = allPlayers[plr].health-5;
            player.bulletsArr[i].destroy();
            player.bulletsArr.splice(i, 1);
            player.updateEnemyHealth(index, max(0, health));
            player.score = player.score + 2;
            if(health <= 0){
              player.updateLosingPlayer(index);
            }
            player.update(); 
          } 
        
        }
      }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    this.spawnObstacles();
   //87 = W
   //65 = A
   //83 = S
   //68 = D
      if(keyIsDown(87)){
        player.makeBullets(0, -5, 90);
        player.update();
      }
      if(keyIsDown(65)){
        player.makeBullets(-5, 0, 0);
        player.update();
      }
      if(keyIsDown(83)){
        player.makeBullets(0, 5, 270);
        player.update();
      }
      if(keyIsDown(68)){
        player.makeBullets(5, 0, 180);
        player.update();
      }
      if(keyIsDown(19) && player.index !== null){
       player.velocityY = -100
       player.update();
      }
    
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.y -=10
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.y +=10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.x +=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.x -=10
      player.update();
    }
    if (keyIsDown(32)) {
      cars[index-1].velocityY = -12;
      }

    if(player.distance > 3860|| player.health <=0 ){
      gameState = 2;
      player.rank = carsAtEnd+1;
Player.updateCarsAtEnd(player.rank);
      player.update();
      game.update(2);
    }
   
    drawSprites();
  }
  spawnObstacles() {
    if (frameCount %2 === 0) {
      var obstacle = createSprite(width+10, height-45, 10, 40);
      obstacle.velocityX = -(6 + score / 100);
  
      //generate random obstacles
      var rand = Math.round(random(1, 2));
      switch (rand) {
        case 1:
          obstacle.addImage(obstacle1_img);
          break;
        case 2:
          obstacle.addImage(obstacle2_img);
          break;
        default:
          break;
      }
  
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
  
      //add each obstacle to the group
      obstaclesGroup.push(obstacle);
    }
  }
  end(){
    console.log("Game Ended");
    player.getLosingPlayer();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      
      endElement = createElement("h2");
      endElement.html("Game Over");
      endElement.style("color", "white");
      endElement.position(width/2-100, player.y=200);
      endElement.style('font-size', '45px');
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        if(allPlayers[plr].rank!= 0){
          var ele = createElement("h3");
          //var display_position = 100;
          ele.position(displayWidth/2, allPlayers[plr].rank*30);
          ele.html(allPlayers[plr].name+": "+ allPlayers[plr].rank)
         
        
        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y =allPlayers[plr].y;
        x =allPlayers[plr].x;

        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          ele.style("color", "yellow")
          cars[player.index-1].addImage(crash_img);
        }else{
          ele.style("color", "black")
        }
      }
      if(losingPlayer === player.index){
        image(lose_img, width/2-100,player.y-300,200, 400);
        
      } else{
        image(win_img, width/2-100,player.y-300,200, 400)
      }
      //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    drawSprites();
  }
}
