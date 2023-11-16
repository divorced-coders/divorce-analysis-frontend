---
toc: true
comments: true
layout: post
title: User Auth in Spring
type: help
courses: { csa: {week: 7} }
---

```markdown
# User Authentication in Spring Boot with JPA

User authentication is a critical part of many web applications. In this guide, we'll explore how to implement user authentication in a Java Spring Boot application using the Java Persistence API (JPA) for database interaction.

## Step 1: Project Setup

1. Create a Spring Boot project using Spring Initializr or your preferred IDE.
2. Include the necessary dependencies: Spring Web, Spring Security, and Spring Data JPA.

## Step 2: Entity Model

1. Define an `User` entity class with attributes like `username` and `password`.
2. Use JPA annotations to mark the class as an entity and define the table structure.

Example:
```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String username;
    private String password;
    // Other fields and methods
}
```

## Step 3: Repository

1. Create a JPA repository interface for the `User` entity.
2. This repository provides CRUD operations for the user data.

Example:
```java
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
```

## Step 4: Password Encoding

1. Implement password encoding to secure user passwords.
2. Use a password encoder, such as `BCryptPasswordEncoder`, to encode and verify passwords.

Example:
```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

## Step 5: Security Configuration

1. Configure Spring Security for user authentication.
2. Define security rules, login, and logout endpoints.

Example:
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .defaultSuccessURL("/dashboard")
                .permitAll()
                .and()
            .logout()
                .logoutUrl("/logout")
                .permitAll();
    }
}
```

## Step 6: Custom User Details Service

1. Implement a custom user details service that loads user details from the database.

Example:
```java
@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new CustomUserDetails(user);
    }
}
```

## Step 7: User Registration

1. Implement a user registration process, including validation and saving the user to the database.

Example:
```java
@PostMapping("/register")
public String registerUser(@ModelAttribute User user) {
    // Validate user data
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    userRepository.save(user);
    return "redirect:/login";
}
```

## Step 8: User Login and Logout

1. Create login and logout controllers and views.
2. Ensure proper authentication and session management.

Example:
```java
@GetMapping("/login")
public String login() {
    return "login";
}

@GetMapping("/logout")
public String logout(HttpServletRequest request) {
    new SecurityContextLogoutHandler().logout(request, null, null);
    return "redirect:/login?logout";
}
```

# Step 9: Testing in Postman

<a href="https://ibb.co/GVMTxJ9"><img src="https://i.ibb.co/P5WQmYM/image.png" alt="image" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'></a><br />