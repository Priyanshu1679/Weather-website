let interval;   // ✅ Global variable

async function getWeather() {

    const city = document.getElementById("city").value.trim();
    const resultBox = document.getElementById("weatherResult");
    const loader = document.getElementById("loader");

    if (city === "") {
        alert("Enter city name");
        return;
    }

    resultBox.classList.add("hidden");
    loader.classList.remove("hidden");

    const apiKey = "c702d67f71514df394f184138262802";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        loader.classList.add("hidden");
        resultBox.classList.remove("hidden");

        if (data.error) {
            resultBox.innerHTML = `<p>${data.error.message}</p>`;
            return;
        }

        // ✅ Weather Details Show
        resultBox.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p id="liveTime" style="font-size:14px;color:#ccc;"></p>
            <img src="https:${data.current.condition.icon}" />
            <p>${data.current.condition.text}</p>
            <h3>${data.current.temp_c} °C</h3>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind: ${data.current.wind_kph} km/h</p>
        `;

        // ✅ Live Time Function Call
        updateLiveTime(data.location.localtime);

    } catch (error) {
        loader.classList.add("hidden");
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = "Error fetching data";
    }
}


// ✅ Live Time Function
function updateLiveTime(localtime) {
    clearInterval(interval);

    let time = new Date(localtime);

    interval = setInterval(() => {
        time.setSeconds(time.getSeconds() + 1);

        const timeElement = document.getElementById("liveTime");
        if (timeElement) {
            timeElement.innerText =
                "🕒 Local Time: " + time.toLocaleTimeString();
        }

    }, 1000);
}