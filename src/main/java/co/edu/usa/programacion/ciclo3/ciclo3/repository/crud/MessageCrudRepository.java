/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.repository.crud;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Message;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author angycastel
 */
public interface MessageCrudRepository extends CrudRepository<Message, Integer>{
    
}
