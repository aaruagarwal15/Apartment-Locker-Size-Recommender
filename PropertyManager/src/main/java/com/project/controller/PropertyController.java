package com.project.controller;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.project.model.Property;
import com.project.service.PropertyService;


@Controller
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class PropertyController {
	
	@Autowired
	private PropertyService propertyService;
	
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
	public String fetchPropertyDetails(@RequestParam("propertyId") String propertyId) {

		try {
			Property property = propertyService.getProperty(Long.parseLong(propertyId));
			String gson = new Gson().toJson(property);
			return gson;
		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}
	}

}
