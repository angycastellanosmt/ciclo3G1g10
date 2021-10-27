/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.repository;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Client;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.crud.ClientCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author angycastel
 */
@Repository
public class ClientRepository {
    @Autowired
    private ClientCrudRepository clientCrudRepository;
    
    public List<Client> getAll(){
        return (List<Client>)clientCrudRepository.findAll();
    }
    public Optional<Client> getClient(int id){
        return clientCrudRepository.findById(id);
    }
    
    public Client save(Client cliente){
        return clientCrudRepository.save(cliente);
    }
    
     public void delete(Client cliente){
        clientCrudRepository.delete(cliente);
    }
}
