document.getElementById('generateTable').addEventListener('click', function() {
    const jsonInput = document.getElementById('jsonInput').value;
    const jsonFile = document.getElementById('jsonFile').files[0];

    if (jsonInput) {
        try {
            const jsonData = JSON.parse(jsonInput);
            createTable(jsonData);
            addFilterListeners(jsonData);
        } catch (error) {
            alert('Invalid JSON code.');
        }
    } else if (jsonFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const jsonData = JSON.parse(event.target.result);
                createTable(jsonData);
                addFilterListeners(jsonData);
            } catch (error) {
                alert('Invalid JSON file.');
            }
        };
        reader.readAsText(jsonFile);
    } else {
        alert('Please upload a JSON file or paste JSON code.');
    }
});

function createTable(jsonData) {
    const tableBody = document.querySelector("#gamesTable tbody");
    const table = document.getElementById('gamesTable');
    table.style.display = 'table';
    tableBody.innerHTML = ''; // Clear existing rows

    jsonData.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.product}</td>
            <td>${item.platforms.join(', ')}</td>
            <td>${item.freebet_support}</td>
            <td>${item.category}</td>
            <td>${item.blocked_countries.join(', ')}</td>
        `;

        tableBody.appendChild(row);
    });
}

function addFilterListeners(jsonData) {
    document.getElementById('filterName').addEventListener('input', () => filterTable(jsonData));
    document.getElementById('filterProduct').addEventListener('input', () => filterTable(jsonData));
    document.getElementById('filterPlatforms').addEventListener('input', () => filterTable(jsonData));
    document.getElementById('filterFreebet').addEventListener('input', () => filterTable(jsonData));
    document.getElementById('filterCategory').addEventListener('input', () => filterTable(jsonData));
    document.getElementById('filterBlockedCountries').addEventListener('input', () => filterTable(jsonData));
}

function filterTable(jsonData) {
    const nameFilter = document.getElementById('filterName').value.toLowerCase();
    const productFilter = document.getElementById('filterProduct').value.toLowerCase();
    const platformsFilter = document.getElementById('filterPlatforms').value.toLowerCase();
    const freebetFilter = document.getElementById('filterFreebet').value.toLowerCase();
    const categoryFilter = document.getElementById('filterCategory').value.toLowerCase();
    const blockedCountriesFilter = document.getElementById('filterBlockedCountries').value.toLowerCase();

    const filteredData = jsonData.filter(item => {
        return (
            item.name.toLowerCase().includes(nameFilter) &&
            item.product.toLowerCase().includes(productFilter) &&
            item.platforms.join(', ').toLowerCase().includes(platformsFilter) &&
            String(item.freebet_support).toLowerCase().includes(freebetFilter) &&
            item.category.toLowerCase().includes(categoryFilter) &&
            item.blocked_countries.join(', ').toLowerCase().includes(blockedCountriesFilter)
        );
    });

    createTable(filteredData);
}
