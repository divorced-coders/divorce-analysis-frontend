---
toc: true
comments: true
layout: post
title: Ideation (Week 0)
type: plans
courses: { csa: {week: 0} }
---

# Using the Fibonacci Sequence for Stock Price Analysis

### Plans
- **Backend with Java Spring:**
   1. **Spring Boot Project:**
      - Set up a Spring Boot project using Maven or Gradle.
      - Use Spring MVC for handling HTTP requests.
   2. **Database and JPA:**
      - Choose a relational database like SQLite
      - Utilize Spring Data JPA for seamless database interactions.
   3. **Financial Data API Integration:**
      - Integrate a Yahoo finance API to fetch historical stock prices. 
   4. **Fibonacci Calculation:**
      - Implement a service to calculate Fibonacci retracement levels based on historical stock data.
      - Define endpoints in a Spring Controller to expose this functionality.
  5. **Sorting**
     - sort for Fibonacci common retracement numbers like 23.8% or 0.238 in the historic stocks data

- **Frontend with Jekyll:**
   1. **HTML and Liquid Templating:**
      - Use HTML and Liquid templating to structure the frontend.
   2. **Styling with CSS:**
      - Apply SCSS for styling. 
   3. **Graph & Regression:**
      - Use canvas to generate graphs based on monthly stock data
      - **JS Code snippets**
```js
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
```
```js
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
```
   6. **Testing and Deployment:**
      - Test your Java Spring backend and Jekyll frontend components independently.
      - Deploy the Spring Boot application on a platform like Heroku or AWS.
      - Host the Jekyll frontend on platforms like GitHub Pages or Netlify.

