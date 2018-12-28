
    var temperature;
    var temperatureText = document.getElementById('temperature-output');
    var $pTempValue = $('.temperatureValue p');
    var socket = io();
    
    socket.on('dataTemperature', function (d) 
    {
        temperature = d.temperature;
        $pTempValue.text( temperature + ' °C');
    });         

    FusionCharts.ready(function(){
    var fusioncharts = new FusionCharts({
    type: 'thermometer',
    renderAt: 'chart-container',
    width: '240',
    height: '510',
    dataFormat: 'json',
    dataSource: 
    {
        "chart": {
            "caption": "Capteur de température",
            "lowerLimit": "-10",
            "upperLimit": "30",

            "decimals": "1",
            "numberSuffix": "°C",
            "showhovereffect": "1",
            "thmFillColor": "#008ee4",
            "showGaugeBorder": "1",
            "gaugeBorderColor": "#008ee4",
            "gaugeBorderThickness": "2",
            "gaugeBorderAlpha": "30",
            "thmOriginX": "100",
            "chartBottomMargin": "20",
            "valueFontColor": "#000000",
            "theme": "fusion",

              "adjustTM": "1",
        "ticksOnRight": "0",
        "tickMarkDistance": "5",
        "tickValueDistance": "2",
        "majorTMNumber": "9",
        "majorTMHeight": "12",
        "minorTMNumber": "4",
        "minorTMHeight": "7",
        "tickValueStep": "2"

        },
        "value": "0"
        //All annotations are grouped under this element
       
    }
    
    ,
    
    "events": {
        
        "rendered": function(evt, arg) 
        {
            updateAnnotation = function(evtObj, argObj) {
                evtObj.sender.setData(temperature);

                var code,
                    chartObj = evtObj.sender,
                    val = chartObj.getData(),
                    annotations = chartObj.annotations;

                if (val >= -4.5) {
                    code = "#00FF00";
                } else if (val < -4.5 && val > -6) {
                    code = "#ff9900";
                } else {
                    code = "#ff0000";
                }
               
            };
        }
        ,
        'renderComplete': function(evt, arg) {
            updateAnnotation(evt, arg);
        },
        'realtimeUpdateComplete': function(evt, arg) {
            updateAnnotation(evt, arg);
        },
        'disposed': function(evt, arg) {
            clearInterval(evt.sender.dataUpdate);
        }
    }
    
}
);

    fusioncharts.render();
    });