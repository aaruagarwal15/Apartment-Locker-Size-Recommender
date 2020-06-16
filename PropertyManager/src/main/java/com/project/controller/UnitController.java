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
import com.project.model.Unit;
import com.project.service.UnitService;


@Controller
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class UnitController {
	

	@Autowired
	private UnitService unitService;
	
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

}
