/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.repository;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Score;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.crud.ScoreCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author angycastel
 */
@Repository
public class ScoreRepository {
    
    @Autowired
    private ScoreCrudRepository scoreCrudRepository;
    
     public List<Score> getAll(){
        return (List<Score>)scoreCrudRepository.findAll();
     }        
      
     public Optional<Score> getScore(int id){
        return scoreCrudRepository.findById(id);
     }
     
     public Score save(Score score){
        return scoreCrudRepository.save(score);
    }
    
}
