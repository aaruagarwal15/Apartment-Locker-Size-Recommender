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
	@Query(value = "INSERT INTO carrier VALUES(:carrierId, :carrierName)", nativeQuery = true)
	void saveCarrier(@Param("carrierId") Long carrierId, @Param("carrierName") String carrierName);

	@Modifying
	@Query(value = "DELETE from carrier WHERE id = :carrierId", nativeQuery = true)
	void deleteCar(@Param("carrierId") Long carrierId);

	@Query(value = "SELECT carrierName, id FROM carrier", nativeQuery = true)
	List<String> allCarrierNames();

}
