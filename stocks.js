

generateMonthButtons("chronological");
generateDropdownButtons();

const monthDictionary = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

async function generateMonthButtons(orderType) {

  let orderedMonths = []

  const url = `http://localhost:8098/api/monthly-stocks/${orderType}`;

  try {
    // Fetch stock data from the backend
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    console.log(result.monthlyStocks);

    const monthButtonsContainer = document.getElementById('monthButtons');

    monthButtonsContainer.innerHTML = '';

    if (orderType == "chronological") {
      for (let monthlyData of result) {
        const button = document.createElement('button');
        button.textContent = monthDictionary[monthlyData["id"]];
        button.onclick = () => fetchDailyData(monthlyData.id);
        monthButtonsContainer.appendChild(button);
      }
    } else {
      for (let monthlyData of result.monthlyStocks) {
        const button = document.createElement('button');
        button.textContent = monthDictionary[monthlyData["id"]];
        button.onclick = () => fetchDailyData(monthlyData.id);
        monthButtonsContainer.appendChild(button);
      }
    }

    console.log("ordered months" + orderedMonths)
  } catch (error) {
    console.error(error);
  }

}

// Function to generate buttons for the dropdown
function generateDropdownButtons() {
  const types = ['chronological', 'low-to-high', 'high-to-low'];

  const dropdownContainer = document.querySelector('#typeDropdown .dropdown-content');

  types.forEach(type => {
    const button = document.createElement('a');
    button.textContent = type.replace('-', ' ');
    button.onclick = () => generateMonthButtons(type);
    dropdownContainer.appendChild(button);
  });
}

let regression = {}
let x = 0;
let ctx;

// Function to fetch stock data for a specific month
async function fetchDailyData(month) {
  const url = `http://localhost:8098/api/DailyStocks/${month}`;

  try {
    // Fetch stock data from the backend
    const response = await fetch(url);
    const monthlyData = await response.json();
    console.log(monthlyData);

    // Extract dates and adjusted closing prices from the API response
    const dates = monthlyData.map(entry => entry.date);
    const prices = monthlyData.map(entry => parseFloat(entry.high));

    // Generate the graph using the data
    generateGraph(dates, prices);
  } catch (error) {
    console.error(error);
  }
}

// Function to generate the graph
function generateGraph(dates, prices) {
  // Get canvas element and context
  const canvas = document.getElementsByTagName('canvas')[0];
  ctx = canvas.getContext('2d');

  // Define canvas dimensions
  canvas.width = 700;
  canvas.height = 400;

  // Define data points and chart dimensions
  const dataPoints = prices.length;
  const margin = 40;
  const chartWidth = canvas.width - 2 * margin;
  const chartHeight = canvas.height - 2 * margin;

  // Calculate scaling factors
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const priceRange = maxPrice - minPrice;
  const xStep = chartWidth / (dataPoints - 1);
  const yStep = chartHeight / priceRange;

  // Draw x and y axes
  ctx.beginPath();
  ctx.moveTo(margin, margin);
  ctx.lineTo(margin, canvas.height - margin);
  ctx.lineTo(canvas.width - margin, canvas.height - margin);
  ctx.stroke();

  // Plot stock prices
  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  for (let i = dataPoints; i > 0; i--) {
    const x = canvas.width - 40 - i * xStep;
    const y = canvas.height - margin - (prices[i] - minPrice) * yStep;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  // Calculate linear regression
  const xValues = [...Array(dataPoints).keys()];
  const yValues = prices;
  regression = linearRegression(xValues, yValues);

  // Plot linear regression line
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  for (let i = 0; i < dataPoints; i++) {
    const x = canvas.width - 40 - i * xStep;
    const y = canvas.height - margin - (regression.slope * i + regression.intercept - minPrice) * yStep;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  // Label axes
  ctx.fillStyle = 'black';
  ctx.fillText('Date', canvas.width - margin - 20, canvas.height - 10);
  ctx.fillText('Stock Price', margin - 10, margin - 10);

  // Display the prediction input section
  document.getElementsByClassName("prediction-wrapper")[0].style.display = "block"

  // Calculate Fibonacci retracement levels
  // Calculate Fibonacci retracement levels
  const fibonacciLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];

  // Draw Fibonacci retracement lines
  ctx.beginPath();
  ctx.setLineDash([5, 5]); // Set a dashed line style

  for (let i = 0; i < fibonacciLevels.length; i++) {
    const level = fibonacciLevels[i];

    // Calculate the price value corresponding to the Fibonacci level
    const retracementPrice = minPrice + level * priceRange;

    // Find the closest stock price to the retracement level
    const closestPrice = findClosestPrice(retracementPrice, prices);

    // Calculate the y-coordinate for the retracement level
    const y = canvas.height - margin - (closestPrice - minPrice) * yStep;

    // Draw the line
    ctx.moveTo(margin, y);
    ctx.lineTo(canvas.width - margin, y);

    // Label the line with the Fibonacci level
    ctx.fillStyle = 'black';
    ctx.fillText(`${(level * 100).toFixed(1)}%`, margin - 40, y - 5);
  }


  ctx.stroke();
  ctx.setLineDash([]); // Reset the line style
}

function findClosestPrice(value, prices) {
  let closestPrice = prices[0];
  let minDifference = Math.abs(value - closestPrice);

  for (let i = 1; i < prices.length; i++) {
    const difference = Math.abs(value - prices[i]);

    if (difference < minDifference) {
      minDifference = difference;
      closestPrice = prices[i];
    }
  }

  return closestPrice;
}


// Function to calculate linear regression
function linearRegression(x, y) {
  const n = x.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumX2 += x[i] * x[i];
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return {
    slope,
    intercept
  };
}

// Function to calculate the index based on user input
function calculateIndex(userInput) {
  // Split the user input into year and month
  const [year, month] = userInput.split('-');

  // Calculate the index based on the year and month, assuming January 2000 as the starting point
  const startIndex = (parseInt(year) - 2000) * 12 + (parseInt(month) + 1);

  return startIndex;
}

// Function to predict the stock price
function predictPrice() {
  const prediction = document.getElementById("predictionInput").value;

  // Calculate the x-value based on user input
  let xValue = calculateIndex(prediction)

  // Predict the stock price using linear regression formula
  const predictedPrice = (-regression.slope * xValue + regression.intercept);

  // Display the predicted price
  document.getElementById("prediction").textContent = "$" + predictedPrice.toFixed(2);
}