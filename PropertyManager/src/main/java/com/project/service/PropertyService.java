package com.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.model.Property;
import com.project.repository.PropertyRepository;

@Service
@Transactional
public class PropertyService {
	 
	@Autowired
    private PropertyRepository repo;
     
    public List<Property> listAll() {
        return repo.findAll();
    }
     
    public void save(Property property) {
        repo.save(property);
    }
     
    public Property get(Long p_id) {
        return repo.findById(p_id).get();
    }
     
    public void delete(long p_id) {
        repo.deleteById(p_id);
    }	
    /*public List<Property> listFiltered(String status){
    	return repo.findByStatus(status);
    }*/

}

