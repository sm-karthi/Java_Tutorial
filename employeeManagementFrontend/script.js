const url = "http://localhost:8080/employee";
        let selectedEmployeeId = null;

        document.getElementById("employeeForm").addEventListener("submit", async function(event) {
            event.preventDefault();
            if (!validateForm()) return;

            let name = document.getElementById("employeeName").value.trim();
            let age = Number(document.getElementById("employeeAge").value.trim());
            let salary = Number(document.getElementById("employeeSalary").value.trim());
            let city = document.getElementById("employeeCity").value.trim();

            let employeeData = { name, age, salary, city };

            try {
                let response = await fetch(url + "/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(employeeData),
                });

                if (response.ok) {
                    alert("Employee added successfully!");
                    document.getElementById("employeeForm").reset();
                    fetchEmployees();
                } else {
                    alert("Error adding employee!");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });

        function validateForm() {
            let isValid = true;
            let name = document.getElementById("employeeName").value.trim();
            let age = document.getElementById("employeeAge").value.trim();
            let salary = document.getElementById("employeeSalary").value.trim();
            let city = document.getElementById("employeeCity").value.trim();

            let ageValue = Number(age);
            let salaryValue = Number(salary);

            document.getElementById("nameError").textContent = "";
            document.getElementById("ageError").textContent = "";
            document.getElementById("salaryError").textContent = "";
            document.getElementById("cityError").textContent = "";

            if (name === "") {
                document.getElementById("nameError").textContent = "Name is required.";
                isValid = false;
            } else if (name.length < 3) {
                document.getElementById("nameError").textContent = "Name must be at least 3 characters.";
                isValid = false;
            }

            if (age === "") {
                document.getElementById("ageError").textContent = "Age is required.";
                isValid = false;
            } else if (isNaN(ageValue) || ageValue < 18 || ageValue > 65) {
                document.getElementById("ageError").textContent = "Age must be between 18 and 65.";
                isValid = false;
            }

            if (salary === "") {
                document.getElementById("salaryError").textContent = "Salary is required.";
                isValid = false;
            } else if (isNaN(salaryValue) || salaryValue < 10000) {
                document.getElementById("salaryError").textContent = "Salary must be greater than 10,000.";
                isValid = false;
            }

            if (city === "") {
                document.getElementById("cityError").textContent = "City is required.";
                isValid = false;
            }

            return isValid;
        }

        async function fetchEmployees() {
            try {
                let response = await fetch(url + "/list");
                let employees = await response.json();

                let tableBody = document.getElementById("employeeTable");
                tableBody.innerHTML = "";

                employees.forEach(emp => {
                    let row = `
                        <tr>
                            <td>${emp.id}</td>
                            <td>${emp.name}</td>
                            <td>${emp.age}</td>
                            <td>${emp.salary}</td>
                            <td>${emp.city}</td>
                            <td>
                                <button class="btn-update" onclick="prepareUpdateEmployee(${emp.id}, '${emp.name}', ${emp.age}, ${emp.salary}, '${emp.city}')">Update</button>
                                <button class="btn-delete" onclick="deleteEmployee(${emp.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                    tableBody.innerHTML += row;
                });
            } catch (error) {
                console.error("Error:", error);
            }
        }

        async function deleteEmployee(id) {
            if (confirm("Are you sure you want to delete this employee?")) {
                try {
                    let response = await fetch(url + "/" + id, {
                         method: "DELETE"
                     });

                    if (response.ok) {
                        alert("Employee deleted successfully!");
                        fetchEmployees();
                    } else {
                        alert("Error deleting employee!");
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        }

        function prepareUpdateEmployee(id, name, age, salary, city) {
            selectedEmployeeId = id;
            document.getElementById("employeeId").value = id;
            document.getElementById("employeeName").value = name;
            document.getElementById("employeeAge").value = age;
            document.getElementById("employeeSalary").value = salary;
            document.getElementById("employeeCity").value = city;

            document.getElementById("submitBtn").style.display = "none";
            document.getElementById("updateBtn").style.display = "block";
        }

        document.getElementById("updateBtn").addEventListener("click", async function() {
            if (!validateForm()) return;

            let updatedEmployee = {
                name: document.getElementById("employeeName").value.trim(),
                age: Number(document.getElementById("employeeAge").value.trim()),
                salary: Number(document.getElementById("employeeSalary").value.trim()),
                city: document.getElementById("employeeCity").value.trim()
            };

            try {
                let response = await fetch(url + "/" + selectedEmployeeId, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedEmployee),
                });

                if (response.ok) {
                    alert("Employee updated successfully!");
                    document.getElementById("employeeForm").reset();
                    document.getElementById("submitBtn").style.display = "block";
                    document.getElementById("updateBtn").style.display = "none";
                    selectedEmployeeId = null;
                    fetchEmployees();
                } else {
                    alert("Error updating employee!");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });

        window.onload = fetchEmployees;