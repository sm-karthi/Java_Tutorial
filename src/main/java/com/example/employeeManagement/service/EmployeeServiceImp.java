package com.example.employeeManagement.service;

import com.example.employeeManagement.exception.EmployeeNotFoundException;
import com.example.employeeManagement.model.Employee;
import com.example.employeeManagement.repository.EmployeeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Service
public class EmployeeServiceImp implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImp(EmployeeRepository employeeRepository){
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee saveEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }



    @Override
    public Employee getEmployeeId(Long id){
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));
    }


    @Transactional
    @Override
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee employee = getEmployeeId(id);
        employee.setName(updatedEmployee.getName());
        employee.setAge(updatedEmployee.getAge());
        employee.setSalary(updatedEmployee.getSalary());
        employee.setCity(updatedEmployee.getCity());
        return employeeRepository.save(employee);
    }

    @Transactional
    @Override
    public void deleteEmployee(Long id){
        Employee employee = getEmployeeId(id);
        employeeRepository.delete(employee);
    }


}
