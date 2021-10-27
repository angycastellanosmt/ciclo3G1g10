/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.web;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Message;
import co.edu.usa.programacion.ciclo3.ciclo3.service.MessageService;
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
@RequestMapping("/api/Message")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,RequestMethod.DELETE})
public class MessageController {
    
    @Autowired
    private MessageService messageService;

// Método para obtener todos los mensajes  
    @GetMapping("/all")
    public List<Message> getMensajes(){
        return messageService.getAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Message> getMessage(@PathVariable("id") int idMessage){
        return messageService.getMessage(idMessage);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Message save(@RequestBody Message mensaje){
        return messageService.save(mensaje);
    }
    
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Message update(@RequestBody Message mensaje){
        return messageService.update(mensaje);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteMessage (@PathVariable("id") int idMessage){
        return messageService.deleteMessage(idMessage);
    }
}
