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

	@Query(value = "SELECT * FROM unitsData WHERE propertyId = :propertyId", nativeQuery = true)
	List<Unit> findByPropertyId(@Param("propertyId") Long propertyId);

	@Modifying
	@Query(value = "INSERT INTO unitsData(propertyId, unitNumber, buildingNumber, addressId) VALUES(:propertyId, :unitNumber, :buildingNumber, :addressId)", nativeQuery = true)
	void saveUnits(@Param("propertyId") Long propertyId, @Param("unitNumber") Long unitNumber, 
			@Param("buildingNumber") Long buildingNumber, @Param("addressId") String addressId);
	
	@Modifying
	@Query(value="DELETE FROM unitsData WHERE propertyId = :propertyId AND unitNumber = :unitNumber AND buildingNumber = :buildingNumber", nativeQuery = true)
	void deleteUnit(@Param("unitNumber") Long unitNumber, @Param("buildingNumber") Long buildingNumber, @Param("propertyId") Long propertyId);

	/*@Modifying
	@Query(value = "UPDATE unit SET unitId = :unitId , unitName = :unitName WHERE unitId = :unitIdold", nativeQuery = true)
	void editUnits(@Param("unitIdold") Long unitId_old, @Param("unitId") Long unitId,
			@Param("unitName") String unitName);*/
	
	@Query(value = "SELECT * FROM unitsData WHERE propertyId = :propertyId AND unitNumber = :unitNumber AND buildingNumber = :buildingNumber", nativeQuery = true)
	List<Unit> getExistingUnits(@Param("propertyId") Long propertyId, @Param("unitNumber") Long unitNumber, @Param("buildingNumber") Long buildingNumber);
}
