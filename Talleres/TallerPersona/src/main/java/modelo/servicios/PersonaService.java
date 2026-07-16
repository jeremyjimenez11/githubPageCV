package modelo.servicios;


import java.util.List;

import modelo.dao.PersonaDAO;
import modelo.entities.Persona;

// negocio aplica al modelo de negocio
// las clases servicio es la funcionalidad que se le da a la aplicacion, es decir, lo que hace la aplicacion

public class PersonaService {
	
	private PersonaDAO personaDAO;
	
	public PersonaService() {
		personaDAO = new PersonaDAO();
	}
	
	public Persona buscarPersona(String cedula) {
		return personaDAO.getByCedula(cedula);
	}
	
	public void agregarPersona(Persona p) {
		personaDAO.create(p);
	}
	
	public void actualizarRegistro(Persona p) {
		personaDAO.update(p);
	}
	
	public void darDeBaja(int id) {
		personaDAO.delete(id);
	}
	
	public boolean validarCredito(String cedula) {
		Persona persona = personaDAO.getByCedula(cedula);
		return persona != null && persona.getEdad() > 18;
	}
	
	public List<Persona> obtenerTodasLasPersonas() {
		return personaDAO.getAll();
	}
}
