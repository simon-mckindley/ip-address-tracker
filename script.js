const textInput = document.getElementById("address");
const ipAddress = document.getElementById("ip-address-data");
const locationData = document.getElementById("location-data");
const timezone = document.getElementById("timezone-data");
const ispData = document.getElementById("isp-data");
const dataOutputs = document.querySelectorAll(".data-text");

const quay = "at_dFEB2bZjPmuuLwPByNMuw3uQ3DazF";


async function getGeolocationData(input) {
    const output = validateInput(input);

    if (!output.valid) {
        console.log(output.str);
        return;
    }

    try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${quay}&${output.str}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


async function displayData(input) {
    const geoData = await getGeolocationData(input);

    if (geoData) {
        dataOutputs.forEach((el) => el.style.display = "block");
        ipAddress.textContent = geoData.ip;
        const loc = `${geoData.location.city}, ${geoData.location.region} ${geoData.location.postalCode} ${geoData.location.country}`;
        locationData.textContent = loc;
        timezone.textContent = `UTC ${geoData.location.timezone}`;
        ispData.textContent = geoData.isp;
    } else {
        textInput.classList.add("input-error");
    }
}


function validateInput(input) {
    let output = { valid: true, str: "" };
    const ipv4Pattern = /^(?:\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,7}|:):(([0-9a-fA-F]{1,4}:){1,7}|:)|(([0-9a-fA-F]{1,4}:){1,7}|:):(([0-9a-fA-F]{1,4}:){1,7}|:)|(([0-9a-fA-F]{1,4}:){1,7}|:):(([0-9a-fA-F]{1,4}:){1,7}|:)|(([0-9a-fA-F]{1,4}:){1,7}|:):(([0-9a-fA-F]{1,4}:){1,7}|:)|(([0-9a-fA-F]{1,4}:){1,7}|:):(([0-9a-fA-F]{1,4}:){1,7}|:))$/;
    const domainPattern = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (ipv4Pattern.test(input) || ipv6Pattern.test(input)) {
        output.str = `ipAddress=${input}`;
        console.log("IP address");
    } else if (domainPattern.test(input)) {
        output.str = `domain=${input}`;
        console.log("Domain name");
    } else if (emailPattern.test(input)) {
        output.str = `email=${input}`;
    } else {
        output.valid = false;
        output.str = "Invalid address input";
    }

    return output;
}


document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    dataOutputs.forEach((el) => el.style.display = "");
    displayData(textInput.value.trim());
});

textInput.addEventListener("input", function () {
    this.classList.remove("input-error");
})


// location
// :
// city
// :
// "South Beach"
// country
// :
// "US"
// geonameId
// :
// 5326621
// lat
// :
// 37.78298
// lng
// :
// -122.38969
// postalCode
// :
// ""
// region
// :
// "California"
// timezone
// :
// "-07:00"