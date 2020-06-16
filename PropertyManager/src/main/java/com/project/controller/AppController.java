package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.project.model.Carrier;
import com.project.model.CarrierCombined;
import com.project.model.CarrierDelivery;
import com.project.model.Property;
import com.project.model.Unit;
import com.project.service.CarrierDeliveryService;
import com.project.service.CarrierService;
import com.project.service.PropertyService;
import com.project.service.UnitService;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Controller
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class AppController {
	@Autowired
	private PropertyService propertyService;

	@Autowired
	private UnitService unitService;

	@Autowired
	private CarrierService carrierService;

	@Autowired
	private CarrierDeliveryService carrierDeliveryService;

	/* ================= PROPERTY API's =============================== */

	@RequestMapping(value = "/getallProperty", method = RequestMethod.GET)
	@ResponseBody
	public String getAllData() {
		try {
			List<Property> listProperty = propertyService.listAll();
			String gson = new Gson().toJson(listProperty);
			System.out.println(gson);
			return gson;
		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}

	}

	@RequestMapping(value = "/saveProperty", method = RequestMethod.POST)
	@ResponseBody
	public String saveProperty(@RequestParam("PropertyName") String propertyName,
			@RequestParam("PropertyAddress") String propertyAddress) {
		try {
			Property property = new Property();
			property.setPropertyName(propertyName);
			property.setPropertyAddress(propertyAddress);

			propertyService.save(property);
			System.out.println("PROPERTY ADDED");
			String gson = new Gson().toJson(propertyService.listAll());
			return gson;
		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}

	}

	public class NameSorter1 implements Comparator<Property> {
		public int compare(Property o1, Property o2) {
			return o1.getPropertyName().compareToIgnoreCase(o2.getPropertyName());
		}
	}

	@RequestMapping(value = "/increasingFilter", method = RequestMethod.GET)
	@ResponseBody
	public String increasingFilter() {
		try {
			List<Property> filterProperty = propertyService.listAll();
			filterProperty.sort(new NameSorter1());
			String gson = new Gson().toJson(filterProperty);
			System.out.println("FILTERED");
			System.out.println(gson);
			return gson;
		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}

	}

	public class NameSorter implements Comparator<Property> {
		public int compare(Property o1, Property o2) {
			return o2.getPropertyName().compareToIgnoreCase(o1.getPropertyName());
		}
	}

	@RequestMapping(value = "/decreasingFilter", method = RequestMethod.GET)
	@ResponseBody
	public String decreasingFilter() {
		try {

			List<Property> filterProperty = propertyService.listAll();
			filterProperty.sort(new NameSorter());
			String gson = new Gson().toJson(filterProperty);
			System.out.println("FILTERED");
			System.out.println(gson);
			return gson;
		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}
	}

	@RequestMapping(value = "/fetchPropertyDetails", method = RequestMethod.GET)
	@ResponseBody
	public String fetch_details(@RequestParam("propertyId") String propertyId) {

		try {
			Property property = propertyService.getProperty(Long.parseLong(propertyId));
			String gson = new Gson().toJson(property);
			return gson;
		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}
	}

	/* ===================== UNITS API's ====================== */

	@RequestMapping(value = "/getallunits", method = RequestMethod.GET)
	@ResponseBody
	public String getAllUnitsData(@RequestParam("propertyId") String propertyId) {

		try {
			List<Unit> listUnit = unitService.getUnits(Long.parseLong(propertyId));
			String gson = new Gson().toJson(listUnit);
			System.out.println(gson);
			return gson;
		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}
	}

	@RequestMapping(value = "/deleteUnit", method = RequestMethod.DELETE)
	@ResponseBody
	public String deleteUnitsData(@RequestParam("unitId") String unitId) {
		String result;
		try {
			unitService.delete(Long.parseLong(unitId));
			result = "SUCCESS";
		} catch (Exception e) {
			System.out.println(e);
			result = "Error";
		}
		return result;

	}

	@RequestMapping(value = "/saveUnit", method = RequestMethod.POST)
	@ResponseBody
	public String saveUnit(@RequestParam("PropertyId") String propertyId, @RequestParam("UnitId") String unitId,
			@RequestParam("UnitName") String unitName) {
		try {
			Unit unit = new Unit(Long.parseLong(propertyId), Long.parseLong(unitId), unitName);
			unitService.unitSave(unit);
			System.out.println("UNIT ADDED");
			Unit munit = new Unit(Long.parseLong(propertyId), Long.parseLong(unitId), unitName);
			String gson = new Gson().toJson(munit);
			return gson;
		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}

	}

	@RequestMapping(value = "/editUnit", method = RequestMethod.POST)
	@ResponseBody
	public String editUnit(@RequestParam("PropertyId") String propertyId,
			@RequestParam("UnitIdold") String unitId_old, @RequestParam("UnitId") String unitId,
			@RequestParam("UnitName") String unitName) {
		try {
			unitService.unitEdit(Long.parseLong(unitId_old), Long.parseLong(unitId), unitName);
			System.out.println("UNIT EDITED");
			String gson = new Gson().toJson(unitService.getUnits(Long.parseLong(propertyId)));
			return gson;

		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}

	}

	/*
	 * =============================== CARRIER API's ===================
	 * ============================================
	 */
	@RequestMapping(value = "/fetchCarrier", method = RequestMethod.GET)
	@ResponseBody
	public String fetch_carrier(@RequestParam("PropertyId") String propertyId) {

		try {
			List<CarrierCombined> carrierCombined = carrierDeliveryService.getCombinedData(Long.parseLong(propertyId));
			String gson = new Gson().toJson(carrierCombined);
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
