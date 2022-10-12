#include <Servo.h>

int servo = 9;
int flag = 1; // 블라인드의 상태
char mode = 'b'; // 모드 설정
char ch;

int pos = 0;

const int max_ = 180;
const int min_ =   0;
const int stp_ =   3;

Servo blind;

void setup() {
  Serial.begin(9600);
  blind.attach(servo);
  blind.write(0);
}

void loop() {
  if(Serial.available() > 0){
    char tmp = Serial.read();
    if      (tmp == 'a' || tmp == 'A') mode = 'a';
    else if (tmp == 'b' || tmp == 'B') mode = 'b';
    else ch = tmp;
    
    Serial.print("mode");
    Serial.println(mode);
  }
  
  if           (mode == 'a')  autoControl();
  
  else if      (mode == 'b'){
    if      (ch == '.') {
      if(pos + stp_ <= max_)pos = pos + stp_;
    }
    else if (ch == ',') {
      if(pos - stp_ >= min_)pos = pos - stp_;
    }
    else if(ch == '0') pos = 0;
    else if(ch == '1') pos = 30;
    else if(ch == '2') pos = 60;
    else if(ch == '3') pos = 90;
    else if(ch == '4') pos = 120;
    else if(ch == '5') pos = 150;
    else if(ch == '6') pos = 180;
    
    ch = 0;
    blind.write(pos);
    Serial.print("servo");
    Serial.println(pos); 
  
    delay(100);
  }
}


void autoControl(){
  int cdsVal = analogRead(A0);
  Serial.print("cds");
  Serial.println(cdsVal);
  
  //빛이 밝아지면
  if (cdsVal < 400) {
    if (flag == 0) {      //현재 블라인드가 올라가있으면     
      blind.write(180);   //블라인드를 내림
      flag = 1;           //블라인드가 내려가 있는 상태로 설정
      pos = 180;
      Serial.print("flag");
      Serial.println(flag);
    }
  }

  //빛이 어두워지면
  else {
    if (flag == 1) {      //블라인드가 내려가 있으면
      blind.write(0);     //블라인드를 올림
      flag = 0;           //블라인드가 올라가 있는 상태로 설정
      pos = 0;
      Serial.print("flag");
      Serial.println(flag);
    }
  }

  delay(100);
}
