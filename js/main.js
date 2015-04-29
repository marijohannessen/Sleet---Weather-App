$(document).ready(function(){

/** Hiding the headline **/
$('#headline').hide();
    
/** Clears the input when clicked **/
$('#tags').click(function() {
    $(this).val('');
});
    
/** Function when 'Find weather' is clicked **/
$('#submitWeather').on('click', function() {

    $('#headline').hide();
    $('#description').empty();
    $('#temp').empty();
    $('#results').empty();
    $('#results').show();
    
    /** Get city suggestions **/
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        var weatherForecast = JSON.parse(xhr.responseText);
        if (!(weatherForecast.cod === '404')) {
        console.log(weatherForecast);
            if (weatherForecast.count > 0) {
                console.log("count is more than 1");
                var availableTags = [];
                console.log(availableTags);
                for (var i = 0; i < weatherForecast.count; i+=1) {
                    availableTags[i] = '<input type="button" id="cityResult' + i + '" value="' + weatherForecast.list[i].name + ', ' + weatherForecast.list[i].sys.country + '">';
                }
                $('#results').append('<h3>Found ' + weatherForecast.count + ' results');
                $( "#results" ).append(availableTags.join([seperator = '<br>']));
            }
     else {
        sweetAlert("Oops...", "City not found!", "error");
    }
    }
    }
    }
    var city = $("#tags").val();
    var url = 'http://api.openweathermap.org/data/2.5/find?q='+city+'&type=like&APPID=eaff43633ef92225829c3e5bab562e02';
    console.log(url);
    xhr.open('GET', url);
    xhr.send();
 });
console.log('done');    
    

$('#results').on('click', 'input', function() {
        console.log("came here");
        var xhs = new XMLHttpRequest();
        xhs.onreadystatechange = function() {
        if (xhs.readyState === 4) {
            var cityForecast = JSON.parse(xhs.responseText);
            if (!(cityForecast.cod === '404')) {
            var weatherDescription = cityForecast.weather[0].description.charAt(0).toUpperCase() + cityForecast.weather[0].description.substring(1);
            var weatherTemp = Math.floor((cityForecast.main.temp - 273.15) * 10) / 10 + '&#8451';
            var weatherIcon = cityForecast.weather[0].icon;
            console.log(weatherIcon);
            var iconPic = '<i class="fa fa-';
            var iconEnd;
            if (weatherIcon === '01d' || weatherIcon === '01n') {
                iconEnd = 'sun-o fa-3x"></i>';
                iconPic += iconEnd;
                console.log('got here');
            }
            else if (weatherIcon === '02d' || weatherIcon === '02n'  || weatherIcon === '03d' || weatherIcon === '03n' || weatherIcon === '04d' || weatherIcon === '04n') {
                iconEnd = 'cloud fa-3x"></i>';
                iconPic += iconEnd;
            }
            
            else if(weatherIcon === '09d' || weatherIcon === '09n'  || weatherIcon === '10d' || weatherIcon === '10n') {
                iconEnd = 'tint fa-3x"></i>';
                iconPic += iconEnd;
            }
            
            else if (weatherIcon === '11d' || weatherIcon === '11n') {
                iconEnd = 'bolt fa-3x"></i>';
                iconPic += iconEnd;
            }
            
            else if(weatherIcon === '13d' || weatherIcon === '13n') {
                iconEnd = 'asterisk fa-3x"></i>';
                iconPic += iconEnd;
            }
             
             $('#addLocation').html(city2);
            $('#headline').show();
            $('#results').hide();
            $('#description').append(iconPic+'<br>'+weatherDescription + '<br>');
            $('#temp').append('<p>'+weatherTemp+'</p>');
  }
        
        else {
        sweetAlert("Oops...", "Something went wrong!", "error");
        }
}
                    
                }
    var city2 = $(this).val();
    var url2 = 'http://api.openweathermap.org/data/2.5/weather?q='+city2+'&APPID=eaff43633ef92225829c3e5bab562e02';
    console.log(url2);
    xhs.open('GET', url2);
    xhs.send();
    });

});
