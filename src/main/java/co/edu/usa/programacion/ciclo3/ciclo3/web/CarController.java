/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.web;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Car;
import co.edu.usa.programacion.ciclo3.ciclo3.service.CarService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author angycastel
 */
@RestController
@RequestMapping("/api/Car")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,RequestMethod.DELETE})
public class CarController {
    
    @Autowired
    private CarService carService;

// Método para obtener todos los carros   
    @GetMapping("/all")
    public List<Car> getCars(){
        return carService.getAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Car> getCar(@PathVariable("id") int id){
        return carService.getCar(id);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Car save(@RequestBody Car carro){
        return carService.save(carro);
    }
}
