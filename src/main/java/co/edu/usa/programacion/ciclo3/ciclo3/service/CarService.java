/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.service;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Car;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.CarRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author angycastel
 */
@Service
public class CarService {
    
    @Autowired
    private CarRepository carRepository;
    
    public List<Car> getAll(){
        return carRepository.getAll();
    }
    
    public Optional<Car> getCar (int id){
        return carRepository.getCar(id);
    }
    
    public Car save(Car carro){
        if (carro.getId()==null){
            return carRepository.save(carro);    
        }else{
            Optional <Car> carroaux=carRepository.getCar(carro.getId());
            if (carroaux.isEmpty()){
                return carRepository.save(carro); 
            }return carro;
        }
    }
}
