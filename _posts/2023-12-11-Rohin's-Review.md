---
toc: true
comments: true
layout: post
title: Rohin's review
---

# Features
- Fibonacci Calculation
  - Determine fibonacci retracement levels
  - **Requirements:** Space & time efficient, abstracted
- Monthly Sorting
  - Ascending sort the different months according to their high average value

# Fibonacci
## Inheritance
```java
public abstract class Fibo {
  public abstract int fibonacci(int n);
}
```
```java
public class FibonacciViaRecursion extends Fibo {

  @Override
  public int fibonacci(int n) {
    if (n <= 1) {
      return n;
    } else {
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
  }

  public static void main(String[] args) {
    Fibo fibo = new FibonacciViaMemoization();
    int n = 4;
    int result = fibo.fibonacci(n);
    System.out.println(result);
  }

}
```
- Fibonacci via Recursion reflection: 
  - Extrememly inefficeint O(2^n)
    - Exponential growth
```scss
                         fibonacci(4)
                      /                  \
            fibonacci(3)              fibonacci(2)
          /             \            /             \
  fibonacci(2)   fibonacci(1)   fibonacci(1)   fibonacci(0)
  /           \
fibonacci(1) fibonacci(0)
```

```java
public class FibonacciViaMemoization extends Fibo {
    
    private static Map<Integer, Integer> memo = new HashMap<>();

    @Override
    public int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
    
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
    
        int result = fibonacci(n - 1) + fibonacci(n - 2);
    
        memo.put(n, result);
    
        return result;
    }
    public static void main(String[] args) {
        Fibo fibo = new FibonacciViaMemoization();
        int n = 4;
        int result = fibo.fibonacci(n);
        System.out.println(result);
    }
}
```
- Fibonacci via Recursion Reflection:
  - Good attempt at reducing complexity, best case is O(n), worst case is still O(n!)
```scss
                         fibonacci(4)
                      /                  \
            fibonacci(3)              fibonacci(2)
          /             \            /             \
        [2]    [1]    fibonacci(1)   [1]    fibonacci(0)
  /            \
[1]      [0]
```
- Since only 5 retracement levels are used, the run time is the same, 

# MonthlyStocks Sorting
## Inheritance
```java
package com.nighthawk.spring_portfolio.mvc.stocks.sorting;

import java.util.List;

import org.springframework.util.StopWatch;

import com.nighthawk.spring_portfolio.mvc.stocks.MonthlyStocks;

public class MonthlyStocksSorter {

    StopWatch sw = new StopWatch();
    int comparisons;

    public SortedData bubbleSort(List<MonthlyStocks> monthlyStocksList) {
        return null;
    }

    public SortedData selectionSort(List<MonthlyStocks> monthlyStocksList) {
        return null;
    }

    public int compareStrings(String str1, String str2) {
        this.comparisons++;
        try {
            double value1 = Double.parseDouble(str1);
            double value2 = Double.parseDouble(str2);
            return Double.compare(value1, value2);
        } catch (NumberFormatException e) {
            // Handle parsing errors or decide how to compare non-numeric strings
            return str1.compareTo(str2);
        }
    }
}
```
```java
package com.nighthawk.spring_portfolio.mvc.stocks.sorting;

import java.util.List;

import com.nighthawk.spring_portfolio.mvc.stocks.MonthlyStocks;

public class Ascending extends MonthlyStocksSorter {

  public SortedData recursiveBubbleSort(List<MonthlyStocks> monthlyStocksList, int n) {
    boolean swapped = false;

    super.sw.start();
    for (int i = 1; i < n; i++) {
        if (super.compareStrings(monthlyStocksList.get(i - 1).getHigh(), monthlyStocksList.get(i).getHigh()) > 0) {
            // Swap elements
            MonthlyStocks temp = monthlyStocksList.get(i - 1);
            monthlyStocksList.set(i - 1, monthlyStocksList.get(i));
            monthlyStocksList.set(i, temp);
            swapped = true;
        }
    }
    super.sw.stop();

    if (!swapped || n == 1) {
        return new SortedData(super.comparisons, super.sw.getTotalTimeMillis(), monthlyStocksList);
    } else {
        return recursiveBubbleSort(monthlyStocksList, n - 1);
    }
}

}
```
- Recursive Bubble Sort Reflection:
  - Worst case, O(n^2)


# Overall Reflection
- Wanted to experiment with unconventional technology and gain new experiences developing solutions to already solved problems
  - Did so via the implementation of recursion and memoization, both of which are topics I am unfamiliar with.
