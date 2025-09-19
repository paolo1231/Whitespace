// Java Sample - Contains various issues for testing
import java.util.*;

public class UserManager {
    private ArrayList users = new ArrayList(); // Raw type usage
    private String adminPassword = "admin123"; // Hardcoded password
    
    public UserManager() {
        // Empty constructor
    }
    
    // Method with too many responsibilities
    public String processUser(String name, String email, int age) {
        if (name == null || name.equals("")) { // Should use isEmpty()
            return "Invalid name";
        }
        
        // Inefficient string concatenation
        String result = "";
        result = result + "Processing user: " + name;
        result = result + ", Email: " + email;
        result = result + ", Age: " + age;
        
        // Potential null pointer exception
        if (email.contains("@")) {
            users.add(name); // Adding to raw type
        }
        
        // Magic number
        if (age > 65) {
            result = result + " (Senior)";
        }
        
        return result;
    }
    
    // Method that could be static
    public boolean isValidEmail(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }
    
    // Unused method
    private void debugMethod() {
        System.out.println("Debug info");
    }
}