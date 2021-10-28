/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.programacion.ciclo3.ciclo3.service;

import co.edu.usa.programacion.ciclo3.ciclo3.model.Admin;
import co.edu.usa.programacion.ciclo3.ciclo3.repository.AdminRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author angycastel
 */
@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    public List<Admin> getAll(){
        return adminRepository.getAll();
    }
    
    public Optional<Admin> getAdmin (int idAdmin){
        return adminRepository.getAdmin(idAdmin);
    }
    
    public Admin save(Admin admin){
        if (admin.getIdAdmin()==null){
            return adminRepository.save(admin);    
        }else{
            Optional <Admin> adminaux=adminRepository.getAdmin(admin.getIdAdmin());
            if (adminaux.isEmpty()){
                return adminRepository.save(admin); 
            }return admin;
        }
    }
    
    public Admin update(Admin admin){
        if (admin.getIdAdmin()!= null){
            Optional<Admin>adminaux=adminRepository.getAdmin(admin.getIdAdmin());
            if(!adminaux.isEmpty()){
                if(admin.getName()!=null){
                    adminaux.get().setName(admin.getName());
                }
                if(admin.getEmail()!=null){
                    adminaux.get().setEmail(admin.getEmail());
                }
                if(admin.getPassword()!=null){
                    adminaux.get().setPassword(admin.getPassword());
                }
                
                return adminRepository.save(adminaux.get());
            }
        }
        return admin;
    }
    
    public boolean deleteAdmin (int idAdmin){
        Optional<Admin> adminaux=getAdmin(idAdmin);
        if(!adminaux.isEmpty()){
            adminRepository.delete(adminaux.get());
            return true;
        }
        return false;
    }
    
}
