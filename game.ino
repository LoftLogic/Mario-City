const int buttonPin = 10;
const int analogPins[] = {A0, A1, A2, A3, A4};
enum vehicles {NONE, SPORTS, BUS, BICYCLE, ELECTRIC, CAR};

int placed[5] = {NONE, NONE, NONE, NONE, NONE};
bool startGame = false;

//NO PIN = 1023
//Sports Car = 514
//Bus = 19
//Bicycle = 35
//Electric = 48
//Car = 341

//SETUP INTEGERS AND CLEAR IMAGES
void setup(){
    Serial.begin(9600);
    for (int i=0; i<5; i++){
        pinMode(analogPins[i], INPUT);
    }
    pinMode(buttonPin, INPUT_PULLUP);   
    Serial.println("Reset");
    Serial.println("No Picture");
}

//Opening Slideshow
//Should only run when the button is pressed first
void openPresentation(){
    for (int i=1; i<15; i++){
        Serial.print("Picture");
        Serial.println(i);
        delay(3000);
    }
    Serial.println("NoPicture");
    Serial.println("EndSlideshow");
}

//RUNS WHEN THE GAME IS RUNNING AND THE BUTTON IS PRESSED
void resetGame(){
    Serial.println("Endgame");
    Serial.println("Reset");
    startGame = false;
    for (int i = 0; i < 5; i ++){
        placed[i] = NONE;
    }
    delay(500);
}

//Checks the voltage and displays vehicle
void checkVoltage(int pinIndex){
    float voltage = analogRead(analogPins[pinIndex]);
    //Edge case for the messed up analog four pin
    int thisVehicle = (pinIndex == 4) ? findVehicleAFour(voltage, pinIndex) : findVehicle(voltage, pinIndex);
    //IF A PIN VEHICLE IS CHANGED OR REMOVED
    //CHANGES SHOULD ONLY BE MADE IF A NEW VEHICLE IS DETECTED
    if (thisVehicle != placed[pinIndex]){
        Serial.print("Voltage: ");
        Serial.println(voltage);
        //REMOVE THE PREVIOUS VEHICLE
        printVehicleType(placed[pinIndex], false);
        //PLACE THE NEW VEHICLE
        printVehicleType(thisVehicle, true);
        //HOLD THE NEW VEHICLE IN THE ARRAY
        placed[pinIndex] = thisVehicle;
        Serial.println(analogPins[pinIndex]);
    }
}

//Converts the voltage values to the vehicle type for A0, A1, A2, and A3
int findVehicle(int voltage, int pinIndex){
    if (voltage > 500 && voltage < 530){
        
        return SPORTS;
    }
    else if (voltage > 0 && voltage < 29){
        
        return BUS;
    }
    else if (voltage > 30 && voltage < 44){
        
        return BICYCLE;
    }
    else if (voltage > 44 && voltage < 70){
        
        return ELECTRIC;
    }
    else if (voltage > 300 && voltage < 380){
        
        return CAR;
    }
    // > 1000 means no vehicle
    else if (voltage > 1020){
        return NONE;
    }
    
    else{
        return placed[pinIndex];
    }
}

//Special voltage to vehicle for A4 because its broken
int findVehicleAFour(int voltage, int pinIndex){
    if (voltage > 852 && voltage < 890){
        return SPORTS;
    }
    else if (voltage > 90 && voltage < 160){
        return BUS;
    }
    else if (voltage > 200 && voltage < 274){   
        return BICYCLE;
    }
    else if (voltage > 275 && voltage < 286){
        return ELECTRIC;
    }
    else if (voltage > 700 && voltage < 800){
        return CAR;
    }
    // > 1000 means no vehicle
    else if (voltage > 1020){
        return NONE;
    }
    else{
        placed[pinIndex];
    }
}

//Function to print the enumerations because C++ is garbage and won't let me do it normally
void printVehicleType(int type, bool placing) {
    //PLACING = TRUE IF PLACED
    //PLACING = FALSE IF REMOVED
    //IF TYPE IS NONE: DO NOTHING
    if (placing){
        switch (type) {
        case SPORTS: Serial.println("Sports"); break;
        case BUS: Serial.println("Bus"); break;
        case BICYCLE: Serial.println("Bicycle"); break;
        case ELECTRIC: Serial.println("Electric"); break;
        case CAR: Serial.println("Car"); break;
        case NONE: Serial.println("Place No Vehicle"); break;
        } 
    }
    else{
        switch (type) {
        case SPORTS: Serial.println("RemoveSP"); break;
        case BUS: Serial.println("RemoveBS"); break;
        case BICYCLE: Serial.println("RemoveBK"); break;
        case ELECTRIC: Serial.println("RemoveEC"); break;
        case CAR: Serial.println("RemoveCR"); break;
        case NONE: Serial.println("Remove No Vehicle"); break;
        }
    }
}

void loop(){
    //Until Button is clicked for the first time
    if (!startGame && digitalRead(buttonPin) == LOW){
        openPresentation();
        startGame = true;
    }

    //When Game is active
    if (startGame){
        for (int i=0; i < 5; i++){
            checkVoltage(i);
        }
        if (digitalRead(buttonPin) == LOW){
            resetGame();
        }
    }
}
