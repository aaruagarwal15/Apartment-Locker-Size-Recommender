package com.project.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.project.model.Property;

public interface PropertyRepository extends JpaRepository<Property, Long>{
	
	//List<Property> findByStatus(String status);

}
