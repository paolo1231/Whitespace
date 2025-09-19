// JavaScript Sample - Contains various issues for testing

// Using var instead of const/let
var users = [];
var adminPassword = "admin123"; // Hardcoded password

// Function without proper error handling
function processUser(name, email, age) {
    // Loose equality comparison
    if (name == null || name == "") {
        return "Invalid name";
    }
    
    // Inefficient string concatenation
    var result = "";
    result = result + "Processing user: " + name;
    result = result + ", Email: " + email;
    result = result + ", Age: " + age;
    
    // No email validation
    if (email.indexOf("@") > -1) {
        users.push(name);
    }
    
    // Magic number
    if (age > 65) {
        result = result + " (Senior)";
    }
    
    return result;
}

// Callback hell example
function fetchUserData(userId, callback) {
    setTimeout(function() {
        // Simulating API call
        var userData = { id: userId, name: "John" };
        
        setTimeout(function() {
            // Another nested callback
            var userPreferences = { theme: "dark" };
            
            setTimeout(function() {
                // Yet another nested callback
                callback(null, { ...userData, preferences: userPreferences });
            }, 100);
        }, 100);
    }, 100);
}

// Function that should use arrow function
var isValidEmail = function(email) {
    return email && email.includes("@") && email.includes(".");
};

// Missing semicolons and using == instead of ===
function compareValues(a, b) {
    if (a == b) {
        return true
    }
    return false
}

// Unused variable
function calculateTotal(items) {
    var unusedVar = "not used";
    var total = 0;
    
    // Using for loop instead of modern array methods
    for (var i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    
    return total;
}

// Global variable pollution
window.globalCounter = 0;

// Function without proper parameter validation
function divideNumbers(a, b) {
    return a / b; // No check for division by zero
}