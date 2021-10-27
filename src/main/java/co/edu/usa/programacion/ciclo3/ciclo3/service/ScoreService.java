/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.service;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Score;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.ScoreRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author angycastel
 */
@Service
public class ScoreService {
     @Autowired
    private ScoreRepository scoreRepository;
    
    public List<Score> getAll(){
        return scoreRepository.getAll();
    }
    
    public Optional<Score> getScore (int idScore){
        return scoreRepository.getScore(idScore);
    }
    
    public Score save(Score score){
        if (score.getIdScore()==null){
            return scoreRepository.save(score);    
        }else{
            Optional <Score> scoreaux=scoreRepository.getScore(score.getIdScore());
            if (scoreaux.isEmpty()){
                return scoreRepository.save(score); 
            }return score;
        }
    }
   
    public Score update(Score score){
        if (score.getIdScore()!= null){
            Optional<Score>scoreaux=scoreRepository.getScore(score.getIdScore());
            if(!scoreaux.isEmpty()){
                if(score.getScore()!=null){
                    scoreaux.get().setScore(score.getScore());
                }
                if(score.getMessage()!=null){
                    scoreaux.get().setMessage(score.getMessage());
                }
                
                return scoreRepository.save(scoreaux.get());
            }
        }
        return score;
    }
    
    public boolean deleteScore (int idScore){
        Optional<Score> scoreaux=getScore(idScore);
        if(!scoreaux.isEmpty()){
            scoreRepository.delete(scoreaux.get());
            return true;
        }
        return false;
    }
    
}
