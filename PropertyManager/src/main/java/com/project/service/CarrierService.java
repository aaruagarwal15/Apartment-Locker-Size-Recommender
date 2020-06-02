package com.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.model.Carrier;
import com.project.model.CarrierCombined;
import com.project.repository.CarrierRepository;

@Service
@Transactional
public class CarrierService {
	
	@Autowired
	private CarrierRepository crepo;
	
	/*public List<CarrierCombined> getCombinedData(Long p_id) {
		return crepo.getData(p_id);
    }*/
	public void carrier_save(Carrier carrier) {
		crepo.saveCarrier(carrier.getId(), carrier.getC_name());
	}
	
	public void deleteCarrier(Long c_id) {
		crepo.deleteCar(c_id);
	}
	

}
