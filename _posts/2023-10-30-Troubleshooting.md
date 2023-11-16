---
toc: true
comments: true
layout: post
title: Troubleshooting
type: ticket
courses: { csa: {week: 11} }
---


# CORS Error
- Initially, encountered a CORS error when making requests from the frontend to the backend server.
- To address this issue, we added the necessary CORS headers to the backend response to allow requests from the frontend.
- We included `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, and other relevant headers in the response.

```java
package com.nighthawk.spring_portfolio;

import org.springframework.context.annotation.*;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**").allowedOrigins("https://cs-canvas.stu.nighthawkcodingsociety.com",
        "http://localhost:4200").allowedOrigins("*") // Allow requests from any origin
        .allowedMethods("GET", "POST", "PUT", "DELETE")
        .allowedHeaders("*");
  }

}

@EnableWebSecurity  // Beans to enable basic Web security
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // Provide a default configuration using configure(HttpSecurity http)
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()).cors(Customizer.withDefaults()).headers(headers -> headers
        .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Credentials", "true"))
        .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-ExposedHeaders", "*", "Authorization"))
        .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Headers", "Content-Type", "Authorization", "x-csrf-token"))
        .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-MaxAge", "600"))
        .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Methods", "POST", "GET", "OPTIONS", "HEAD"))
        //.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Origin", "https://nighthawkcoders.github.io", "http://localhost:4000"))
        );  // Cross-Site Request Forgery disable for JS Fetch URIs
    }

}
```

# 500 Internal Server Error
- Faced a 500 Internal Server Error when trying to retrieve a list of assignments from the backend using the `/getAllAssignments` endpoint.
- Investigated the backend code to identify potential issues and ensured the database contains the expected data.
- Modified the backend code to return the list of assignments as a JSON response.
- Removed unnecessary response maps and returned the assignments directly.

```java
@GetMapping(value="/getAllAssignments", produces = "application/json")
public ResponseEntity<List<Assignment>> getAllAss() {
    List<Assignment> assignments = assRepo.findAll();

    // HttpHeaders responseHeaders = new HttpHeaders();
    // responseHeaders.setContentLength(-1);

    return ResponseEntity.ok()
    // .headers(responseHeaders)
    .body(assignments);

}
```


# Content-Length Error
- Encountered issues with the `Content-Length` header being set to 16 in the response headers.
- Attempted to remove the `Content-Length` header from the response headers to address the issue.
- Created a custom filter in the Spring Boot application to manipulate the headers using `HttpServletResponse` to remove the `Content-Length` header.

# 415 Unsupported Media Type Error
- Encountered a 415 Unsupported Media Type Error when sending a POST request for user authentication.
- Investigated the frontend code to ensure the request had the correct content type.
- Checked the backend code to confirm it expected JSON data in the request body.
- Ensured that the request headers included `"Content-Type": "application/json"` to specify the content type as JSON.

# X-Frame-Options Error
- Encountered X-Frame-Options in the response headers, which can block requests from displaying in iframes on other web pages.
- Reviewed the frontend code and investigated the response headers to check if any conflicting options were set.
- Ensured that the `X-Frame-Options` header was not set to `DENY` in the response headers to allow the content to be displayed in iframes.
