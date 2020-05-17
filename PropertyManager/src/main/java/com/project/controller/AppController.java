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
import com.project.model.Property;
import com.project.model.Unit;
import com.project.service.PropertyService;
import com.project.service.UnitService;

import java.util.Comparator;
import java.util.List;

@Controller
@CrossOrigin(origins="http://127.0.0.1:5500")
public class AppController {
	@Autowired
    private PropertyService property_service;
	
	@Autowired
	private UnitService unit_service;
	
	@RequestMapping(value = "/getall", method = RequestMethod.GET)
	@ResponseBody
	public String getAllData() {
		List<Property> listProperty = property_service.listAll(); 
		String gson = new Gson().toJson(listProperty);
	    System.out.println(gson);
	    return gson;
	}
	

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveProperty(@RequestParam("Property_name") String pname, @RequestParam("Property_address") String paddress) {
	    Property property = new Property();
	    property.setP_name(pname);
	    property.setP_address(paddress);
	    
	    property_service.save(property);
		System.out.println("PROPERTY ADDED");
		String gson = new Gson().toJson(property_service.listAll());
	    return gson;
	}
	
	
	public class NameSorter1 implements Comparator<Property> 
	{
	    public int compare(Property o1, Property o2) {
	        return o1.getP_name().compareToIgnoreCase(o2.getP_name());
	    }
	}
	
	@RequestMapping(value = "/increasing_filter", method = RequestMethod.GET)
	@ResponseBody
	public String increasing_filter() {
		List<Property> filterProperty = property_service.listAll();	
		filterProperty.sort(new NameSorter1());
		String gson = new Gson().toJson(filterProperty);
		System.out.println("FILTERED");
	    System.out.println(gson);
	    return gson;
	}
	
	
	
	public class NameSorter implements Comparator<Property> 
	{
	    public int compare(Property o1, Property o2) {
	        return o2.getP_name().compareToIgnoreCase(o1.getP_name());
	    }
	}
	
	@RequestMapping(value = "/decreasing_filter", method = RequestMethod.GET)
	@ResponseBody
	public String decreasing_filter() {
		List<Property> filterProperty = property_service.listAll();	
		filterProperty.sort(new NameSorter());
		String gson = new Gson().toJson(filterProperty);
		System.out.println("FILTERED");
	    System.out.println(gson);
	    return gson;
	}
	
	
	@RequestMapping(value = "/fetch_details", method = RequestMethod.GET)
	@ResponseBody
	public String fetch_details(@RequestParam("P_id") String p_id ) {
		Property property = property_service.get(Long.parseLong(p_id));
		String gson = new Gson().toJson(property);
		return gson;
	}
	
	
	/* ===================== UNITS API ======================*/
	
	@RequestMapping(value = "/getallunits", method = RequestMethod.GET)
	@ResponseBody
	public String getAllUnitsData(@RequestParam("PId") String p_id) {
		List<Unit> listUnit = unit_service.getUnits(Long.parseLong(p_id)); 
		String gson = new Gson().toJson(listUnit);
	    System.out.println(gson);
	    return gson;
	}
	
	@RequestMapping(value = "/delete_unit", method = RequestMethod.DELETE)
	@ResponseBody
	public String deleteUnitsData(@RequestParam("U_Id") String u_id) {
		String result;
		try {
			unit_service.delete(Long.parseLong(u_id));
			result = "SUCCESS";
		}
		catch(Exception e) {
			System.out.println(e);
			result =  "Error";
		}
		return result;
		
	}
}
