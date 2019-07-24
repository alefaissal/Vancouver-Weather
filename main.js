(function () {
    //Global Variables
    let temp;
    let tempMax;
    let tempMin;
    let windSpeed;
    let icon;
    let iconSrc;
    let description;
    let pressure;
    let humidity;
    let option;

    //function to convert Kelvin to celsius
    function convertKelvinToCelsius(kelvin) {
        if (kelvin <= 0) {
            return "below absolute zero (0 K)";
        } else {
            return Math.floor((kelvin - 273.15) / 1);
        }
    }

    //assigning global veriables to values
    const weatherVancouver = $.getJSON(
        "https://api.openweathermap.org/data/2.5/weather?q=Vancouver,ca&appid=4a48e1e1428fd83889074671fbf259d9"
    ).done(function (data) {
        temp = data.main.temp;
        tempMax = data.main.temp_max;
        tempMin = data.main.temp_min;
        windSpeed = data.wind.speed;
        icon = data.weather[0].icon;
        iconSrc = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        description = data.weather[0].description;
        pressure = data.main.pressure;
        humidity = data.main.humidity;
        // console.log(this.icon);
    });

    function weatherOption(selected) {
        console.log(selected);
        switch (selected) {
            case "temp":
                option = convertKelvinToCelsius(temp) + " ˚C";
                break;
            case "tempMax":
                option = convertKelvinToCelsius(tempMax) + " ˚C";
                break;
            case "tempMin":
                option = convertKelvinToCelsius(tempMin) + " ˚C";
                break;
            case "windSpeed":
                option = windSpeed + " km/h";
                break;
            case "icon":
                option = "<img src='" + iconSrc + "'/>";
                break;
            case "description":
                option = description;
                break;
            case "pressure":
                option = pressure + " hpa";
                break;
            case "humidity":
                option = humidity + " %";
                break;
            default:
                option = "Select your option";
        }

        console.log(option);
    }

    $("#weather-menu").on("change", function () {
        $("p").html("");
        const selected = $(this).val();
        if (selected !== "") {
            console.log("The value picked is " + selected);
            weatherOption(selected);
            $("p").append(option);
        }
    });
})();
