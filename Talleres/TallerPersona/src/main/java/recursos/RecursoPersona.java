package recursos;

import java.util.List;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import modelo.entities.Persona;
import modelo.servicios.PersonaService;

@Path("/personas")
public class RecursoPersona {
	
	
	private PersonaService personaService;
	
	public RecursoPersona() {
		personaService = new PersonaService();
	}
	
	@GET
	@Path("/{cedula}")
	@Produces(MediaType.APPLICATION_JSON)
	public Persona buscar(@PathParam("cedula")  String cedula) {
		return personaService.buscarPersona(cedula);
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void add(Persona p) {
		personaService.agregarPersona(p);
		
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void update(Persona p) {
		personaService.actualizarRegistro(p);
	}
	
	@DELETE
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void delete(int id) {
		personaService.darDeBaja(id);
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Persona> todos() {
		 return personaService.obtenerTodasLasPersonas();
	}
	
}
