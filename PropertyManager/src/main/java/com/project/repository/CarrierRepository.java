package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.model.Carrier;
import com.project.model.CarrierCombined;

@Repository
public interface CarrierRepository extends JpaRepository<Carrier, Long> {
	
	
	@Modifying
	@Query(value= "INSERT INTO carrier VALUES(:c_id, :c_name)", nativeQuery = true)
	void saveCarrier(@Param("c_id") Long c_id, @Param("c_name") String c_name);
	

}
