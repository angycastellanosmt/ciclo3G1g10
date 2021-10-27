/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.repository;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Reservation;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.crud.ReservationCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author angycastel
 */
@Repository
public class ReservationRepository {
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;
    
     public List<Reservation> getAll(){
        return (List<Reservation>)reservationCrudRepository.findAll();
     }        
      
     public Optional<Reservation> getReservation(int id){
        return reservationCrudRepository.findById(id);
     }
     
     public Reservation save(Reservation reserva){
        return reservationCrudRepository.save(reserva);
    }
     
      public void delete(Reservation reserva){
        reservationCrudRepository.delete(reserva);
    }
}
