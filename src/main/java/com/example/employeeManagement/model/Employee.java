package com.example.employeeManagement.model;


import jakarta.persistence.*;

@Entity
@Table(name = "employees2")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int age;
    private double salary;
    private String city;

    // Constructors
    public Employee() {}

    public Employee(String name, int age, double salary, String city) {
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.city = city;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public double getSalary() { return salary; }
    public void setSalary(double salary) { this.salary = salary; }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
