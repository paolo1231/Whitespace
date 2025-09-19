// Rust Sample - Contains various issues for testing
use std::collections::HashMap;

// Global mutable state (should be avoided)
static mut USERS: Vec<String> = Vec::new();
static ADMIN_PASSWORD: &str = "admin123"; // Hardcoded password

// Struct without proper derives
struct User {
    name: String,
    email: String,
    age: u32,
}

// Implementation with unnecessary cloning
impl User {
    fn new(name: String, email: String, age: u32) -> User {
        User {
            name: name.clone(), // Unnecessary clone
            email: email.clone(), // Unnecessary clone
            age,
        }
    }
    
    // Method that could return a reference
    fn get_name(&self) -> String {
        self.name.clone() // Should return &str
    }
    
    // Method with unnecessary mutable reference
    fn is_adult(&mut self) -> bool {
        self.age >= 18 // Doesn't need mutable reference
    }
}

// Function with panic instead of proper error handling
fn process_user(name: &str, email: &str, age: u32) -> String {
    if name.is_empty() {
        panic!("Invalid name"); // Should return Result
    }
    
    // Inefficient string concatenation
    let mut result = String::new();
    result.push_str("Processing user: ");
    result.push_str(name);
    result.push_str(", Email: ");
    result.push_str(email);
    result.push_str(", Age: ");
    result.push_str(&age.to_string());
    
    // Unsafe global access
    unsafe {
        if email.contains("@") {
            USERS.push(name.to_string());
        }
    }
    
    // Magic number
    if age > 65 {
        result.push_str(" (Senior)");
    }
    
    result
}

// Function that should use Option/Result
fn divide_numbers(a: i32, b: i32) -> i32 {
    a / b // Potential division by zero
}

// Function with unnecessary String allocation
fn is_valid_email(email: String) -> bool {
    !email.is_empty() && email.contains("@") && email.contains(".")
}

// Function with inefficient vector operations
fn filter_adults(users: Vec<User>) -> Vec<User> {
    let mut adults = Vec::new();
    for user in users {
        if user.age >= 18 {
            adults.push(user); // Could use iterator and collect
        }
    }
    adults
}

// Function that doesn't handle errors properly
fn parse_age(age_str: &str) -> u32 {
    age_str.parse().unwrap() // Should handle parse error
}

// Unused function
fn debug_function() {
    println!("Debug info");
}

// Function with unnecessary lifetime parameter
fn get_first_user<'a>(users: &'a Vec<User>) -> &'a User {
    &users[0] // Should check if vector is empty
}

// Main function with various issues
fn main() {
    let user = User::new(
        "John".to_string(),
        "john@example.com".to_string(),
        30
    );
    
    let result = process_user(&user.name, &user.email, user.age);
    println!("{}", result);
    
    // Unused variable
    let _unused_var = "not used";
    
    // Potential panic
    let age = parse_age("not_a_number");
    println!("Age: {}", age);
}