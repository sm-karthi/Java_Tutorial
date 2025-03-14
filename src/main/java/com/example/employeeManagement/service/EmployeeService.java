package com.example.employeeManagement.service;

import com.example.employeeManagement.model.Employee;
import java.util.List;

public interface EmployeeService {

    Employee saveEmployee(Employee employee);
    List<Employee> getAllEmployee();
    Employee getEmployeeId(Long id);
    Employee updateEmployee(Long id, Employee employee);
    void deleteEmployee(Long id);

}
