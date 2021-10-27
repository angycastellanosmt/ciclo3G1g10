/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.web;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Score;
import co.edu.usa.programacion.ciclo3.ciclo3.service.ScoreService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
@RequestMapping("/api/Score")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,RequestMethod.DELETE})
public class ScoreController {
 
    
    @Autowired
    private ScoreService scoreService;

// Método para obtener todas las calificaciones
    @GetMapping("/all")
    public List<Score> getScores(){
        return scoreService.getAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Score> getScore(@PathVariable("id") int idScore){
        return scoreService.getScore(idScore);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Score save(@RequestBody Score score){
        return scoreService.save(score);
    }
    
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Score update(@RequestBody Score score){
        return scoreService.update(score);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteScore (@PathVariable("id") int idScore){
        return scoreService.deleteScore(idScore);
    }
}
