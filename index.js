// Aplicacion que nos muestre el clima de la ciudad que nosotros ingresemos
let api_key = "22edd86fd3365d0107c62d1c4c41a096";
// Referencia para el link con el que vamos a llamar a la API
let urlApi = "https://api.openweathermap.org/data/2.5/weather";
const difKelvin = 273.15;

document.getElementById("botonBusqueda").addEventListener("click", () => {
  // La ciuda va a ser igual al valor que se ingrese en el input
  const ciudad = document.getElementById("ciudadEntrada").value;
  // Si hay algo en ciudad
  if (ciudad) {
    fetchDatosClima(ciudad);
  }
});

// Creamos una funcion para invocar a la API
function fetchDatosClima(ciudad) {
  // Pedimos los datos de la API
  fetch(`${urlApi}?q=${ciudad}&appid=${api_key}`)
    // Usamos .then() para retornar la respuesta exitosa del fetch
    // Convertimos el JSON que nos llega en un objeto javascript para poder trabajarlo
    .then((response) => response.json())
    // Retornamos ahora si la respuesta que va a ser el JSON transformado en objeto javascript y vamos a usar una funcion para mostrar los datos del clima con la respuesta del fetch como argumento
    .then((response) => mostrarDatosClima(response));
}

function mostrarDatosClima(response) {
  // Seleccionamos el div donde van a ir los datos del clima
  const divDatosClima = document.getElementById("datosClima");
  divDatosClima.innerHTML = ""; // Vaciamos los datos para que se resetee
  const ciudadNombre = response.name;
  // Temperatura está dentro del objeto main y la clave temp
  const temperatura = response.main.temp;
  const descripcion = response.weather[0].description;
  const tempMin = response.main["temp_min"];
  const tempMax = response.main["temp_max"];
  const humedad = response.main.humidity;
  // Creamos un h2
  const ciudadTitulo = document.createElement("h2");
  ciudadTitulo.textContent = ciudadNombre;
  const temperaturaInfo = document.createElement("p");
  temperaturaInfo.textContent = `Temperature is: ${Math.round(
    temperatura - difKelvin
  )}°C`;
  const tempMinMaxInfo = document.createElement("p");
  tempMinMaxInfo.textContent = `Min:${Math.round(
    tempMin - difKelvin
  )}°C ~ Max:${Math.round(tempMax - difKelvin)}°C`;
  const humedadInfo = document.createElement("p");
  humedadInfo.textContent = `Humidity of: ${humedad}%`;
  const descripcionInfo = document.createElement("p");
  descripcionInfo.textContent = `The meteorological description is: ${descripcion}`;
  divDatosClima.appendChild(ciudadTitulo);
  divDatosClima.appendChild(temperaturaInfo);
  divDatosClima.appendChild(tempMinMaxInfo);
  divDatosClima.appendChild(humedadInfo);
  divDatosClima.appendChild(descripcionInfo);
}
