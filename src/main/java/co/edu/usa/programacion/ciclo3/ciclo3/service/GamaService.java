/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.service;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Gama;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.GamaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author angycastel
 */
@Service
public class GamaService {
    
    @Autowired
    private GamaRepository gamaRepository;
    
    public List<Gama> getAll(){
        return gamaRepository.getAll();
    }
    
    public Optional<Gama> getGama (int idGama){
        return gamaRepository.getGama(idGama);
    }
    
    public Gama save(Gama gama){
        if (gama.getIdGama()==null){
            return gamaRepository.save(gama);    
        }else{
            Optional <Gama> gamaaux=gamaRepository.getGama(gama.getIdGama());
            if (gamaaux.isEmpty()){
                return gamaRepository.save(gama); 
            }return gama;
        }
    }
}
