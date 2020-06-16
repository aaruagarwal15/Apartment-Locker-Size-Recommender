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
	private CarrierRepository carrierRepository;

	/*
	 * public List<CarrierCombined> getCombinedData(Long propertyId) { return
	 * crepo.getData(propertyId); }
	 */
	public void carrierSave(Carrier carrier) {
		carrierRepository.saveCarrier(carrier.getId(), carrier.getcarrierName());
	}

	public void deleteCarrier(Long carrierId) {
		carrierRepository.deleteCar(carrierId);
	}
	public List<String> getAllNames(){
		return carrierRepository.allCarrierNames();
	}

}
