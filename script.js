async function fetchWeather() {
    const location = document.getElementById('location').value;
    if (!location.trim()) return;

    if (location.toLowerCase() === 'kolkata') {
        document.querySelector('body').style.backgroundImage = 'url(kolkata.webp)';
    } else {
        document.querySelector('body').style.backgroundImage = 'url(London.jpg)';
    }

    const apiKey = "42a405b1c122467e8b680818251203";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.getElementById('details').innerHTML = `<p style="color:red;">${data.error.message}</p>`;
        } else {
            document.getElementById('details').classList.add('details-active');
            document.getElementById('details').innerHTML = `
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p>${data.current.temp_c}°C</p>
                <p>${data.current.condition.text}</p>
                <p>Air Quality Index: ${data.current.air_quality['us-epa-index']}</p>
                <img src="${data.current.condition.icon}" alt="Weather icon">
            `;
        }
    } catch (error) {
        document.getElementById('details').innerHTML = `<p style="color:red;">Failed to fetch weather data</p>`;
    }
}

// Fetch default location weather on page load
document.addEventListener("DOMContentLoaded", fetchWeather);
