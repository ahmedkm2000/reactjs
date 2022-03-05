package com.example.crudapp.controller;

import com.example.crudapp.model.Employee;
import com.example.crudapp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;
    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }
    @PostMapping("/employees")
    public Employee addEmployee(@RequestBody Employee employee){
        return  employeeRepository.save(employee);
    }
    @GetMapping("employees/{id}")
    public Optional<Employee> getEmployee(@PathVariable long id){
        return employeeRepository.findById(id);
    }
    @PutMapping("employees/{id}")
    public Employee updateEmployee(@PathVariable long id,@RequestBody Employee employee) throws Exception {
        Employee employeeUpdated = employeeRepository.findById(id).orElseThrow(()-> new Exception("Employee doesn't exist"));
        employeeUpdated.setFirstName(employee.getFirstName());
        employeeUpdated.setLastName(employee.getLastName());
        employeeUpdated.setEmail(employee.getEmail());
        employeeUpdated.setStatus(employee.getStatus());
        return employeeRepository.save(employeeUpdated);

    }
    @DeleteMapping("employees/{id}")
    public void deleteEmployee(@PathVariable long id){
       employeeRepository.deleteById(id);
    }

}
