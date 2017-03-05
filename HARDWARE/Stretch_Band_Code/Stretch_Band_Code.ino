// the value of the 'other' resistor
#define SERIESRESISTOR 10000    
 
// What pin to connect the sensor to
#define THERMISTORPIN A1
 
void setup(void) {
  Serial.begin(9600);
  pinMode(13,OUTPUT);
  pinMode(12,OUTPUT);
  digitalWrite(13,HIGH);
  digitalWrite(12,LOW);
}
 
void loop(void) {
  float reading;
 
  reading = analogRead(THERMISTORPIN);
  // convert the value to resistance
  reading = (1023 / reading)  - 1;
  reading = SERIESRESISTOR / reading;
  Serial.println(reading);
  
 
  delay(20);
}
