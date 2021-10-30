/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.repository;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Client;
import co.edu.usa.programacion.ciclo3.ciclo3.model.Reservation;
import co.edu.usa.programacion.ciclo3.ciclo3.model.custom.CountClient;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.crud.ReservationCrudRepository;
import java.util.ArrayList;
import java.util.Date;
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
      
      public List<Reservation> getReservationsbyStatus(String status){
          return reservationCrudRepository.findAllByStatus(status);
      }
      
      public List<Reservation> getReservationPeriod(Date dateOne, Date dateTwo){
          return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(dateOne, dateTwo);
      }
      
      public List<CountClient> getTopClients(){
          List<CountClient> res= new ArrayList<>();
          
          List<Object[]> report= reservationCrudRepository.countTotalReservationByClient();
          for(int i=0; i<report.size();i++){
              Client cli=(Client) report.get(i)[0];
              Long cantidad= (Long)report.get(i)[1];
              CountClient cc=new CountClient(cantidad,cli);
              res.add(cc);
              //res.add(new CountClient((Long) report.get(i)[1], (Client) report.get(i)[0]);
          }
          return res;
      }
}
