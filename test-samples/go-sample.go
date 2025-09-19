// Go Sample - Contains various issues for testing
package main

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

// Global variable (should be avoided)
var users []string
var adminPassword = "admin123" // Hardcoded password

// Struct without proper field tags
type User struct {
	Name  string
	Email string
	Age   int
}

// Function with too many return values
func processUser(name, email string, age int) (string, bool, error, int) {
	// String comparison without proper validation
	if name == "" {
		return "Invalid name", false, nil, 0
	}
	
	// Inefficient string concatenation
	result := ""
	result = result + "Processing user: " + name
	result = result + ", Email: " + email
	result = result + ", Age: " + strconv.Itoa(age)
	
	// No email validation
	if strings.Contains(email, "@") {
		users = append(users, name)
	}
	
	// Magic number
	if age > 65 {
		result = result + " (Senior)"
	}
	
	return result, true, nil, len(users)
}

// Function that doesn't follow Go naming conventions
func isValidEmail(email string) bool {
	return email != "" && strings.Contains(email, "@") && strings.Contains(email, ".")
}

// Function without proper error handling
func divideNumbers(a, b int) int {
	return a / b // Potential division by zero
}

// Function that should use context
func fetchUserData(userId int) string {
	// Simulating blocking operation without context
	time.Sleep(1 * time.Second)
	return fmt.Sprintf("User data for %d", userId)
}

// Unused function
func debugFunction() {
	fmt.Println("Debug info")
}

// Function with naked return (should be avoided for readability)
func calculateTotal(items []int) (total int) {
	for _, item := range items {
		total += item
	}
	return // Naked return
}

// Interface that could be more specific
type DataProcessor interface {
	Process(data interface{}) interface{}
}

// Struct method that doesn't use receiver
func (u User) GetSystemInfo() string {
	return "System info" // Doesn't use receiver
}

// Function with too many parameters
func createUser(firstName, lastName, email, phone, address, city, state, country string, age int) User {
	return User{
		Name:  firstName + " " + lastName,
		Email: email,
		Age:   age,
	}
}

// Main function with unused variables
func main() {
	unusedVar := "not used"
	user := User{Name: "John", Email: "john@example.com", Age: 30}
	
	result, success, err, count := processUser(user.Name, user.Email, user.Age)
	if success && err == nil {
		fmt.Printf("Result: %s, Count: %d\n", result, count)
	}
	
	// Unused variable
	_ = unusedVar
}