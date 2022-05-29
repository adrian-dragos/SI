#include <math.h>
#include <string.h> 

#include "DHT.h"

#define DHTPIN 2     // Digital pin connected to the DHT sensor

#define DHTTYPE DHT11   // DHT 11
#include <SoftwareSerial.h>
int sensorValue;

DHT dht(DHTPIN, DHTTYPE);
SoftwareSerial Genotronex(10, 11); // RX, TX+

void run_dht_sensor()
{
  delay(2000);
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Genotronex.println(F("Failed to read from DHT sensor!"));
    return;
  }
  
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);
  
  // Genotronex.print(F(" Humidity: "));
  Genotronex.print(h);
  Genotronex.print(",");
  //Genotronex.print(F("%  Temperature: "));
  Genotronex.print(t);
  Genotronex.print(",");
  //Genotronex.print(F("C "));
  //Genotronex.print(hic);
  //Genotronex.print(F("C "));
}

void run_air_quality_sensor()
{
  sensorValue = analogRead(0);       // read analog input pin 0
  //Genotronex.print("AirQua=");
  Genotronex.println(sensorValue, DEC); 
  // prints the value read
  //Genotronex.print(" PPM");
  delay(100);                                   // wait 100ms for next reading
}


void setup() { // declare the ledPin as an OUTPUT: 
  dht.begin();
  Genotronex.begin(9600);
  Genotronex.println("Bluetooth On please press 1 or 0 blink LED ..");
} 

void loop() {
  run_dht_sensor();
  run_air_quality_sensor();
  delay(100);// prepare for next data ...
}
