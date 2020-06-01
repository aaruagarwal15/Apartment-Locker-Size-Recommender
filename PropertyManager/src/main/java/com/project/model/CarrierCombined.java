package com.project.model;

import javax.persistence.Column;
import javax.persistence.Id;

public class CarrierCombined {
	
	private Long c_id;
	private String c_name;
	private String delivery_day;
	private String delivery_time;
	
	
	public CarrierCombined(Long c_id, String c_name, String delivery_day, String delivery_time) {
		super();
		this.c_id = c_id;
		this.c_name = c_name;
		this.delivery_day = delivery_day;
		this.delivery_time = delivery_time;
	}
	public Long getC_id() {
		return c_id;
	}
	public void setC_id(Long c_id) {
		this.c_id = c_id;
	}
	public String getC_name() {
		return c_name;
	}
	public void setC_name(String c_name) {
		this.c_name = c_name;
	}
	public String getDelivery_day() {
		return delivery_day;
	}
	public void setDelivery_day(String delivery_day) {
		this.delivery_day = delivery_day;
	}
	public String getDelivery_time() {
		return delivery_time;
	}
	public void setDelivery_time(String delivery_time) {
		this.delivery_time = delivery_time;
	}
	
	@Override
	public String toString() {
		return "HII ffrom carrier";
	}
}
