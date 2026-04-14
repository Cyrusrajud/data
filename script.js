// --- NEW: Run this automatically when the page opens ---
window.onload = loadData;

async function loadData() {
    try {
        // This calls the app.get('/list') in your server.js
        const response = await fetch('http://localhost:3000/list');
        const data = await response.json();

        let table = document.getElementById("table");
        
        // Keep the header, clear the old rows
        table.innerHTML = `<tr><th>Name</th><th>Department</th><th>Student ID</th></tr>`;

        // Fill the table with the names from MySQL
        data.forEach(student => {
            let row = table.insertRow();
            row.insertCell(0).innerText = student.name;
            row.insertCell(1).innerText = student.department;
            row.insertCell(2).innerText = student.student_id;
        });
    } catch (error) {
        console.log("Database connection error or table empty.");
    }
}

async function submitData() {
    let name = document.getElementById("name").value;
    let dept = document.getElementById("dept").value;
    let id = document.getElementById("id").value;
    let message = document.getElementById("message");

    if (name === "" || dept === "" || id === "") {
        message.innerText = "Please fill all fields!";
        message.style.color = "red";
        return;
    }

    try {
        // This calls the app.post('/save') in your server.js
        const response = await fetch('http://localhost:3000/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, department: dept, student_id: id })
        });

        const result = await response.json();
        message.innerText = "Attendance recorded successfully!";
        message.style.color = "green";

        // IMPORTANT: Refresh the table immediately after saving
        loadData(); 

    } catch (error) {
        message.innerText = "Error: Could not connect to server.";
        message.style.color = "red";
    }

    // Clear inputs
    document.getElementById("name").value = "";
    document.getElementById("dept").value = "";
    document.getElementById("id").value = "";
}