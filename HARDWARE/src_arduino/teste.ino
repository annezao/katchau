#include <Ethernet.h>
#include <ArduinoHttpClient.h>
#include <EEPROM.h>
#include <DS1307.h>

//NÃO COLOCAR PROGMEM NO SERVER
const char server[] = "katchau.back4app.io";
EthernetClient ethClient;
HttpClient client = HttpClient(ethClient, server, 80);
String serial;
unsigned long int last_t = 0;
const unsigned long int period = 60000; //10k millisecs -> 10secs
double accumulatedPott = 0.0;
DS1307 rtc (A4, A5);

void setup() {
  rtc.halt(false);
  
  Serial.begin(9600);
  while (!Serial) {
    ;
  }
  rtc.setSQWRate(SQW_RATE_1);
  rtc.enableSQW(true);
  
  IPAddress ip(192, 168, 0, 50);
  byte mac[] = {
    0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
  };
  IPAddress myDns(192, 168, 0, 1);
  Serial.println(F("Initialize Ethernet with DHCP:"));
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // Check for Ethernet hardware present
    if (Ethernet.hardwareStatus() == EthernetNoHardware) {
      Serial.println("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
      while (true) {
        delay(1); // do nothing, no point running without Ethernet hardware
      }
    }
    if (Ethernet.linkStatus() == LinkOFF) {
      Serial.println("Ethernet cable is not connected.");
    }
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(mac, ip, myDns);
  } else {
    Serial.print("  DHCP assigned IP ");
    Serial.println(Ethernet.localIP());
  }
  // give the Ethernet shield a second to initialize:
  serial = getSerial();
  Serial.print(F("Serial: "));
  Serial.println(serial);
  delay(1000);
}

void loop() {
  accumulatedPott = random(100000, 1000000) / 100.0;
  if (millis() - last_t > period) {
    Serial.println(F("[...] POST Pottency"));
    String sPott = String(accumulatedPott);
//    char temp[15];
//    char sPott[15];
//    dtostrf(accumulatedPott, 4, 2, temp);
//    sprintf(sPott, "%s", temp);
//    Serial.println(sPott);
//    sPott[11] = '\0';
    
    String t = rtc.getDateStr();
    String d = t.substring(0,2);
    String m = t.substring(3,5);
    String y = t.substring(6,10);
    String h = rtc.getTimeStr();
    char t_char[24];
    sprintf(t_char,"%s-%s-%sT%s.394Z",y.c_str(),m.c_str(),d.c_str(),h.c_str());
    char postData[200];
    sprintf(postData, "{ \"date\":{ \"__type\": \"Date\", \"iso\": \"%s\" }, \"value\":%s , \"source\":{ \"__type\": \"Pointer\", \"className\": \"Device\", \"objectId\": \"%s\" } }", t_char, sPott.c_str(),"GX2ZYgtFKO"); 
    Serial.println(postData);
    client.beginRequest();
    client.post("/classes/Voltage");
    client.sendHeader("Host", "parseapi.back4app.com");
    client.sendHeader("X-Parse-Application-Id", "PVBDcZz4pgQKtd4ENcNb4cfMEx4lnNybkR7zGkdf");
    client.sendHeader("X-Parse-REST-API-Key", "7xSZITKrB4Tt42912MxxhvFgjF3kkQ6cbvSCxSF1");
    client.sendHeader("Content-Type", "application/json");
    client.sendHeader("Content-Length", strlen(postData));
    client.beginBody();
    client.print(postData);
    client.endRequest();
    
    int statusCodeT = client.responseStatusCode();
    Serial.print(F("[!] Status code: "));
    Serial.println(statusCodeT);
  
    accumulatedPott = 0.0;
    last_t = millis();
  }
  delay(1000);
}

String getSerial() {
  Serial.println(F("[...] Searching for device's serial"));
  char c_serial[10];
  unsigned char k;
  k = EEPROM.read(0);
  int i = 0;
  while (k != '\0') {
    k = EEPROM.read(i);
    c_serial[i] = k;
    i++;
  }
//  c_serial[10] = '\0';
  return String(c_serial);
}

bool hasSerial() {
  unsigned char c;
  float f;
  c = EEPROM.read(0);
  EEPROM.get(0, f);
  bool has = c || f;
  return has;
}
