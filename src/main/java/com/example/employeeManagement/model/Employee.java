package com.example.employeeManagement.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employees2")  // Correct table name format
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)  // Ensures 'name' is not null in DB
    private String name;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private double salary;

    @Column(nullable = false)
    private String city;

    public Employee() {
    }

    public Employee(String name, int age, double salary, String city) {
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.city = city;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
