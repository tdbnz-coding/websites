let tableData = [];
let timer;
let statusUpdateInterval;

async function loadListNames() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    const listSelect = document.getElementById("list-select");
    for (const listName in data) {
      const option = document.createElement("option");
      option.value = listName;
      option.textContent = listName;
      listSelect.appendChild(option);
    }
  } catch (error) {
    console.error("Error loading list names:", error);
  }
}

async function fetchData() {
  const apiKey = document.getElementById("api-key").value;
  if (apiKey === "") {
    alert("Please enter an API key");
    return;
  }

  const listSelect = document.getElementById("list-select");
  const selectedList = listSelect.value;

  if (!selectedList) {
    return;
  }

  const fetchButton = document.getElementById("fetch-button");
  fetchButton.disabled = true;
  startCountdown();

  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  showLoadingIndicator();
  hideDataTable();

  try {
    const response = await fetch("data.json");
    const data = await response.json();
    tableData = data[selectedList];
    if (tableData.length === 0) {
      displayNoDataMessage();
      hideLoadingIndicator();
      return;
    }

    const userPromises = tableData.map(async (row) => {
      const apiUrl = `https://api.torn.com/user/${row.id}?selections=basic&key=${apiKey}`;
      try {
        const userResponse = await fetch(apiUrl);
        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
        }
        const userData = await userResponse.json();
        const status = formatStatus(userData.status);
        return { ...row, status };
      } catch (error) {
        console.error("Error fetching user data:", error);
        return { ...row, status: "Error" };
      }
    });

    const usersWithStatus = await Promise.all(userPromises);

    const sortedUsers = usersWithStatus.sort((a, b) => {
      if (a.status === "Okay" && b.status !== "Okay") return -1;
      if (a.status !== "Okay" && b.status === "Okay") return 1;
      if (a.status === "Okay" && b.status === "Okay") return 0;

      const aRemaining = parseHospitalTime(a.status);
      const bRemaining = parseHospitalTime(b.status);

      return aRemaining - bRemaining;
    });

    sortedUsers.forEach((user, index) => {
      const attackLink = createAttackLink(user.id, user.status);
      const newRow = createTableRow(user, user.status, attackLink, index);
      tableBody.innerHTML += newRow;
    });

    hideNoDataMessage();
    displayDataTable();

    clearInterval(statusUpdateInterval);
    statusUpdateInterval = setInterval(() => {
      updateStatus();
    }, 1000);

    hideLoadingIndicator();
  } catch (error) {
    console.error("Error fetching data:", error);
    hideLoadingIndicator();
  } finally {
    fetchButton.textContent = "Fetch";
    fetchButton.disabled = false;
  }
}

// ... (rest of the functions remain unchanged)

document.addEventListener("DOMContentLoaded", () => {
  populateAPIKey();
  loadListNames();
});
