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

	@Query(value = "SELECT * FROM unit WHERE propertyId = :propertyId", nativeQuery = true)
	List<Unit> findByPropertyId(@Param("propertyId") Long propertyId);

	@Modifying
	@Query(value = "INSERT INTO unit VALUES(:propertyId, :unitId, :unitName)", nativeQuery = true)
	void saveUnits(@Param("propertyId") Long propertyId, @Param("unitId") Long unitId,
			@Param("unitName") String unitName);

	@Modifying
	@Query(value = "UPDATE unit SET unitId = :unitId , unitName = :unitName WHERE unitId = :unitIdold", nativeQuery = true)
	void editUnits(@Param("unitIdold") Long unitId_old, @Param("unitId") Long unitId,
			@Param("unitName") String unitName);

}
