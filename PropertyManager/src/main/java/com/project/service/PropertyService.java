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
    private PropertyRepository propertyRepository;

    public List<Property> listAll() {
        return propertyRepository.findAll();
    }

    public void save(Property property) {
    	propertyRepository.save(property);
    }

    public Property getProperty(Long propertyId) {
        return propertyRepository.findById(propertyId).get();
    }

    public void delete(long propertyId) {
    	propertyRepository.deleteById(propertyId);
    }
    /*
     * public List<Property> listFiltered(String status){ return
     * repo.findByStatus(status); }
     */

}
