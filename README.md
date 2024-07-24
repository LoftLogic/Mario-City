# Mario-City
Engineering Project for a child education sustainablity exhibit, programmed by Evan Li.
Focuses on utilizing programming and electronics to create an immersive and educational gameplay experience.

Uses HTML, JavaScript, and C++.
Requries a Red Board and game pieces with resistors as well as Arduino IDE

How It Works:
The redboard is connected to several analog pins and a button, which is hooked up to a computer.
Game pieces are made, each with a different level of resistance to allow Arduino to differientiate between pieces
A JavaScript file utilizes the "SerialPort" library to listen to the Arduino Board
The JavaScript file uses io.emit to communicate events to the HTML

The game starts when a button is pressed, which plays an introduction slideshow on the HTML
During the game, the user can place the pieces on analog pins, which will then change their in game score
Press the button again to end the game and save your score
