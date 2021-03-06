/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.service;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Message;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.MessageRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author angycastel
 */
@Service
public class MessageService {
     @Autowired
    private MessageRepository messageRepository;
    
    public List<Message> getAll(){
        return messageRepository.getAll();
    }
    
    public Optional<Message> getMessage (int idMessage){
        return messageRepository.getMessage(idMessage);
    }
    
    public Message save(Message message){
        if (message.getIdMessage()==null){
            return messageRepository.save(message);    
        }else{
            Optional <Message> messageaux=messageRepository.getMessage(message.getIdMessage());
            if (messageaux.isEmpty()){
                return messageRepository.save(message); 
            }return message;
        }
    }
    
    public Message update(Message mensaje){
        if (mensaje.getIdMessage()!= null){
            Optional<Message>mensajeaux=messageRepository.getMessage(mensaje.getIdMessage());
            if(!mensajeaux.isEmpty()){
                if(mensaje.getMessageText()!=null){
                    mensajeaux.get().setMessageText(mensaje.getMessageText());
                }
                
                return messageRepository.save(mensajeaux.get());
            }
        }
        return mensaje;
    }
    
    public boolean deleteMessage (int idMessage){
        Optional<Message> mensajeaux=getMessage(idMessage);
        if(!mensajeaux.isEmpty()){
            messageRepository.delete(mensajeaux.get());
            return true;
        }
        return false;
    }
}
