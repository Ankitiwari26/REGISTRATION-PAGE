var candiesSold = 0;
var crudCrudEndpoint = 'https://crudcrud.com/api/eb9f7dbeabd143f9ae959a177c17f24c/candy'; // Replace with your CRUD CRUD endpoint

// Load data from the CRUD CRUD API on page load
document.addEventListener('DOMContentLoaded', function () {
    loadDataFromCrudCrud();
});

document.getElementById('add-btn').addEventListener('click', function () {
    var candyName = document.getElementById('candy').value;
    var description = document.getElementById('description').value;
    var price = document.getElementById('price').value;
    var stock = document.getElementById('stock').value;

    var tableBody = document.getElementById('candy-table-body');
    var newRow = tableBody.insertRow(tableBody.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);

    // Create a counter input for the "Action" column
    var counterInput = document.createElement('input');
    counterInput.type = 'number';
    counterInput.min = '0';
    counterInput.value = '0';
    cell6.appendChild(counterInput);

    // Create a "Sell" button for the "Action" column
    var sellButton = document.createElement('button');
    sellButton.innerText = 'Sell';
    sellButton.addEventListener('click', function () {
        sellCandy(newRow, counterInput);
    });
    cell7.appendChild(sellButton);

    // Display candy details in the other cells
    cell1.innerHTML = candyName;
    cell2.innerHTML = description;
    cell3.innerHTML = price;
    cell4.innerHTML = stock;
    cell5.innerHTML = 0;

    // Save data to the CRUD CRUD API
    saveDataToCrudCrud(candyName, description, price, stock, 0);

    document.getElementById('candy').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stock').value = '';
});

function sellCandy(row, counterInput) {
    var stockCell = row.cells[3];
    var soldCell = row.cells[4];
    var counterAmount = parseInt(counterInput.value);

    var currentStock = parseInt(stockCell.innerHTML);
    var currentSold = parseInt(soldCell.innerHTML);

    if (currentStock >= counterAmount) {
        stockCell.innerHTML = currentStock - counterAmount;
        soldCell.innerHTML = currentSold + counterAmount;

        candiesSold += counterAmount;
        updateSoldCount();

        // Reset the counter input to 0
        counterInput.value = '0';

        // Save data to the CRUD CRUD API after selling candy
        saveDataToCrudCrud(row.cells[0].innerHTML, row.cells[1].innerHTML, row.cells[2].innerHTML, stockCell.innerHTML, soldCell.innerHTML);
    } else {
        alert('Not enough candies in stock!');
    }
}

function updateSoldCount() {
    console.log('Total candies sold: ' + candiesSold);
}

function saveDataToCrudCrud(candyName, description, price, stock, sold) {
    // Create a JSON object with the candy data
    var candyData = {
        candyName: candyName,
        description: description,
        price: price,
        stock: stock,
        sold: sold
    };

    // Make a POST request to the CRUD CRUD API to save the data
    fetch(crudCrudEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(candyData)
    })
    .then(response => response.json())
    .then(data => console.log('Data saved to CRUD CRUD:', data))
    .catch(error => console.error('Error saving data to CRUD CRUD:', error));
}

function loadDataFromCrudCrud() {
    // Make a GET request to the CRUD CRUD API to load data
    fetch(crudCrudEndpoint)
    .then(response => response.json())
    .then(data => {
        // Process the retrieved data and update the table
        updateTableWithData(data);
    })
    .catch(error => console.error('Error loading data from CRUD CRUD:', error));
}

function updateTableWithData(data) {
    // Extract and update the table with the retrieved data
    var tableBody = document.getElementById('candy-table-body');
    tableBody.innerHTML = '';

    data.forEach(candy => {
        var newRow = tableBody.insertRow(tableBody.rows.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);

        // Create a counter input for the "Action" column
        var counterInput = document.createElement('input');
        counterInput.type = 'number';
        counterInput.min = '0';
        counterInput.value = '0';
        cell6.appendChild(counterInput);

        // Create a "Sell" button for the "Action" column
        var sellButton = document.createElement('button');
        sellButton.innerText = 'Sell';
        sellButton.addEventListener('click', function () {
            sellCandy(newRow, counterInput);
        });
        cell7.appendChild(sellButton);

        // Display candy details in the other cells
        cell1.innerHTML = candy.candyName;
        cell2.innerHTML = candy.description;
        cell3.innerHTML = candy.price;
        cell4.innerHTML = candy.stock;
        cell5.innerHTML = candy.sold;
    });
}
