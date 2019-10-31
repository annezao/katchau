#include <Ethernet.h>
#include <EthernetUdp.h>
#include <SPI.h>
#include <ArduinoHttpClient.h>
#include <EmonLib.h>
#include <TimeLib.h>

#define sct1 A0
#define sct2 A1
#define sct3 A2
unsigned long lastConnectionTime = 0;           // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 60000;  // delay between updates, in milliseconds

EnergyMonitor emon1, emon2, emon3;

char server[] = "katchau-dev.back4app.io";
EthernetClient ethClient;
EthernetUDP Udp;
HttpClient client = HttpClient(ethClient, server, 80);
IPAddress timeServer(200,160,7,186); // time-a.timefreq.bldrdoc.gov

void setup(){
    Serial.begin(9600);
    while(!Serial){;}
    //CAL each phase by formula: Ratio/BurdenR. 2000/33 = 60,6
    IPAddress ip(192,168,0,50);
    byte mac[] = {
    0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
    };
    emon1.current(sct1, 60.6);
    emon2.current(sct2, 60.6);
    emon3.current(sct3, 60.6);
    //Pre-calibrage
    for (int i = 0; i < 20; i++)
    {
        emon1.calcIrms(1480) - 0.115;
        emon2.calcIrms(1480)- 0.115;
        emon3.calcIrms(1480)- 0.115;
    }
    Serial.println("Initialize Ethernet with DHCP:");
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
    Ethernet.begin(mac, ip);
    Serial.print("My IP address: ");
    Serial.println(Ethernet.localIP());
    } 
    else {
        Serial.print("  DHCP assigned IP ");
        Serial.println(Ethernet.localIP());
    }
    delay(1000);
    Udp.begin(8888);
    setSyncProvider(getNtpTime);
    // give the Ethernet shield a second to initialize:
    Serial.print("[...] Sending Request to ");
    Serial.println(server);
    
    String Content_Type = "application/json";
    String D_data = "{ }";
    client.beginRequest();
    client.get("/classes/Device/wo7C5vLJ76");
    client.sendHeader("Host", "katchau-dev.back4app.io");
    client.sendHeader("Content-Type", Content_Type);
    client.sendHeader("User-Agent", "arduino-ethernet");
    client.sendHeader("X-Parse-Application-Id","H5dcONjNMNy5WTpFt9tXAHdEAeanqT8mlq9HRSPu");
    client.sendHeader("X-Parse-REST-API-Key","V7c9YuMHLlGhAveQmQapxiviC6TkctOBC7aNcxxd");
    client.beginBody();
    client.print(D_data);
    client.endRequest();

    int statusCode = client.responseStatusCode();
    String D_responseBody= client.responseBody();
    // StaticJsonDocument<200> jsonDoc;
    // deserializeJson(jsonDoc, D_responseBody);
    // const char* D_ObjectId = jsonDoc["objectId"];
    if(statusCode == 201){
        Serial.print("[!] HTTP POST Request received by ");
        Serial.println(server);
        Serial.println(D_responseBody);
    }
    else if(statusCode == 200){
        Serial.print("[!] Found Object.");
        Serial.println(D_responseBody);
    }
}

time_t prevDisplay = 0; // when the digital clock was displayed
double accumulatedPott = 0.0;
void loop(){
    const double VOLT = 127.0;
    const double CAL = 0.115;
    double phase1, phase2, phase3;
    phase1 = emon1.calcIrms(1480) -  CAL;
    phase2 = emon2.calcIrms(1480) -  CAL;
    phase3 = emon3.calcIrms(1480) -  CAL;

    //Begin Sync Date&Time
    if (timeStatus() != timeNotSet) {
        if (now() != prevDisplay) { //update the display only if time has changed
        prevDisplay = now();
        digitalClockDisplay();  
        }
    }
    //End

    if(phase1 < 0.01)phase1 = 0.0;
    // Serial.print("Sensor 1 : ");
    // Serial.print(phase1); //Irms1

    if(phase2 < 0.01)phase2 = 0.0;
    // Serial.print(" |Sensor 2 : ");
    // Serial.print(phase2); //Irms2

    if(phase3 < 0.01)phase3 = 0.0;
    // Serial.print(" |Sensor 3 : ");
    // Serial.print(phase3); //Irms3

    double triphase = phase1 + phase2 + phase3;
    accumulatedPott =+ triphase * VOLT;
    // Serial.print(" |Corrente da trifase : ");
    // Serial.print(triphase, 4);
    // Serial.print("A | Potência: ");
    // Serial.print(power, 4);
    // Serial.print(" Watts\n");
    if (millis() - lastConnectionTime > postingInterval) {
      postPott(accumulatedPott);
    }
}

void postPott(double accumulatedPott){
    String T, h, m, s, yyyy, mm, dd;
    h = String(hour(), HEX);
    m = String(minute(), HEX);
    yyyy = String(year(), HEX);
    mm = String(month(), HEX);
    dd = String(day(), 3);
    T = String(yyyy+"-"+mm+"-"+dd+"T"+h+":"+m+":"+s+"Z");
    Serial.print(T);
    char Content_Type[] = "application/json";
    String dataPost = "{ \"date\":{ \"__type\": \"Date\", \"iso\":"+T+"},\"value\":"+accumulatedPott+",\"source\":{ \"__type\": \"Pointer\", \"className\": \"Device\", \"objectId\": \"wo7C5vLJ76\" } }";
    Serial.print(": [...] Power POST REQUEST => ");
    Serial.println(dataPost);
    client.stop();
    client = HttpClient(ethClient, server, 80);
    if(client.available()){
        client.beginRequest();
        client.post("/classes/Voltage/");
        client.sendHeader("Host", "katchau-dev.back4app.io");
        client.sendHeader("Content-Type", Content_Type);
        client.sendHeader("Content-Length", dataPost.length());
        client.sendHeader("User-Agent", "arduino-ethernet");
        client.sendHeader("X-Parse-Application-Id","H5dcONjNMNy5WTpFt9tXAHdEAeanqT8mlq9HRSPu");
        client.sendHeader("X-Parse-REST-API-Key","V7c9YuMHLlGhAveQmQapxiviC6TkctOBC7aNcxxd");
        client.beginBody();
        client.endRequest();
        lastConnectionTime = millis();
        accumulatedPott = 0.0;
        Serial.print(": [!] Power POST REQUEST SUCESSFULLY.");
    }
    else{
      Serial.println("[!] Connection Failed.");
    }
}

void digitalClockDisplay(){
  // digital clock display of the time
  Serial.print(hour());
  printDigits(minute());
  printDigits(second());
  Serial.print(" ");
  Serial.print(day());
  Serial.print(" ");
  Serial.print(month());
  Serial.print(" ");
  Serial.print(year()); 
  Serial.println(); 
}

void printDigits(int digits){
  // utility for digital clock display: prints preceding colon and leading 0
  Serial.print(":");
  if(digits < 10)
    Serial.print('0');
  Serial.print(digits);
}

/*-------- NTP code ----------*/

const int NTP_PACKET_SIZE = 48; // NTP time is in the first 48 bytes of message
byte packetBuffer[NTP_PACKET_SIZE]; //buffer to hold incoming & outgoing packets

time_t getNtpTime()
{
  while (Udp.parsePacket() > 0) ; // discard any previously received packets
  Serial.println("Transmit NTP Request");
  sendNTPpacket(timeServer);
  uint32_t beginWait = millis();
  while (millis() - beginWait < 1500) {
    int size = Udp.parsePacket();
    if (size >= NTP_PACKET_SIZE) {
      Serial.println("Receive NTP Response");
      Udp.read(packetBuffer, NTP_PACKET_SIZE);  // read packet into the buffer
      unsigned long secsSince1900;
      // convert four bytes starting at location 40 to a long integer
      secsSince1900 =  (unsigned long)packetBuffer[40] << 24;
      secsSince1900 |= (unsigned long)packetBuffer[41] << 16;
      secsSince1900 |= (unsigned long)packetBuffer[42] << 8;
      secsSince1900 |= (unsigned long)packetBuffer[43];
      return secsSince1900 - 2208988800UL + (-3) * SECS_PER_HOUR;
    }
  }
  Serial.println("No NTP Response :-(");
  return 0; // return 0 if unable to get the time
}

// send an NTP request to the time server at the given address
void sendNTPpacket(IPAddress &address)
{
  // set all bytes in the buffer to 0
  memset(packetBuffer, 0, NTP_PACKET_SIZE);
  // Initialize values needed to form NTP request
  // (see URL above for details on the packets)
  packetBuffer[0] = 0b11100011;   // LI, Version, Mode
  packetBuffer[1] = 0;     // Stratum, or type of clock
  packetBuffer[2] = 6;     // Polling Interval
  packetBuffer[3] = 0xEC;  // Peer Clock Precision
  // 8 bytes of zero for Root Delay & Root Dispersion
  packetBuffer[12]  = 49;
  packetBuffer[13]  = 0x4E;
  packetBuffer[14]  = 49;
  packetBuffer[15]  = 52;
  // all NTP fields have been given values, now
  // you can send a packet requesting a timestamp:                 
  Udp.beginPacket(address, 123); //NTP requests are to port 123
  Udp.write(packetBuffer, NTP_PACKET_SIZE);
  Udp.endPacket();
}
