// TypeScript Sample - Contains various issues for testing

// Missing interface for better type safety
type User = {
    name: string;
    email: string;
    age: number;
};

// Using any type (should be avoided)
let users: any[] = [];
const adminPassword: string = "admin123"; // Hardcoded password

// Function with loose parameter types
function processUser(name: any, email: any, age: any): string {
    // Type coercion issues
    if (!name || name === "") {
        return "Invalid name";
    }
    
    // String concatenation instead of template literals
    let result: string = "";
    result = result + "Processing user: " + name;
    result = result + ", Email: " + email;
    result = result + ", Age: " + age;
    
    // No proper email validation
    if (email.includes("@")) {
        users.push(name);
    }
    
    // Magic number
    if (age > 65) {
        result = result + " (Senior)";
    }
    
    return result;
}

// Promise without proper error handling
async function fetchUserData(userId: number): Promise<any> {
    const response = await fetch(`/api/users/${userId}`);
    return response.json(); // No error handling
}

// Class without proper access modifiers
class UserManager {
    users: User[] = [];
    
    // Method that could be private
    validateEmail(email: string): boolean {
        return email && email.includes("@") && email.includes(".");
    }
    
    // Missing return type annotation
    addUser(user) {
        if (this.validateEmail(user.email)) {
            this.users.push(user);
            return true;
        }
        return false;
    }
    
    // Unused parameter
    removeUser(userId: number, reason?: string): boolean {
        this.users = this.users.filter(user => user.name !== userId);
        return true;
    }
}

// Interface that could be more specific
interface ApiResponse {
    data: any; // Should be more specific
    status: number;
}

// Function with optional parameters that should have defaults
function createUser(name: string, email?: string, age?: number): User {
    return {
        name,
        email: email || "", // Should use nullish coalescing
        age: age || 0
    };
}

// Enum that could be const assertion
enum UserRole {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest"
}