//--------------- CurrencyConverter ---------------//

document.getElementById("currencyForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;
  const resultDiv = document.getElementById("result");

  // Clear previous results
  resultDiv.innerHTML = "";

  if (!from || !to || !amount || isNaN(amount)) {
    resultDiv.innerHTML = "<p>Please fill in all fields with valid values.</p>";
    return;
  }

  try {
    // Send POST request to the backend using Axios
    const response = await axios.post("http://localhost:5000/api/currency/convert", {
      from,
      to,
      amount: parseFloat(amount),
    });

    // Display conversion results
    resultDiv.innerHTML = `
        <p>Result:</p>
        <p><strong>Exchange Rate:</strong> ${response.data.info.rate}</p>
        <p><strong>Converted Amount:</strong> ${response.data.result}</p>
      `;
  } catch (error) {
    console.error("Error during conversion:", error);
    resultDiv.innerHTML = "<p>Conversion failed. Please try again later.</p>";
  }
});

//--------------- GetConversionHistory ---------------//

// Function to fetch data and populate the table
const getConversionHistory = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/currency/history");
    const data = await response.json();
    const history = data.history;

    // Get the table body element
    const tableBody = document.getElementById("table-body");

    // Clear any existing rows
    tableBody.innerHTML = "";

    // Loop through the history data and create rows
    history.forEach((record, index) => {
      const row = document.createElement("tr");

      // Add a class for alternating rows
      if (index % 2 === 0) {
        row.classList.add("active-row");
      }

      // Create cells and populate with data
      row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.from}</td>
            <td>${record.to}</td>
            <td>${record.amount}</td>
            <td>${record.convertedAmount.toFixed(2)}</td>
            <td>${record.exchangeRate.toFixed(2)}</td>
          `;

      // Append the row to the table body
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching conversion history:", error);
  }
};

// Call the function to populate the table on page load
getConversionHistory();

//--------------- GetCurrencySymbols ---------------//

// Function to fetch currency symbols and populate dropdowns
const populateDropdowns = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/currency/symbols");
    const data = await response.json();
    const symbols = data.symbols;

    // Get the dropdown elements
    const fromDropdown = document.getElementById("from");
    const toDropdown = document.getElementById("to");

    // Clear existing options
    fromDropdown.innerHTML = "";
    toDropdown.innerHTML = "";

    // Loop through symbols and create options for both dropdowns
    for (const symbol in symbols) {
      const option = document.createElement("option");
      option.value = symbol;
      option.textContent = symbol;

      // Append the option to both dropdowns
      fromDropdown.appendChild(option.cloneNode(true)); // Add to 'From' dropdown
      toDropdown.appendChild(option.cloneNode(true)); // Add to 'To' dropdown
    }
  } catch (error) {
    console.error("Error fetching currency symbols:", error);
  }
};

// Call the function to populate the dropdowns on page load
populateDropdowns();
