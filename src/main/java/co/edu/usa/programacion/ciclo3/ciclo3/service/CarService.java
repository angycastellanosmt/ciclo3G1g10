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
    
    public Optional<Car> getCar (int idCar){
        return carRepository.getCar(idCar);
    }
    
    public Car save(Car carro){
        if (carro.getIdCar()==null){
            return carRepository.save(carro);    
        }else{
            Optional <Car> carroaux=carRepository.getCar(carro.getIdCar());
            if (carroaux.isEmpty()){
                return carRepository.save(carro); 
            }return carro;
        }
    }
    
    public Car update(Car carro){
        if (carro.getIdCar()!= null){
            Optional<Car>carroaux=carRepository.getCar(carro.getIdCar());
            if(!carroaux.isEmpty()){
                if(carro.getName()!=null){
                    carroaux.get().setName(carro.getName());
                }
                if(carro.getBrand()!=null){
                    carroaux.get().setBrand(carro.getBrand());
                }
                if(carro.getYear()!=null){
                    carroaux.get().setYear(carro.getYear());
                }
                if(carro.getDescription()!=null){
                    carroaux.get().setDescription(carro.getDescription());
                }
                return carRepository.save(carroaux.get());
            }
        }
        return carro;
    }
    
    public boolean deleteCar (int idCar){
        Optional<Car> carroaux=getCar(idCar);
        if(!carroaux.isEmpty()){
            carRepository.delete(carroaux.get());
            return true;
        }
        return false;
    }
}
