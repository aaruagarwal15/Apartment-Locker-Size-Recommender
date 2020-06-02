package com.project.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.model.CarrierCombined;
import com.project.model.Carrier_delivery;
import com.project.model.Carrier;


@Repository
public interface CarrierDeliveryRepository extends JpaRepository<Carrier_delivery, Long> {
	
	
	@Query("SELECT new com.project.model.CarrierCombined(c.id, c.c_name, d.delivery_day, d.delivery_time) "
			+ "FROM Carrier c INNER JOIN  c.carrier_deliveries d where d.p_id = :p_id")
	List<CarrierCombined> fetchDataInnerJoin(@Param("p_id") Long p_id);

	@Modifying
	@Query(value= "INSERT INTO carrier_delivery(p_id, car_id, delivery_day, delivery_time ) VALUES(:p_id, :car_id, :delivery_day, :delivery_time)", nativeQuery = true)
	void savecd(@Param("p_id") Long p_id, @Param("car_id") Long car_id, @Param("delivery_day") String delivery_day, 
			@Param("delivery_time")String delivery_time);
	
	@Query("SELECT new com.project.model.CarrierCombined(c.id, c.c_name, d.delivery_day, d.delivery_time) "
			+ "FROM Carrier c INNER JOIN  c.carrier_deliveries d where d.p_id = :p_id and d.car_id = :c_id")
	List<CarrierCombined> fetchEntry(@Param("p_id") Long p_id, @Param("c_id") Long c_id);
	
	@Query(value="SELECT * FROM carrier_delivery WHERE p_id = :p_id AND car_id = :c_id ", nativeQuery = true)
	List<Carrier_delivery> checkEntry(@Param("p_id") Long p_id, @Param("c_id") Long c_id);
	
	@Modifying
	@Query(value="DELETE FROM carrier_delivery WHERE p_id = :p_id AND car_id = :c_id", nativeQuery = true)
	void deleteCarrier(@Param("p_id") Long p_id, @Param("c_id") Long c_id);
	
	@Query(value="SELECT * FROM carrier_delivery WHERE p_id <> :p_id AND car_id = :c_id ", nativeQuery = true)
	List<String> checkforC(@Param("p_id") Long p_id, @Param("c_id") Long c_id);
}
