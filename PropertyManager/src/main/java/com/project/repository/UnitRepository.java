package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.model.Unit;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {
	
	@Query(value = "SELECT * FROM unit u WHERE p_id = :p_id", nativeQuery = true)
	List<Unit> findByP_id(@Param("p_id") Long p_id);

}
