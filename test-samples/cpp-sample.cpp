// C++ Sample - Contains various issues for testing
#include <iostream>
#include <vector>
#include <string>
#include <memory>

// Global variables (should be avoided)
std::vector<std::string> users;
const std::string adminPassword = "admin123"; // Hardcoded password

// Class without proper RAII
class User {
public:
    std::string* name;
    std::string* email;
    int age;
    
    // Constructor without proper initialization
    User(std::string n, std::string e, int a) {
        name = new std::string(n); // Manual memory management
        email = new std::string(e);
        age = a;
    }
    
    // Missing destructor (memory leak)
    // Missing copy constructor and assignment operator
    
    // Method that should be const
    std::string getName() {
        return *name;
    }
    
    // Method with raw pointer parameter
    void setEmail(std::string* newEmail) {
        delete email;
        email = newEmail;
    }
};

// Function with C-style array parameter
void processUsers(User users[], int size) {
    for (int i = 0; i < size; i++) {
        std::cout << users[i].getName() << std::endl;
    }
}

// Function without proper error handling
int divideNumbers(int a, int b) {
    return a / b; // Potential division by zero
}

// Function with inefficient string concatenation
std::string processUser(const std::string& name, const std::string& email, int age) {
    if (name.empty()) {
        return "Invalid name";
    }
    
    // Inefficient string concatenation
    std::string result = "";
    result = result + "Processing user: " + name;
    result = result + ", Email: " + email;
    result = result + ", Age: " + std::to_string(age);
    
    // No email validation
    if (email.find("@") != std::string::npos) {
        users.push_back(name);
    }
    
    // Magic number
    if (age > 65) {
        result = result + " (Senior)";
    }
    
    return result;
}

// Function that should use references
std::string concatenateStrings(std::string str1, std::string str2) {
    return str1 + str2; // Should use const references
}

// Class with public data members
class DatabaseConnection {
public:
    std::string connectionString;
    bool isConnected;
    
    DatabaseConnection(std::string connStr) : connectionString(connStr), isConnected(false) {
        // Simulate connection
        isConnected = true;
    }
    
    // Missing virtual destructor for potential inheritance
};

// Function with unused parameter
void logMessage(const std::string& message, int level) {
    std::cout << message << std::endl;
    // level parameter is unused
}

// Macro instead of const/constexpr
#define MAX_USERS 100

// Function with C-style cast
double calculatePercentage(int value, int total) {
    return (double)value / total * 100; // Should use static_cast
}

// Main function with various issues
int main() {
    User* user = new User("John", "john@example.com", 30); // Manual memory management
    
    std::string result = processUser(*user->name, *user->email, user->age);
    std::cout << result << std::endl;
    
    // Memory leak - forgot to delete user
    
    // Unused variable
    int unusedVar = 42;
    
    // Potential division by zero
    int result2 = divideNumbers(10, 0);
    std::cout << "Division result: " << result2 << std::endl;
    
    return 0;
}