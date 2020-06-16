package com.project.model;

import javax.persistence.Column;
import javax.persistence.Id;

public class CarrierCombined {

	private Long carrierId;
	private String carrierName;
	private String deliveryDay;
	private String deliveryTime;

	public CarrierCombined(Long carrierId, String carrierName, String deliveryDay, String deliveryTime) {
		super();
		this.carrierId = carrierId;
		this.carrierName = carrierName;
		this.deliveryDay = deliveryDay;
		this.deliveryTime = deliveryTime;
	}

	public Long getC_id() {
		return carrierId;
	}

	public void setC_id(Long carrierId) {
		this.carrierId = carrierId;
	}

	public String getcarrierName() {
		return carrierName;
	}

	public void setcarrierName(String carrierName) {
		this.carrierName = carrierName;
	}

	public String getDeliveryDay() {
		return deliveryDay;
	}

	public void setDeliveryDay(String deliveryDay) {
		this.deliveryDay = deliveryDay;
	}

	public String getDelivery_time() {
		return deliveryTime;
	}

	public void setDelivery_time(String deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	@Override
	public String toString() {
		return "HII ffrom carrier";
	}
}
