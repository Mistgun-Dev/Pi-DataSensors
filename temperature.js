const Gpio = require('pigpio').Gpio;

const data = new Gpio(4, {mode: Gpio.INPUT});

exports.getTemperature = function(callback)
{
  var temperature = data.digitalRead();
  //console.log(temperature);
  return callback(temperature);
}
