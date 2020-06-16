package com.project.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "unit")
public class Unit {
	@Column(name = "propertyId")
	private Long propertyId;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long unitId;

	@Column(name = "unitName")
	private String unitName;

	public Unit() {

	}

	public Unit(Long propertyId, Long unitId, String unitName) {
		this.propertyId = propertyId;
		this.unitId = unitId;
		this.unitName = unitName;
	}

	public Long getunitId() {
		return unitId;
	}

	public void setunitId(Long unitId) {
		this.unitId = unitId;
	}

	public String getunitName() {
		return unitName;
	}

	public void setunitName(String unitName) {
		this.unitName = unitName;
	}

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

}
