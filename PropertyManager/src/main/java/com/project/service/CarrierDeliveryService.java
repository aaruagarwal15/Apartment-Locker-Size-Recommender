package com.project.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.model.CarrierCombined;
import com.project.model.Carrier_delivery;
import com.project.model.Property;
import com.project.repository.CarrierDeliveryRepository;

@Service
@Transactional
public class CarrierDeliveryService {
	
	/*private static EntityManagerFactory entityManagerFactory =
	          Persistence.createEntityManagerFactory("example-unit");*/
	
	@Autowired
	private CarrierDeliveryRepository cdrepo;
	
	
	public List<CarrierCombined> getCombinedData(Long p_id) {
		return cdrepo.fetchDataInnerJoin(p_id);
	}
	public void cd_save(Carrier_delivery cd) {
		cdrepo.savecd(cd.getP_id(), cd.getCar_id(), cd.getDelivery_day(), cd.getDelivery_time());
	}
	 
	public List<CarrierCombined> getEntryData(Long p_id, Long c_id) {
		return cdrepo.fetchEntry(p_id, c_id);
	}

}
