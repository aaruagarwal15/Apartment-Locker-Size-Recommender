package com.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.model.Unit;
import com.project.repository.UnitRepository;


@Service
@Transactional
public class UnitService {
	
	@Autowired
    private UnitRepository urepo;
	
	public List<Unit> listAll() {
        return urepo.findAll();
    }
	
	public void unit_save(Unit unit) {
        urepo.saveUnits(unit.getP_id(), unit.getU_id(), unit.getU_name());
    }
	
	public void unit_edit(Long u_id_old, Long u_id, String u_name) {
        urepo.editUnits(u_id_old, u_id, u_name);
    }
	
	public List<Unit> getUnits(Long p_id) {
        return urepo.findByP_id(p_id);
    }
	public void delete(long u_id) {
        urepo.deleteById(u_id);
    }
}
