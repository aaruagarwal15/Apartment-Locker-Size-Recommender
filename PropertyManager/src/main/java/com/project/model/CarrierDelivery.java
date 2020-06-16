package com.project.model;

import java.io.Serializable;

import javax.persistence.*;

import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Fetch;

import com.project.repository.CarrierRepository;

@Entity
@Table(name = "carrier_delivery")
// @IdClass(CarrierDId.class)
public class CarrierDelivery implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "propertyId")
	private Long propertyId;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "carrierId")
	private Long carrierId;

	@Column(name = "deliveryDay")
	private String deliveryDay;

	@Column(name = "deliveryTime")
	private String deliveryTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "carrierId", insertable = false, updatable = false)
	@Fetch(FetchMode.JOIN)
	private Carrier carrier;

	public Carrier getCarrier() {
		return carrier;
	}

	public void setCarrier(Carrier carrier) {
		this.carrier = carrier;
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

	

	public Long getCarrierId() {
		return carrierId;
	}

	public void setCarrierId(Long carrierId) {
		this.carrierId = carrierId;
	}

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

}
