---
layout: post
title: test
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Price Checker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        label {
            font-weight: bold;
            margin-right: 10px;
        }
        input {
            margin-bottom: 10px;
        }
        #result {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Stock Price Checker</h1>
    <label for="stockSymbol">Enter Stock Symbol:</label>
    <input type="text" id="stockSymbol" placeholder="e.g., AAPL">
    <button onclick="getStockData()">Get Stock Data</button>
    <div id="result"></div>
    <script>
        function getStockData() {
            const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
            const stockSymbol = document.getElementById('stockSymbol').value.toUpperCase();
            const resultDiv = document.getElementById('result');
            if (stockSymbol === '') {
                resultDiv.innerHTML = '<p>Please enter a stock symbol.</p>';
                return;
            }
            // Get current date and dates for 3M, 6M, and 1Y ago
            const currentDate = new Date();
            const threeMonthsAgo = new Date(currentDate);
            threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
            const sixMonthsAgo = new Date(currentDate);
            sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
            const oneYearAgo = new Date(currentDate);
            oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
            // Format dates in YYYY-MM-DD
            const formatDate = date => date.toISOString().split('T')[0];
            const currentDateString = formatDate(currentDate);
            const threeMonthsAgoString = formatDate(threeMonthsAgo);
            const sixMonthsAgoString = formatDate(sixMonthsAgo);
            const oneYearAgoString = formatDate(oneYearAgo);
            
    </script>
</body>
</html>
