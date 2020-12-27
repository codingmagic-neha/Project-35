var dog,happyDog;
var database;
var foodS,foodStock;
var dogImage;
var happyDogImage;

var fedTime, lastFed;
var feed, addFood;
var foodObj;

function preload()
{
dogImage=loadImage("images/dogImg1.png");
happyDogImage=loadImage("images/dogImg.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1000, 400);

  foodObj = new Food();

  dog = createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the Dog");
  feed.position(700,50);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.postion(800,95);
  addFood.mousePressed(addFoods);  
}


function draw() {  
  background(46.139,87);

  foodObj.display();

  fedTime = database.ref('Feed Time');

  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill(255,255,254 );
  textSize(15);

  if(lastFed <= 12){
    text("Last Feed : "+lastFed % 12 + "PM" , 350,30);
  }
  else if(lastFed == 0){
   text("Last Feed : 12 AM", 350, 30);
  }
  else{
    text("Last Feed : " + lastFed + "AM", 350,30);
  }

  drawSprites();
}

  function readStock(data){

    foodS = data.val();

    foodObj.updateFoodStock(foodS);
  }

  function feedDog(){
    dog.addImage(happyDogImage);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);

    database.ref('/').update({

        Food: foodObj.getFoodStock(),

        FeedTime: hour()
    })
  }
  
  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food : foodS
    })
  }