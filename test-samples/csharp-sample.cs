// C# Sample - Contains various issues for testing
using System;
using System.Collections.Generic;
using System.Linq;

namespace UserManagement
{
    // Class without proper access modifier
    class UserManager
    {
        // Public field instead of property
        public List<string> users = new List<string>();
        private string adminPassword = "admin123"; // Hardcoded password
        
        // Method with too many responsibilities
        public string ProcessUser(string name, string email, int age)
        {
            // String comparison without null check
            if (name == null || name.Equals(""))
            {
                return "Invalid name";
            }
            
            // Inefficient string concatenation
            string result = "";
            result = result + "Processing user: " + name;
            result = result + ", Email: " + email;
            result = result + ", Age: " + age.ToString();
            
            // No email validation
            if (email.Contains("@"))
            {
                users.Add(name);
            }
            
            // Magic number
            if (age > 65)
            {
                result = result + " (Senior)";
            }
            
            return result;
        }
        
        // Method that should be static
        public bool IsValidEmail(string email)
        {
            return !string.IsNullOrEmpty(email) && email.Contains("@") && email.Contains(".");
        }
        
        // Missing async/await pattern
        public string FetchUserData(int userId)
        {
            // Simulating synchronous call that should be async
            System.Threading.Thread.Sleep(1000);
            return $"User data for {userId}";
        }
        
        // Method without proper exception handling
        public int DivideNumbers(int a, int b)
        {
            return a / b; // Potential division by zero
        }
        
        // Unused private method
        private void DebugMethod()
        {
            Console.WriteLine("Debug info");
        }
        
        // Property without validation
        public string AdminPassword
        {
            get { return adminPassword; }
            set { adminPassword = value; }
        }
    }
    
    // Struct that could be a record
    public struct UserInfo
    {
        public string Name;
        public string Email;
        public int Age;
        
        public UserInfo(string name, string email, int age)
        {
            Name = name;
            Email = email;
            Age = age;
        }
    }
    
    // Class without IDisposable implementation
    public class DatabaseConnection
    {
        private System.Data.SqlClient.SqlConnection connection;
        
        public DatabaseConnection(string connectionString)
        {
            connection = new System.Data.SqlClient.SqlConnection(connectionString);
            connection.Open();
        }
        
        // Missing disposal of resources
        public void Close()
        {
            connection.Close();
        }
    }
}