//Save Plays
function saveScoreToFile(score) {
  const now = new Date();
  const dateString = now.toISOString().replace(/T/, ' ').replace(/\..+/, '');

  fs.appendFile('score.txt', `Date: ${dateString} - Total Score: ${score}\n`, function(err) {
      if (err) {
          return console.log(err);
      }
      console.log("The score was saved to score.txt!");
  });
}


var http = require('http')
var fs = require('fs')
var index = fs.readFileSync( 'index.html')
var starImage = fs.readFileSync('star.png')
var superMarioImage = fs.readFileSync('super-mario.png')
var booIconImage = fs.readFileSync('Boo-icon.png')
var mushroomImage = fs.readFileSync('mushroom.png')
var coinNoBgImage = fs.readFileSync('coin-no-bg.png') 
var happyMarioIcon = fs.readFileSync('happymario.ico')

var Image1 = fs.readFileSync('Image1.png')
var Image2 = fs.readFileSync('Image2.png')
var Image3 = fs.readFileSync('Image3.png')
var Image4 = fs.readFileSync('Image4.png')
var Image5 = fs.readFileSync('Image5.png')
var Image6 = fs.readFileSync('Image6.png')
var Image7 = fs.readFileSync('Image7.png')
var Image8 = fs.readFileSync('Image8.png')
var Image9 = fs.readFileSync('Image9.png')
var Image10 = fs.readFileSync('Image10.png')
var Image11 = fs.readFileSync('Image11.png')
var Image12 = fs.readFileSync('Image12.png')
var Image13 = fs.readFileSync('Image13.png')
var Image14 = fs.readFileSync('Image14.png')

var SerialPort = require('serialport')
const parsers = SerialPort.parsers

class Vehicle{
    constructor(veName, veValue, vePollution, vePrice){
        this.veName = veName
        this.veValue = veValue
        this.vePollution = vePollution
        this.vePrice = vePrice
    }
  }
  
class MarioCity{
  constructor(totalScore, happinessScore, pollutionScore, budget, highScore){
    this.totalScore = totalScore
    this.happinessScore = happinessScore
    this.pollutionScore = pollutionScore
    this.budget = budget
    this.listOfVehicles = []
    this.highScore = highScore
    this.resetScores()
    }
  
    resetScores(){
      this.totalScore = 0
      this.happinessScore = 0
      this.pollutionScore = 0
      this.budget = 0
      this.updateTotalScore()
    }
  
    //Changes total score based on hapiness, pollution, and budget
    updateTotalScore(){
      let toadPoints = (this.happinessScore < 60) ? 1000 * (this.happinessScore / 60) : 1000
      this.totalScore = Math.floor(toadPoints
      - (this.pollutionScore ** 1.1) - ((this.budget / 1000) ** 1.1))
      if (this.totalScore < 0){
        this.totalScore = 0
      }
    }


    getStackingPenalty(){
      //Note: Not implemented
      let count = [["Sports Car", 0],["Bullet Bus", 0],["Bicycle", 0],["Electric Car", 0],["Car", 0]]
      for (var i=0; i<this.listOfVehicles.length; i++){
        switch(this.listOfVehicles[i].veName){
          case("Sport"):
            count[0][1] +=1
            break
          case("Bus"):
            count[1][1] +=1
            break
          case("Bicycle"):
            count[2][1] +=1
            break
          case("Electric"):
            count[3][1] +=1
            break 
          case("Car"):
            count[4][1] +=1
            break
          default:
            break
          }
        }
        let stackingPenalty = 0
        for (var j=0; j<count.length; j++){
          stackingPenalty += count[j][1]
        }
        stackingPenalty = stackingPenalty ** 2
        return(stackingPenalty)
      }

    //Calculates a happiness change
    changeHappiness(addedVehicle){
      this.happinessScore += addedVehicle.veValue
    }
  
    changeBudget(removedVehicle){
      this.budget += removedVehicle.vePrice
    }
    
    changePollution(addedVehicle){
      this.pollutionScore += addedVehicle.vePollution
    }

    decreasePollution(removedVehicle){
      this.pollutionScore -= removedVehicle.vePollution
    }
    
    decreaseHappiness(removedVehicle){
      this.happinessScore -= removedVehicle.veValue
    }
  
    decreaseBudget(removedVehicle){
      this.budget -= removedVehicle.vePrice
    }

    updateHighScore(){
      (this.totalScore > this.highScore) ? (this.highScore = this.totalScore) : (this.highScore = this.highScore);
    }
  
    //Adds a vehicle to the vehicle list
    addVehicles(addedVehicle){
      //this.listOfvehicles.push(addedVehicle)
      this.changeBudget(addedVehicle)
      this.changePollution(addedVehicle)
      this.changeHappiness(addedVehicle)
      this.updateTotalScore()
    }
    removeVehicles(removedVehicle){
        this.decreaseHappiness(removedVehicle);
        this.decreasePollution(removedVehicle);
        this.decreaseBudget(removedVehicle);
        this.updateTotalScore();
    }
    
  }

const game = new MarioCity(0, 0, 0, 0, 0)
const parser = new parsers.Readline({
    delimiter: '\r\n'
})

var port = new SerialPort('COM5',{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

var app = http.createServer(function(req, res) {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
} else if (req.url === '/star.png') {
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(starImage);
} else if (req.url === '/super-mario.png') {
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(superMarioImage);
} else if (req.url === '/Boo-icon.png') {
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(booIconImage);
} else if (req.url === '/mushroom.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(mushroomImage);
} 
else if (req.url === '/coin-no-bg.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(coinNoBgImage);
}
else if (req.url === '/happymario.ico') {
  res.writeHead(200, {'Content-Type': 'image/ico'});
  res.end(happyMarioIcon);
}
else if (req.url === '/Image1.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image1);
}
else if (req.url === '/Image2.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image2);
}
else if (req.url === '/Image3.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image3);
}
else if (req.url === '/Image4.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image4);
}
else if (req.url === '/Image5.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image5);
}
else if (req.url === '/Image6.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image6);
}
else if (req.url === '/Image7.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image7);
}
else if (req.url === '/Image8.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image8);
}
else if (req.url === '/Image9.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image9);
}
else if (req.url === '/Image10.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image10);
}
else if (req.url === '/Image11.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image11);
}
else if (req.url === '/Image12.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image12);
}
else if (req.url === '/Image13.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image13);
}
else if (req.url === '/Image14.png') {
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(Image14);
}
else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>404 Not Found</h1>');
}
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
});

const vehicle1 = new Vehicle("Sports Car", 10, 40, 70000);
const vehicle2 = new Vehicle("Bullet Bus", 9, 15, 50000);
const vehicle3 = new Vehicle("Bicycle", 5, 1, 5000);
const vehicle4 = new Vehicle("Electric Car", 7, 8, 45000);
const vehicle5 = new Vehicle("Car", 6, 29, 25000);

parser.on('data', function(data) {

    console.log('Received data from port: ' + data);

    if(data.toLowerCase() === "nopicture"){
      io.emit("hideImages")
    }
    if(data.toLowerCase() === "show"){
      io.emit("showImages")
    }
    if(data.toLowerCase() === "picture1") {
      io.emit('showImage1');
    }
    if(data.toLowerCase() === "picture2") {
      io.emit('showImage2');
    }
    if(data.toLowerCase() === "picture3") {
      io.emit('showImage3');
    }
    if(data.toLowerCase() === "picture4") {
      io.emit('showImage4');
    }
    if(data.toLowerCase() === "picture5") {
      io.emit('showImage5');
    }
    if(data.toLowerCase() === "picture6") {
      io.emit('showImage6');
    }
    if(data.toLowerCase() === "picture7") {
      io.emit('showImage7');
    }
    if(data.toLowerCase() === "picture8") {
      io.emit('showImage8');
    }
    if(data.toLowerCase() === "picture9") {
      io.emit('showImage9');
    }
    if(data.toLowerCase() === "picture10") {
      io.emit('showImage10');
    }
    if(data.toLowerCase() === "picture11") {
      io.emit('showImage11');
    }
    if(data.toLowerCase() === "picture12") {
      io.emit('showImage12');
    }
    if(data.toLowerCase() === "picture13") {
      io.emit('showImage13');
    }
    if(data.toLowerCase() === "picture14") {
      io.emit('showImage14');
    }
    if(data.toLowerCase() === "endgame") {
      saveScoreToFile(game.totalScore);
  }
  
    if(data.toLowerCase() === "reset"){
      game.updateHighScore();
      game.resetScores()
      io.emit('reset');
      io.emit('updateScores', {
        totalScore: game.totalScore,
        happinessScore: game.happinessScore,
        pollutionScore: game.pollutionScore,
        budget: game.budget,
        highScore: game.highScore
    });

    }
    if(data.toLowerCase() === "sports") {
        game.addVehicles(vehicle1) 

        
        io.emit('updateScores', {
            totalScore: game.totalScore,
            happinessScore: game.happinessScore,
            pollutionScore: game.pollutionScore,
            budget: game.budget,
            highScore: game.highScore
        });
        io.emit('addVehicle', vehicle1.veName);
    }
    if(data.toLowerCase() === "bus") {
      game.addVehicles(vehicle2)

      
      io.emit('updateScores', {
          totalScore: game.totalScore,
          happinessScore: game.happinessScore,
          pollutionScore: game.pollutionScore,
          budget: game.budget,
          highScore: game.highScore
      });
      io.emit('addVehicle', vehicle2.veName);
  }
  if(data.toLowerCase() === "bicycle") {
    game.addVehicles(vehicle3) 

    
    io.emit('updateScores', {
        totalScore: game.totalScore,
        happinessScore: game.happinessScore,
        pollutionScore: game.pollutionScore,
        budget: game.budget,
        highScore: game.highScore
    });
    io.emit('addVehicle', vehicle3.veName);

}
if(data.toLowerCase() === "electric") {
  game.addVehicles(vehicle4)

  
  io.emit('updateScores', {
      totalScore: game.totalScore,
      happinessScore: game.happinessScore,
      pollutionScore: game.pollutionScore,
      budget: game.budget,
      highScore: game.highScore
  });
  io.emit('addVehicle', vehicle4.veName);
}
if(data.toLowerCase() === "car") {
  game.addVehicles(vehicle5)

  io.emit('updateScores', {
      totalScore: game.totalScore,
      happinessScore: game.happinessScore,
      pollutionScore: game.pollutionScore,
      budget: game.budget,
      highScore: game.highScore
  });
  io.emit('addVehicle', vehicle5.veName);
}
if(data.toLowerCase() === "removesp") {
  game.removeVehicles(vehicle1)

  io.emit('updateScores', {
      totalScore: game.totalScore,
      happinessScore: game.happinessScore,
      pollutionScore: game.pollutionScore,
      budget: game.budget,
      highScore: game.highScore
  });
  io.emit('removeVehicle', vehicle1.veName);

}
if(data.toLowerCase() === "removebs") {
  game.removeVehicles(vehicle2)

  io.emit('updateScores', {
      totalScore: game.totalScore,
      happinessScore: game.happinessScore,
      pollutionScore: game.pollutionScore,
      budget: game.budget,
      highScore: game.highScore
  });
  io.emit('removeVehicle', vehicle2.veName);
}
if(data.toLowerCase() === "removebk") {
  game.removeVehicles(vehicle3)
  io.emit('updateScores', {
      totalScore: game.totalScore,
      happinessScore: game.happinessScore,
      pollutionScore: game.pollutionScore,
      budget: game.budget,
      highScore: game.highScore
  })
  io.emit('removeVehicle', vehicle3.veName);
}

if(data.toLowerCase() === "removeec") {
  game.removeVehicles(vehicle4)
  io.emit('updateScores', {
      totalScore: game.totalScore,
      happinessScore: game.happinessScore,
      pollutionScore: game.pollutionScore,
      budget: game.budget,
      highScore: game.highScore
  })
  io.emit('removeVehicle', vehicle4.veName);
}

if(data.toLowerCase() === "removecr") {
  game.removeVehicles(vehicle5)
  io.emit('updateScores', {
      totalScore: game.totalScore,
      happinessScore: game.happinessScore,
      pollutionScore: game.pollutionScore,
      budget: game.budget,
      highScore: game.highScore
  })
  io.emit('removeVehicle', vehicle5.veName);
}

});

app.listen(3000);
