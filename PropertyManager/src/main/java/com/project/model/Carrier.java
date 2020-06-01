package com.project.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "carrier")
public class Carrier implements Serializable {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "c_name")
	private String c_name;
	

	@OneToMany(targetEntity = Carrier_delivery.class, mappedBy = "car_id", orphanRemoval = false, fetch = FetchType.LAZY)
	private Set<Carrier_delivery> carrier_deliveries;
	
	

	public Set<Carrier_delivery> getCarrier_deliveries() {
		return carrier_deliveries;
	}

	public void setCarrier_deliveries(Set<Carrier_delivery> carrier_deliveries) {
		this.carrier_deliveries = carrier_deliveries;
	}

	
	public Long getId() {
		return id;
	}
	public void setId(Long c_id) {
		this.id = c_id;
	}
	public String getC_name() {
		return c_name;
	}
	public void setC_name(String c_name) {
		this.c_name = c_name;
	} 
	
}
