<!-- This page fetches data from the Metroinfo Trip Updates API at https://apis.metroinfo.co.nz/ etc etc-->
async function getData() {
  const response = await fetch('https://apis.metroinfo.co.nz/rti/gtfsrt/v1/trip-updates.pb', {
    headers: {
      'Ocp-Apim-Subscription-Key': '421fd0ac6a714ceebec2bad96c488c8e'
    }
  });
  const data = await response.json();
  return data;
}

async function renderData() {
  const data = await getData();
  const appDiv = document.getElementById('app');
  appDiv.textContent = JSON.stringify(data);
}

renderData();
