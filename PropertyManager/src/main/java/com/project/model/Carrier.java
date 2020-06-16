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

	@Column(name = "carrierName")
	private String carrierName;

	@OneToMany(targetEntity = CarrierDelivery.class, mappedBy = "carrierId", orphanRemoval = false, fetch = FetchType.LAZY)
	private Set<CarrierDelivery> carrierDeliveries;

	public Set<CarrierDelivery> getCarrierDeliveries() {
		return carrierDeliveries;
	}

	public void setCarrierDeliveries(Set<CarrierDelivery> carrierDeliveries) {
		this.carrierDeliveries = carrierDeliveries;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long carrierId) {
		this.id = carrierId;
	}

	public String getcarrierName() {
		return carrierName;
	}

	public void setcarrierName(String carrierName) {
		this.carrierName = carrierName;
	}

}
