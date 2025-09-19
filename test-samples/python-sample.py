# Python Sample - Contains various issues for testing
import os
import sys

class UserManager:
    def __init__(self):
        self.users = []
        self.admin_password = "admin123"  # Hardcoded password
    
    # Missing type hints
    def process_user(self, name, email, age):
        if name == None or name == "":  # Should use 'is None' and not name
            return "Invalid name"
        
        # Inefficient string concatenation
        result = ""
        result = result + "Processing user: " + name
        result = result + ", Email: " + email  
        result = result + ", Age: " + str(age)
        
        # No email validation
        if "@" in email:
            self.users.append(name)
        
        # Magic number
        if age > 65:
            result = result + " (Senior)"
        
        return result
    
    # Method that could be static
    def is_valid_email(self, email):
        return email and "@" in email and "." in email
    
    # Unused import and variable
    def get_system_info(self):
        unused_var = "not used"
        return sys.platform
    
    # Non-Pythonic loop
    def get_user_names(self):
        names = []
        for i in range(len(self.users)):
            names.append(self.users[i])
        return names
    
    # Missing docstring and error handling
    def divide_numbers(self, a, b):
        return a / b  # Potential division by zero

# Global variable (should be avoided)
GLOBAL_COUNTER = 0

def increment_counter():
    global GLOBAL_COUNTER
    GLOBAL_COUNTER += 1
    return GLOBAL_COUNTER