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
    private UnitRepository unitRepository;

    public List<Unit> listAll() {
        return unitRepository.findAll();
    }

    public void unitSave(Unit unit) {
    	unitRepository.saveUnits(unit.getPropertyId(), unit.getunitId(), unit.getunitName());
    }

    public void unitEdit(Long unitId_old, Long unitId, String unitName) {
    	unitRepository.editUnits(unitId_old, unitId, unitName);
    }

    public List<Unit> getUnits(Long propertyId) {
        return unitRepository.findByPropertyId(propertyId);
    }

    public void delete(long unitId) {
    	unitRepository.deleteById(unitId);
    }
}
