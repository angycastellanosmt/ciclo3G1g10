/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.service;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Reservation;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.ReservationRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author angycastel
 */
@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;
    
    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }
    
    public Optional<Reservation> getReservation (int idReservation){
        return reservationRepository.getReservation(idReservation);
    }
    
    public Reservation save(Reservation reserva){
        if (reserva.getIdReservation()==null){
            return reservationRepository.save(reserva);    
        }else{
            Optional <Reservation> reservaux=reservationRepository.getReservation(reserva.getIdReservation());
            if (reservaux.isEmpty()){
                return reservationRepository.save(reserva); 
            }return reserva;
        }
    }
}
