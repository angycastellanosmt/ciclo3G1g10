/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.repository;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Message;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.crud.MessageCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author angycastel
 */
@Repository
public class MessageRepository {
    
    @Autowired
    private MessageCrudRepository messageCrudRepository;
    
     public List<Message> getAll(){
        return (List<Message>)messageCrudRepository.findAll();
     }        
      
     public Optional<Message> getMessage(int id){
        return messageCrudRepository.findById(id);
     }
     
     public Message save(Message mensaje){
        return messageCrudRepository.save(mensaje);
    }
    
}
