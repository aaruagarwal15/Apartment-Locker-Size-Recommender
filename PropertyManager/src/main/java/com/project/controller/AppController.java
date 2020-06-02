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
import com.project.model.Carrier_delivery;
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
	private PropertyService property_service;

	@Autowired
	private UnitService unit_service;

	@Autowired
	private CarrierService carrier_service;

	@Autowired
	private CarrierDeliveryService carrier_delivery_service;

	/* ================= PROPERTY API's =============================== */

	@RequestMapping(value = "/getall", method = RequestMethod.GET)
	@ResponseBody
	public String getAllData() {
		try {
			List<Property> listProperty = property_service.listAll();
			String gson = new Gson().toJson(listProperty);
			System.out.println(gson);
			return gson;
		}
		catch(Exception e) {
			System.out.println(e);
			return "FAILED";
		}
		
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveProperty(@RequestParam("Property_name") String pname,
			@RequestParam("Property_address") String paddress) {
		try {
			Property property = new Property();
			property.setP_name(pname);
			property.setP_address(paddress);

			property_service.save(property);
			System.out.println("PROPERTY ADDED");
			String gson = new Gson().toJson(property_service.listAll());
			return gson;
		}
		catch(Exception e) {
			System.out.println(e);
			return "FAILED";
		}
		
	}

	public class NameSorter1 implements Comparator<Property> {
		public int compare(Property o1, Property o2) {
			return o1.getP_name().compareToIgnoreCase(o2.getP_name());
		}
	}

	@RequestMapping(value = "/increasing_filter", method = RequestMethod.GET)
	@ResponseBody
	public String increasing_filter() {
		try {
			List<Property> filterProperty = property_service.listAll();
			filterProperty.sort(new NameSorter1());
			String gson = new Gson().toJson(filterProperty);
			System.out.println("FILTERED");
			System.out.println(gson);
			return gson;
		}
		catch(Exception e) {
			System.out.println(e);
			return "FAILED";
		}
		
	}

	public class NameSorter implements Comparator<Property> {
		public int compare(Property o1, Property o2) {
			return o2.getP_name().compareToIgnoreCase(o1.getP_name());
		}
	}

	@RequestMapping(value = "/decreasing_filter", method = RequestMethod.GET)
	@ResponseBody
	public String decreasing_filter() {
		try {

			List<Property> filterProperty = property_service.listAll();
			filterProperty.sort(new NameSorter());
			String gson = new Gson().toJson(filterProperty);
			System.out.println("FILTERED");
			System.out.println(gson);
			return gson;
		}
		catch(Exception e) {
			System.out.println(e);
			return "FAILED";
		}
	}

	@RequestMapping(value = "/fetch_details", method = RequestMethod.GET)
	@ResponseBody
	public String fetch_details(@RequestParam("P_id") String p_id) {
		
		try {
			Property property = property_service.get(Long.parseLong(p_id));
			String gson = new Gson().toJson(property);
			return gson;
		}
		catch(Exception e) {
			System.out.println(e);
			return "FAILED";
		}
	}

	/* ===================== UNITS API's ====================== */

	@RequestMapping(value = "/getallunits", method = RequestMethod.GET)
	@ResponseBody
	public String getAllUnitsData(@RequestParam("PId") String p_id) {
		
		try {
			List<Unit> listUnit = unit_service.getUnits(Long.parseLong(p_id));
			String gson = new Gson().toJson(listUnit);
			System.out.println(gson);
			return gson;
		}catch(Exception e) {
			System.out.println(e);
			return "FAILED";
		}
	}

	@RequestMapping(value = "/delete_unit", method = RequestMethod.DELETE)
	@ResponseBody
	public String deleteUnitsData(@RequestParam("U_Id") String u_id) {
		String result;
		try {
			unit_service.delete(Long.parseLong(u_id));
			result = "SUCCESS";
		} catch (Exception e) {
			System.out.println(e);
			result = "Error";
		}
		return result;

	}

	@RequestMapping(value = "/save_unit", method = RequestMethod.POST)
	@ResponseBody
	public String saveUnit(@RequestParam("Property_Id") String p_id, @RequestParam("Unit_Id") String u_id,
			@RequestParam("Unit_Name") String u_name) {
		try {
			Unit unit = new Unit(Long.parseLong(p_id), Long.parseLong(u_id), u_name);
			unit_service.unit_save(unit);
			System.out.println("UNIT ADDED");
			Unit munit = new Unit(Long.parseLong(p_id), Long.parseLong(u_id), u_name);
			String gson = new Gson().toJson(munit);
			return gson;
		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}

	}

	@RequestMapping(value = "/edit_unit", method = RequestMethod.POST)
	@ResponseBody
	public String editUnit(@RequestParam("Property_Id") String p_id, @RequestParam("Unit_Id_old") String u_id_old,
			@RequestParam("Unit_Id") String u_id, @RequestParam("Unit_Name") String u_name) {
		try {
			unit_service.unit_edit(Long.parseLong(u_id_old), Long.parseLong(u_id), u_name);
			System.out.println("UNIT EDITED");
			String gson = new Gson().toJson(unit_service.getUnits(Long.parseLong(p_id)));
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
	@RequestMapping(value = "/fetch_carrier", method = RequestMethod.GET)
	@ResponseBody
	public String fetch_carrier(@RequestParam("PId") String p_id) {
		
		try {
			List<CarrierCombined> ccd = carrier_delivery_service.getCombinedData(Long.parseLong(p_id));
			String gson = new Gson().toJson(ccd);
			return gson;
		}
		catch(Exception e) {
			System.out.println(e);
			return "FAILED";
		}
	}
	
	
	@RequestMapping(value = "/save_carrier", method = RequestMethod.POST)
	@ResponseBody
	public String saveCarrier(@RequestParam("Property_Id") String p_id, @RequestParam("Carrier_Id") String c_id, 
			@RequestParam("Carrier_Name") String c_name, @RequestParam("Days") String[] days, @RequestParam("Time") String[] time ) {
		try {
			Carrier c = new Carrier();
			c.setId(Long.parseLong(c_id));
			c.setC_name(c_name);
			try {
				carrier_service.carrier_save(c);
			}
			catch(Exception e){
				System.out.println(e);
				System.out.println("Entry already exists");
			}
			List<Carrier_delivery> car_d = carrier_delivery_service.cd_check(Long.parseLong(c_id), Long.parseLong(p_id));	
			if(car_d.isEmpty()) {
				for(int i=0; i<days.length; i++) {
					Carrier_delivery cd = new Carrier_delivery();
					cd.setP_id(Long.parseLong(p_id));
					cd.setCar_id(Long.parseLong(c_id));
					cd.setDelivery_day(days[i]);
					cd.setDelivery_time(time[i]);
					
					carrier_delivery_service.cd_save(cd);				
				}	
				System.out.println("CARRIER ADDED");
				List<CarrierCombined> ccd = carrier_delivery_service.getEntryData(Long.parseLong(p_id), Long.parseLong(c_id));
				String gson = new Gson().toJson(ccd);
				return gson;
			}
			else {
				System.out.println("Carrier Already Exists");
				return "FAILED";
			}
			
			
		}
		catch(Exception e) {
			System.out.println(e);
			return "FAILED";
		}

	}
	
	
	@RequestMapping(value = "/delete_carrier", method = RequestMethod.DELETE)
	@ResponseBody
	public String deleteCarrierData(@RequestParam("Property_Id") String p_id, @RequestParam("Carrier_Id") String c_id) {
		String result;
		try {
			carrier_delivery_service.delete(Long.parseLong(c_id), Long.parseLong(p_id));
			List<String> checkinc = carrier_delivery_service.checkforcarrier(Long.parseLong(c_id), Long.parseLong(p_id));
			if(checkinc.isEmpty()) {
				carrier_service.deleteCarrier(Long.parseLong(c_id));
			}
			System.out.println("SUCCESS");
			result = "SUCCESS";
		} catch (Exception e) {
			System.out.println(e);
			result = "Error";
		}
		return result; 

	}
	
	
	@RequestMapping(value = "/edit_carrier", method = RequestMethod.POST)
	@ResponseBody
	public String editCarrier(@RequestParam("Property_Id") String p_id, @RequestParam("Carrier_Id") String c_id, 
			 @RequestParam("Days") String[] days, @RequestParam("Time") String[] time) {
		try {
			carrier_delivery_service.delete(Long.parseLong(c_id), Long.parseLong(p_id));
			for(int i=0; i<days.length; i++) {
				Carrier_delivery cd = new Carrier_delivery();
				cd.setP_id(Long.parseLong(p_id));
				cd.setCar_id(Long.parseLong(c_id));
				cd.setDelivery_day(days[i]);
				cd.setDelivery_time(time[i]);
				
				carrier_delivery_service.cd_save(cd);				
			}
			List<CarrierCombined> ccd = carrier_delivery_service.getCombinedData(Long.parseLong(p_id));
			String gson = new Gson().toJson(ccd);
			return gson;
			

		} catch (Exception e) {
			System.out.println(e);
			return "FAILED";
		}

	}
	
}
