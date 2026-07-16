package modelo.entities;


public class Persona {
	
	private int id;
	
	private String nombre;
	private String cedula;
	private int edad;
	
	public Persona(int id, String nombre, String cedula, int edad) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.cedula = cedula;
		this.edad = edad;
	}
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getCedula() {
		return cedula;
	}
	public void setCedula(String cedula) {
		this.cedula = cedula;
	}
	public int getEdad() {
		return edad;
	}
	public void setEdad(int edad) {
		this.edad = edad;
	}
	
	
}
