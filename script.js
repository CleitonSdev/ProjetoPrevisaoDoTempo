const form = document.getElementById("weatherForm");
const addressResults = document.getElementById("addressResults");
const weatherResults = document.getElementById("weatherResults").querySelector("span");


async function buscarEndereco(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) throw new Error("Erro ao buscar endereço.");
    const data = await response.json();

    addressResults.innerHTML = `
      <tr>
        <td>${data.logradouro || "Não disponível"}</td>
        <td>${data.bairro || "Não disponível"}</td>
        <td>${data.localidade || "Não disponível"}/${data.uf || ""}</td>
      </tr>
    `;
  } catch (error) {
    alert("Erro ao buscar endereço. Verifique o CEP.");
  }
}

// 
async function buscarPrevisao(lat, lon) {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    if (!response.ok) throw new Error("Erro ao buscar previsão do tempo.");
    const data = await response.json();

    weatherResults.textContent = `${data.current_weather.temperature}°C`;
  } catch (error) {
    alert("Erro ao buscar previsão do tempo. Verifique as coordenadas.");
  }
}


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cep = document.getElementById("cep").value;
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;

  if (cep) buscarEndereco(cep);
  if (latitude && longitude) buscarPrevisao(latitude, longitude);
});