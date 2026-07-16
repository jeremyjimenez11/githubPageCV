package modelo.dao;

import java.util.ArrayList;
import java.util.List;

import modelo.entities.Persona;

public class PersonaDAO {
	
	public static List<Persona> personas; 
	
	public void create(Persona p) {
		personas.add(p);
	}
	
	public void delete (int id) {
		for(int i = 0; i < personas.size(); i++) {
			if(personas.get(i).getId() == id) {
				personas.remove(i);
				break;
			}
		}
	}
	
	public void update(Persona p) {
		for(int i = 0; i < personas.size(); i++) {
			if(personas.get(i).getId() == p.getId()) {
				personas.set(i, p);
				break;
			}
			
		}

	}
	
	public Persona getByCedula(String cedula) {
		for(Persona p : personas) {
			if(p.getCedula().equals(cedula)) {
				return p;
			}
		}
		return null;
	}
	
	public List<Persona> getAll() {
		if (personas == null) {
			personas.add(new Persona(1, "Juan Perez", "1234567890", 30));
			personas.add(new Persona(1, "Juan Lopez", "0123654789", 20));
			
		}
		return personas;
	}
}

