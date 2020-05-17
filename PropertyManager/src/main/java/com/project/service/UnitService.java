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
	
	public void save(Unit unit) {
        urepo.save(unit);
    }
	
	public List<Unit> getUnits(Long p_id) {
        return urepo.findByP_id(p_id);
    }
	public void delete(long u_id) {
        urepo.deleteById(u_id);
    }
}
