// script.js
async function fetchStats() {
    const apiKey = document.getElementById("apiKey").value;
    const statsContainer = document.getElementById("stats");

    try {
        const response = await fetch(`https://api.torn.com/user/${apiKey}?selections=items,energy,basic,bars,travel,education,work,display`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Check if the response contains an error message
        if (data.error) {
            throw new Error(data.error.error);
        }

        // Display the fetched data
        statsContainer.innerHTML = `
            <p><strong>Items:</strong> ${JSON.stringify(data.items)}</p>
            <p><strong>Energy:</strong> ${JSON.stringify(data.energy)}</p>
            <p><strong>Battle Stats:</strong> ${JSON.stringify(data.bars)}</p>
            <p><strong>Easy Targets:</strong> ${JSON.stringify(data.travel.easy)}</p>
            <!-- Add more sections as needed -->
        `;
    } catch (error) {
        console.error("Error fetching data:", error);
        // Display error message on the website
        statsContainer.innerHTML = `<p class="text-danger">${error.message}</p>`;
    }
}
