/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.service;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Reservation;
import co.edu.usa.programacion.ciclo3.ciclo3.model.custom.CountClient;
import co.edu.usa.programacion.ciclo3.ciclo3.model.custom.StatusAmount;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.ReservationRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
    /**
     * objeto reservación inicializado con autowired
     */
    @Autowired
    private ReservationRepository reservationRepository;
    
    /**
     * Método para generar una lista de todas las reservaciones
     * @return una lista de todas las reservaciones
     */
    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }
    
    /**
     * Método para obtener una reserva por el identificador
     * @param idReservation
     * @return un objeto reservation
     */
    public Optional<Reservation> getReservation (int idReservation){
        return reservationRepository.getReservation(idReservation);
    }
    
    /**
     *  Metodo para guardar una nueva reserva
     * @param reserva
     * @return un objeto reserva guardado
     */
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
    
    /**
     * Método para actualizar una reserva existente
     * @param reserva
     * @return un objeto reserva actualizado
     */
    public Reservation update(Reservation reserva){
        if (reserva.getIdReservation()!= null){
            Optional<Reservation>reservaux=reservationRepository.getReservation(reserva.getIdReservation());
            if(!reservaux.isEmpty()){
                if(reserva.getStartDate()!=null){
                    reservaux.get().setStartDate(reserva.getStartDate());
                }
                if(reserva.getDevolutionDate()!=null){
                    reservaux.get().setDevolutionDate(reserva.getDevolutionDate());
                }
                if(reserva.getStatus()!=null){
                    reservaux.get().setStatus(reserva.getStatus());
                }
                
                return reservationRepository.save(reservaux.get());
            }
        }
        return reserva;
    }
    
    /**
     * Método para borrar una reserva
     * @param idReservation
     * @return reserva borrada
     */
    public boolean deleteReservation (int idReservation){
        Optional<Reservation> reservaux=getReservation(idReservation);
        if(!reservaux.isEmpty()){
            reservationRepository.delete(reservaux.get());
            return true;
        }
        return false;
    }
    
    /**
     * Método para saber cuales son los mejores clientes
     * @return una lista con los clientes que más reservas tienen
     */
    public List<CountClient> getTopClients(){
        return reservationRepository.getTopClients();
    }
    
    /**
     * Método para conocer el número de reservas completas y canceladas
     * @return dos números correspondientes a las reservas completas y canceladas
     */
    public StatusAmount getStatusReport(){
    List<Reservation> completed=reservationRepository.getReservationsbyStatus("completed");
    List<Reservation> cancelled=reservationRepository.getReservationsbyStatus("cancelled");
    StatusAmount statAmt= new StatusAmount(completed.size(), cancelled.size());
    return statAmt;
}

    /**
     * Método para establecer la cantidad de reservas hechas en un periodo determinado
     * @param d1: fecha inicial
     * @param d2: fecha final
     * @return cantidad de r4eservas hechas en un tiempo determinado, dadas fecha inicial y final
     */
    public List<Reservation> getReservationPeriod(String d1, String d2){
        //yyyy-MM-dd
        SimpleDateFormat parser=new SimpleDateFormat("yyyy-MM-dd");
        Date dateOne=new Date();
        Date dateTwo=new Date();
        
        try{
           dateOne=parser.parse(d1);
           dateTwo=parser.parse(d2);
        } catch (ParseException e){
                    e.printStackTrace();
        }
        if (dateOne.before(dateTwo)){
            return reservationRepository.getReservationPeriod(dateOne, dateTwo);
        }else{
            return new ArrayList<>();
        }
    }
}
