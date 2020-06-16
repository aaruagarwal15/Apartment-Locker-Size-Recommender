package com.project.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.model.CarrierCombined;
import com.project.model.CarrierDelivery;
import com.project.model.Carrier;

@Repository
public interface CarrierDeliveryRepository extends JpaRepository<CarrierDelivery, Long> {

	@Query("SELECT new com.project.model.CarrierCombined(c.id, c.carrierName, d.deliveryDay, d.deliveryTime) "
			+ "FROM Carrier c INNER JOIN  c.carrierDeliveries d where d.propertyId = :propertyId")
	List<CarrierCombined> fetchDataInnerJoin(@Param("propertyId") Long propertyId);

	@Modifying
	@Query(value = "INSERT INTO carrier_delivery(propertyId, carrierId, deliveryDay, deliveryTime ) VALUES(:propertyId, :carrierId, :deliveryDay, :deliveryTime)", nativeQuery = true)
	void savecarrierDelivery(@Param("propertyId") Long propertyId, @Param("carrierId") Long carrierId,
			@Param("deliveryDay") String deliveryDay, @Param("deliveryTime") String deliveryTime);

	@Query("SELECT new com.project.model.CarrierCombined(c.id, c.carrierName, d.deliveryDay, d.deliveryTime) "
			+ "FROM Carrier c INNER JOIN  c.carrierDeliveries d where d.propertyId = :propertyId and d.carrierId = :carrierId")
	List<CarrierCombined> fetchEntry(@Param("propertyId") Long propertyId, @Param("carrierId") Long carrierId);

	@Query(value = "SELECT * FROM carrier_delivery WHERE propertyId = :propertyId AND carrierId = :carrierId ", nativeQuery = true)
	List<CarrierDelivery> checkEntry(@Param("propertyId") Long propertyId, @Param("carrierId") Long carrierId);

	@Modifying
	@Query(value = "DELETE FROM carrier_delivery WHERE propertyId = :propertyId AND carrierId = :carrierId", nativeQuery = true)
	void deleteCarrier(@Param("propertyId") Long propertyId, @Param("carrierId") Long carrierId);

	@Query(value = "SELECT * FROM carrier_delivery WHERE propertyId <> :propertyId AND carrierId = :carrierId ", nativeQuery = true)
	List<String> checkforCarrier(@Param("propertyId") Long propertyId, @Param("carrierId") Long carrierId);
}
