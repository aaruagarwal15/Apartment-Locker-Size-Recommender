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
import com.project.model.CarrierDelivery;
import com.project.model.Property;
import com.project.repository.CarrierDeliveryRepository;

@Service
@Transactional
public class CarrierDeliveryService {

	@Autowired
	private CarrierDeliveryRepository carrierDeliveryRepository;

	public List<CarrierCombined> getCombinedData(Long propertyId) {
		return carrierDeliveryRepository.fetchDataInnerJoin(propertyId);
	}

	public void carrierDeliverySave(CarrierDelivery cd) {
		carrierDeliveryRepository.savecarrierDelivery(cd.getPropertyId(), cd.getCarrierId(), cd.getDeliveryDay(), cd.getDelivery_time());
	}

	public List<CarrierCombined> getEntryData(Long propertyId, Long carrierId) {
		return carrierDeliveryRepository.fetchEntry(propertyId, carrierId);
	}

	public List<CarrierDelivery> carrierDeliveryCheck(Long carrierId, Long propertyId) {
		return carrierDeliveryRepository.checkEntry(propertyId, carrierId);
	}

	public void delete(Long carrierId, Long propertyId) {
		carrierDeliveryRepository.deleteCarrier(propertyId, carrierId);
	}

	public List<String> checkforcarrier(Long carrierId, Long propertyId) {
		return carrierDeliveryRepository.checkforCarrier(propertyId, carrierId);
	}
}
