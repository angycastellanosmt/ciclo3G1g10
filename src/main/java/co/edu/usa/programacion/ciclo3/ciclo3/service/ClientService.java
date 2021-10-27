/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.service;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Client;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.ClientRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author angycastel
 */
@Service
public class ClientService {
    
    @Autowired
    private ClientRepository clientRepository;
    
    public List<Client> getAll(){
        return clientRepository.getAll();
    }
    
    public Optional<Client> getClient (int idClient){
        return clientRepository.getClient(idClient);
    }
    
    public Client save(Client cliente){
        if (cliente.getIdClient()==null){
            return clientRepository.save(cliente);    
        }else{
            Optional <Client> clienteaux=clientRepository.getClient(cliente.getIdClient());
            if (clienteaux.isEmpty()){
                return clientRepository.save(cliente); 
            }return cliente;
        }
    }
    
    public Client update(Client cliente){
        if (cliente.getIdClient()!= null){
            Optional<Client>clienteaux=clientRepository.getClient(cliente.getIdClient());
            if(!clienteaux.isEmpty()){
                if(cliente.getPassword()!=null){
                    clienteaux.get().setPassword(cliente.getPassword());
                }
                if(cliente.getName()!=null){
                    clienteaux.get().setName(cliente.getName());
                }
                if(cliente.getAge()!=null){
                    clienteaux.get().setAge(cliente.getAge());
                }
               
                return clientRepository.save(clienteaux.get());
            }
        }
        return cliente;
    }
    
    public boolean deleteClient (int idClient){
        Optional<Client> clienteaux=getClient(idClient);
        if(!clienteaux.isEmpty()){
            clientRepository.delete(clienteaux.get());
            return true;
        }
        return false;
    }
}
