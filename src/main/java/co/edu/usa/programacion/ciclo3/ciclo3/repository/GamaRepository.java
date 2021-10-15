/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.repository;


import co.edu.usa.programacion.ciclo3.ciclo3.model.Gama;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.crud.GamaCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author angycastel
 */
@Repository
public class GamaRepository {
    
    @Autowired
    private GamaCrudRepository gamaCrudRepository;
    
     public List<Gama> getAll(){
        return (List<Gama>)gamaCrudRepository.findAll();
     }        
      
     public Optional<Gama> getGama(int id){
        return gamaCrudRepository.findById(id);
     }
     
     public Gama save(Gama gama){
        return gamaCrudRepository.save(gama);
    }
    
}
