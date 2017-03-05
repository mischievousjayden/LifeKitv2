// I2C device class (I2Cdev) demonstration Arduino sketch for MPU6050 class
// 10/7/2011 by Jeff Rowberg <jeff@rowberg.net>
// Updates should (hopefully) always be available at https://github.com/jrowberg/i2cdevlib
//
// Changelog:
//      2013-05-08 - added multiple output formats
//                 - added seamless Fastwire support
//      2011-10-07 - initial release

/* ============================================
I2Cdev device library code is placed under the MIT license
Copyright (c) 2011 Jeff Rowberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
===============================================
*/

// I2Cdev and MPU6050 must be installed as libraries, or else the .cpp/.h files
// for both classes must be in the include path of your project
#include "I2Cdev.h"
#include "MPU6050.h"
#include "Filter.h"

// Arduino Wire library is required if I2Cdev I2CDEV_ARDUINO_WIRE implementation
// is used in I2Cdev.h
#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
    #include "Wire.h"
#endif

MPU6050 accelgyro;


int16_t ax, ay, az;
int16_t gx, gy, gz;

int16_t nx, ny, nz;
int16_t ngx, ngy, ngz;

#define OUTPUT_READABLE_ACCELGYRO

//Stretch Band Settings
#define THERMISTORPIN A1
#define SERIESRESISTOR 10000  

//Accelerometer Settings
#define xReadjust 734
#define yReadjust 3855
#define zReadjust -800

ExponentialFilter<float> filteredRespir(20, 0);

ExponentialFilter<float> filteredX(20, 0);
ExponentialFilter<float> filteredY(20, 0);
ExponentialFilter<float> filteredZ(20, 0);

void setup() {
    // join I2C bus (I2Cdev library doesn't do this automatically)
    #if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
        Wire.begin();
    #elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
        Fastwire::setup(400, true);
    #endif

    // initialize serial communication
    // (38400 chosen because it works as well at 8MHz as it does at 16MHz, but
    // it's really up to you depending on your project)
    Serial.begin(9600);
    pinMode(13,OUTPUT);
    digitalWrite(13,HIGH);
    pinMode(12,OUTPUT);
    digitalWrite(12,LOW);
    // initialize device
    //Serial.println("Initializing I2C devices...");
    accelgyro.initialize();
}

void loop() {
    readAccel();
    readStetch();
    printAllValues();
    delay(50);
}

void readAccel(){
  // read raw accel/gyro measurements from device
    accelgyro.getMotion6(&nx, &ny, &nz, &ngx, &ngy, &ngz);
    //Reassign them in accordance to device accelerometer orientation.
    ax = -nx;
    ay = nz;
    az = -ny;
    //Readjust
    ax = ax + xReadjust;
    ay = ay + yReadjust;
    az = az + zReadjust;

    filteredX.Filter(ax);
    filteredY.Filter(ay);
    filteredZ.Filter(az);
}

#define NUM_CUR_READING 3
int slopeStatus = 0;
float pastReading = 0;


void readStetch(){
  //Stretch Band
    float reading;
 
    reading = analogRead(THERMISTORPIN);
    // convert the value to resistance
    reading = (1023 / reading)  - 1;
    reading = SERIESRESISTOR / reading;
    //Serial.println('Resistance');
    filteredRespir.Filter(reading);

    if(pastReading - reading <0){
      slopeStatus = -1;
    }else if(pastReading - reading > 0){
      slopeStatus = 1;
    }else{
      slopeStatus = 0;
    }
    
    pastReading = reading;
    
}

void printAllValues(){
        Serial.print(filteredX.Current()); Serial.print(",");
        Serial.print(filteredY.Current()); Serial.print(",");
        Serial.print(filteredZ.Current()); Serial.print(",");
        Serial.println(filteredRespir.Current());

}

