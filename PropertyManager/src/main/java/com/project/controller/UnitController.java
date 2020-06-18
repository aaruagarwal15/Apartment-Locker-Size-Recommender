package com.project.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.project.model.Unit;
import com.project.service.UnitService;


@Controller
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class UnitController {
	

	@Autowired
	private UnitService unitService;
	
	final Logger logger = LoggerFactory.getLogger(UnitController.class);
	
	@RequestMapping(value = "/getallunits", method = RequestMethod.GET)
	@ResponseBody
	public String getAllUnitsData(@RequestParam("propertyId") String propertyId) {

		try {
			List<Unit> listUnit = unitService.getUnits(Long.parseLong(propertyId));
			String gson = new Gson().toJson(listUnit);
			logger.info("All units fetched successfully");
			System.out.println(gson);
			return gson;
		} catch (Exception e) {
			logger.error("Unable to fetch units");
			System.out.println(e);
			return "FAILED";
		}
	}

	@RequestMapping(value = "/deleteUnit", method = RequestMethod.DELETE)
	@ResponseBody
	public String deleteUnitsData(@RequestParam("unitNumber") String unitNumber, 
			@RequestParam("buildingNumber") String buildingNumber, @RequestParam("propertyId") String propertyId ) {
		String result;
		try {
			unitService.deleteUnit(Long.parseLong(unitNumber), Long.parseLong(buildingNumber), Long.parseLong(propertyId) );
			result = "SUCCESS";
			logger.info("Unit is successfully deleted");
		} catch (Exception e) {
			logger.error("Error in deleting a unit");
			System.out.println(e);
			result = "Error";
		}
		return result;

	}

	@RequestMapping(value = "/saveUnit", method = RequestMethod.POST)
	@ResponseBody
	public String saveUnit(@RequestParam("PropertyId") String propertyId, @RequestParam("UnitNumber") String unitNumber,
			@RequestParam("BuildingNumber") String buildingNumber) {
		try {
			List<Unit> fetchUnits = unitService.getExistingUnits(Long.parseLong(propertyId), Long.parseLong(unitNumber), Long.parseLong(buildingNumber));
			if(fetchUnits.size() == 0) {
				String addressId = "AdI"+propertyId+unitNumber+buildingNumber;
				Unit unit = new Unit(Long.parseLong(propertyId), Long.parseLong(unitNumber), Long.parseLong(buildingNumber), addressId);
				unitService.unitSave(unit);
				System.out.println("UNIT ADDED");
				Unit newUnit = new Unit(Long.parseLong(propertyId), Long.parseLong(unitNumber), Long.parseLong(buildingNumber),addressId);
				String gson = new Gson().toJson(newUnit);
				System.out.println(gson);
				logger.info("New Unit is successfully added");
				return gson;
			}
			else {
				logger.error("New Unit Entries already exists");
				return "FAILED";
			}
			
		} catch (Exception e) {
			logger.error("Error in adding a new unit");
			System.out.println(e);
			return "FAILED";
		}

	}

	/*@RequestMapping(value = "/editUnit", method = RequestMethod.POST)
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

	}*/

}
