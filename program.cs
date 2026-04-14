using System;
using MySql.Data.MySqlClient; 

class Program
{
    static void Main()
    {
        // 1. Connection string - replace 'your_root_password' with yours!
        string connString = "server=127.0.0.1;uid=root;pwd=Cyrusrajud123;database=AttendanceDB";

        using (MySqlConnection conn = new MySqlConnection(connString))
        {
            try
            {
                conn.Open();
                Console.WriteLine("--- Database Connected! ---\n");

                // We will ask for 3 students
                for (int i = 0; i < 3; i++)
                {
                    Console.WriteLine($"Student #{i + 1}");
                    Console.Write("Enter Name: ");
                    string name = Console.ReadLine();

                    Console.Write("Enter Department: ");
                    string dept = Console.ReadLine();

                    Console.Write("Enter Student ID: ");
                    string id = Console.ReadLine();

                    // 2. The SQL Command
                    string query = "INSERT INTO students (name, department, student_id) VALUES (@name, @dept, @id)";
                    
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@name", name);
                        cmd.Parameters.AddWithValue("@dept", dept);
                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.ExecuteNonQuery();
                    }

                    Console.WriteLine("Saved to SQL Database!\n");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("DATABASE ERROR: " + ex.Message);
            }
        }

        Console.WriteLine("\nAll done! Check your MySQL Workbench to see the list.");
    }
}using System;

using System.Collections.Generic;



class Program

{

    static void Main()

    {

        List<string> names = new List<string>();

        List<string> depts = new List<string>();

        List<string> ids = new List<string>();



        Console.WriteLine("Simple Attendance System");



        for (int i = 0; i < 3; i++)

        {

            Console.Write("Enter Name: ");

            names.Add(Console.ReadLine());



            Console.Write("Enter Department: ");

            depts.Add(Console.ReadLine());



            Console.Write("Enter Student ID: ");

            ids.Add(Console.ReadLine());



            Console.WriteLine("Attendance Recorded!\n");

        }



        Console.WriteLine("\n--- Attendance List ---");



        for (int i = 0; i < names.Count; i++)

        {

            Console.WriteLine(names[i] + " | " + depts[i] + " | " + ids[i]);

        }

    }

}