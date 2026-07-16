package recursos;

import modelo.entities.Persona;
import modelo.servicios.PersonaService;

public class RecursoPersona {
	
	
	private PersonaService personaService;
	
	public RecursoPersona() {
		personaService = new PersonaService();
	}
	
	public Persona buscar(String cedula) {
		return personaService.buscarPersona(cedula);
	}
	
	public Persona add(Persona p) {
		
	}
	
	public Persona update(Persona p) {
		
	}
	
	public Persona delete(int id) {
		
	}
	
	public ArrayList todos() {
		
		 
	}
	
}
