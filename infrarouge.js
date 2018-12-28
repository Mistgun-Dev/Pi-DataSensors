const Gpio = require('pigpio').Gpio;

// Définition des Pin de la raspberry sur lesquels sont branchés les pin de l'infrarouge
const PIN_PSH   = new Gpio(14, {mode: Gpio.INPUT,  pullUpDown: Gpio.PUD_DOWN, edge: Gpio.EITHER_EDGE});
const PIN_DATA0 = new Gpio(21, {mode: Gpio.INPUT});
const PIN_DATA1 = new Gpio(20, {mode: Gpio.INPUT});
const PIN_DATA2 = new Gpio(16, {mode: Gpio.INPUT});
const PIN_DATA3 = new Gpio(7, {mode: Gpio.INPUT});
const PIN_DATA4 = new Gpio(8, {mode: Gpio.INPUT});
const PIN_DATA5 = new Gpio(25, {mode: Gpio.INPUT});
const PIN_DATA6 = new Gpio(24, {mode: Gpio.INPUT});
const PIN_DATA7 = new Gpio(23, {mode: Gpio.INPUT});

var code = 0;

exports.getCodeInfraRed = function(callback)
{
   PIN_PSH.on('interrupt', (level) =>
   {
     if(level == 1)
     {
     console.log("Le bouton a été préssé\n");
     code =  PIN_DATA0.digitalRead()
         | PIN_DATA1.digitalRead() <<  1
         | PIN_DATA2.digitalRead() <<  2
         | PIN_DATA3.digitalRead() <<  3
         | PIN_DATA4.digitalRead() <<  4
         | PIN_DATA5.digitalRead() <<  5
         | PIN_DATA6.digitalRead() <<  6
         | PIN_DATA7.digitalRead() <<  7;
     console.log("code = " + code); 
     var codeSignif = -1;

     if(code == 84) codeSignif = "OK";
     else if(code == 16) codeSignif = "UP";
     else if(code == 18) codeSignif = "RIGHT";
     else if(code == 17) codeSignif = "DOWN";
     else if(code == 19) codeSignif = "LEFT";

     return callback(codeSignif);
     }
   });
}
