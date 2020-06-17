package com.project.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "unitsData")
public class Unit {
	@Column(name = "propertyId")
	private Long propertyId;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long unitId;
	
	@Column(name = "unitNumber")
	private Long unitNumber;
	
	@Column(name = "buildingNumber")
	private Long buildingNumber;
	
	@Column(name = "addressId")
	private String addressId;

	public Unit() {

	}

	public Unit(Long propertyId, Long unitNumber, Long buildingNumber, String addressId) {
		this.propertyId = propertyId;
		this.buildingNumber = buildingNumber;
		this.unitNumber = unitNumber;
		this.addressId = addressId;
	}

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

	public Long getUnitId() {
		return unitId;
	}

	public void setUnitId(Long unitId) {
		this.unitId = unitId;
	}

	public Long getUnitNumber() {
		return unitNumber;
	}

	public void setUnitNumber(Long unitNumber) {
		this.unitNumber = unitNumber;
	}

	public Long getBuildingNumber() {
		return buildingNumber;
	}

	public void setBuildingNumber(Long buildingNumber) {
		this.buildingNumber = buildingNumber;
	}

	public String getAddressId() {
		return addressId;
	}

	public void setAddressId(String addressId) {
		this.addressId = addressId;
	}

	
}
