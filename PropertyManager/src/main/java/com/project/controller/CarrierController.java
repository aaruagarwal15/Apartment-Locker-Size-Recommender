package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.project.model.Carrier;
import com.project.model.CarrierCombined;
import com.project.model.CarrierDelivery;
import com.project.service.CarrierDeliveryService;
import com.project.service.CarrierService;

@Controller
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class CarrierController {
	
	@Autowired
	private CarrierService carrierService;

	@Autowired
	private CarrierDeliveryService carrierDeliveryService;
	
	@RequestMapping(value = "/fetchCarrier", method = RequestMethod.GET)
	@ResponseBody
	public String fetch_carrier(@RequestParam("PropertyId") String propertyId) {

		try {
			List<CarrierCombined> carrierCombined = carrierDeliveryService.getCombinedData(Long.parseLong(propertyId));
			String gson = new Gson().toJson(carrierCombined);
			System.out.println(gson);
			return gson;
		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}
	}

	@RequestMapping(value = "/saveCarrier", method = RequestMethod.POST)
	@ResponseBody
	public String saveCarrier(@RequestParam("PropertyId") String propertyId,
			@RequestParam("CarrierId") String carrierId, @RequestParam("CarrierName") String carrierName,
			@RequestParam("Days") String[] days, @RequestParam("Time") String[] time) {
		try {
			Carrier carrier = new Carrier();
			carrier.setId(Long.parseLong(carrierId));
			carrier.setcarrierName(carrierName);
			try {
				carrierService.carrierSave(carrier);
			} catch (Exception e) {
				System.out.println(e);
				System.out.println("Entry already exists");
			}
			List<CarrierDelivery> carrierDelivery = carrierDeliveryService.carrierDeliveryCheck(Long.parseLong(carrierId),
					Long.parseLong(propertyId));
			if (carrierDelivery.isEmpty()) {
				for (int i = 0; i < days.length; i++) {
					CarrierDelivery newCarrierDelivery = new CarrierDelivery();
					newCarrierDelivery.setPropertyId(Long.parseLong(propertyId));
					newCarrierDelivery.setCarrierId(Long.parseLong(carrierId));
					newCarrierDelivery.setDeliveryDay(days[i]);
					newCarrierDelivery.setDelivery_time(time[i]);

					carrierDeliveryService.carrierDeliverySave(newCarrierDelivery);
				}
				System.out.println("CARRIER ADDED");
				List<CarrierCombined> carrierCombined = carrierDeliveryService.getEntryData(Long.parseLong(propertyId),
						Long.parseLong(carrierId));
				String gson = new Gson().toJson(carrierCombined);
				return gson;
			} else {
				System.out.println("Carrier Already Exists");
				return "FAILED";
			}

		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}

	}

	@RequestMapping(value = "/deleteCarrier", method = RequestMethod.DELETE)
	@ResponseBody
	public String deleteCarrierData(@RequestParam("PropertyId") String propertyId,
			@RequestParam("CarrierId") String carrierId) {
		String result;
		try {
			carrierDeliveryService.delete(Long.parseLong(carrierId), Long.parseLong(propertyId));
			List<String> checkInCarrier = carrierDeliveryService.checkforcarrier(Long.parseLong(carrierId),
					Long.parseLong(propertyId));
			if (checkInCarrier.isEmpty()) {
				carrierService.deleteCarrier(Long.parseLong(carrierId));
			}
			System.out.println("SUCCESS");
			result = "SUCCESS";
		} catch (Exception e) {
			System.out.println(e);
			result = "Error";
		}
		return result;

	}

	@RequestMapping(value = "/editCarrier", method = RequestMethod.POST)
	@ResponseBody
	public String editCarrier(@RequestParam("PropertyId") String propertyId,
			@RequestParam("CarrierId") String carrierId, @RequestParam("Days") String[] days,
			@RequestParam("Time") String[] time) {
		try {
			carrierDeliveryService.delete(Long.parseLong(carrierId), Long.parseLong(propertyId));
			for (int i = 0; i < days.length; i++) {
				CarrierDelivery cd = new CarrierDelivery();
				cd.setPropertyId(Long.parseLong(propertyId));
				cd.setCarrierId(Long.parseLong(carrierId));
				cd.setDeliveryDay(days[i]);
				cd.setDelivery_time(time[i]);

				carrierDeliveryService.carrierDeliverySave(cd);
			}
			List<CarrierCombined> carrierCombined = carrierDeliveryService.getCombinedData(Long.parseLong(propertyId));
			String gson = new Gson().toJson(carrierCombined);
			return gson;

		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}

	}
	@RequestMapping(value = "/allCarrier", method = RequestMethod.GET)
	@ResponseBody
	public String allCarrier() {
		try {
			List<String> carrierNames = carrierService.getAllNames();
			String gson = new Gson().toJson(carrierNames);
			return gson;
		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}

	}
	

}
