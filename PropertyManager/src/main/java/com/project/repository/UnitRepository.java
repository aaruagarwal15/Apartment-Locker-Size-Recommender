package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.model.Unit;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {
	
	@Query(value = "SELECT * FROM unit WHERE p_id = :p_id", nativeQuery = true)
	List<Unit> findByP_id(@Param("p_id") Long p_id);
	
	@Modifying
	@Query(value= "INSERT INTO unit VALUES(:p_id, :u_id, :u_name)", nativeQuery = true)
	void saveUnits(@Param("p_id") Long p_id, @Param("u_id") Long u_id, @Param("u_name") String u_name);
	
	@Modifying
	@Query(value= "UPDATE unit SET u_id = :u_id , u_name = :u_name WHERE u_id = :u_id_old", nativeQuery = true)
	void editUnits(@Param("u_id_old") Long u_id_old, @Param("u_id") Long u_id, @Param("u_name") String u_name);

	

}
