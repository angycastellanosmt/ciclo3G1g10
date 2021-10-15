/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.repository;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Car;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.crud.CarCrudRepository;
import java.util.Optional;

/**
 *
 * @author angycastel
 */
@Repository
public class CarRepository {
    
    @Autowired
    private CarCrudRepository carCrudRepository;
    
    public List<Car> getAll(){
        return (List<Car>)carCrudRepository.findAll();
    }
    public Optional<Car> getCar(int id){
        return carCrudRepository.findById(id);
    }
    
    public Car save(Car carro){
        return carCrudRepository.save(carro);
    }
}
