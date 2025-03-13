async function fetchWeather() {
    const location = document.getElementById('location').value;
    if (!location.trim()) return;

    const apiKey = "42a405b1c122467e8b680818251203";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
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
        console.error('Fetch error:', error);
        document.getElementById('details').innerHTML = `<p style="color:red;">Failed to fetch weather data</p>`;
    }
}
