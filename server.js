const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MySQL (USE YOUR REAL WORKBENCH PASSWORD!)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Cyrusrajud123', 
    database: 'AttendanceDB'
});

db.connect(err => {
    if (err) console.log("Database Connection Error: ", err);
    else console.log("MySQL Connected!");
});

// 2. The Bridge: Receiving data from your Website
app.post('/save', (req, res) => {
    const { name, department, student_id } = req.body;
    const query = "INSERT INTO students (name, department, student_id) VALUES (?, ?, ?)";
    
    db.query(query, [name, department, student_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Attendance Saved Successfully!" });
    });
});

// 3. The "Admin Panel" Bridge: Sending data BACK to the website
app.get('/list', (req, res) => {
    db.query("SELECT * FROM students", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));