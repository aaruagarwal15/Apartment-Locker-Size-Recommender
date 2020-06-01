  package com.project.model;

import java.io.Serializable;

import javax.persistence.*;

import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Fetch;

import com.project.repository.CarrierRepository;

@Entity
@Table(name = "carrier_delivery")
//@IdClass(CarrierDId.class)
public class Carrier_delivery implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
	@Column(name ="p_id")
	private Long p_id;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "car_id")
	private Long car_id;
	

	@Column(name = "delivery_day")
	private String delivery_day;
	

	@Column(name ="delivery_time")
	private String delivery_time;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "car_id", insertable = false, updatable = false)
	@Fetch(FetchMode.JOIN)
	private Carrier carrier;


	public Carrier getCarrier() {
		return carrier;
	}

	public void setCarrier(Carrier carrier) {
		this.carrier = carrier;
	}
	
	
	public Long getP_id() {
		return p_id;
	}
	public void setP_id(Long p_id) {
		this.p_id = p_id;
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

	public Long getCar_id() {
		return car_id;
	}

	public void setCar_id(Long car_id) {
		this.car_id = car_id;
	}

	
	
	
}
