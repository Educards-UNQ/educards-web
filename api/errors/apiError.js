
class ApiError extends Error{
  constructor(name, status, errorCode, meassage = null){
    super(meassage || name);
    this.name = name;
    this.status = status;
    this.errorCode = errorCode;
  }

}

class PlayerHasAlreadyBeenRegisteredError extends ApiError
{
  constructor(name)
  {
    super('El jugador ' + name + ' ya fue registrado.', 409, 'RESOURCE_ALREADY_EXISTS');
  }
}

class InvalidOrUnexistingURLError extends ApiError{
  constructor(){
    super('La URL ingresada es inexistente.', 404, 'RESOURCE_NOT_FOUND');    
  }
}

class InvalidJsonError extends ApiError{
  constructor(){
    super('La construccion del JSON es invalido', 400, 'BAD_REQUEST');    
  }
}

class MissingParemetersError extends ApiError{
  constructor(){
    super('Falta ingresar parametros en la peticion.', 400, 'BAD_REQUEST');    
  }
}

class UnexpectedFailureError extends ApiError{
  constructor(){
    super('Error inesperado', 500 , 'INTERNAL_SERVER_ERROR');    
  }
}

class UnexistingPlayerError extends ApiError{
  constructor(name){
    super('No existe un jugador con el nombre ' + name, 404, 'RESOURCE_NOT_FOUND');    
  }
}

class WrongPasswordError extends ApiError{
  constructor(){
    super('La contraseña ingresada es incorrecta', 400, 'BAD_REQUEST');    
  }
}

module.exports = {
  ApiError,
  InvalidOrUnexistingURLError,
  InvalidJsonError,
  MissingParemetersError,
  UnexpectedFailureError,
  UnexistingPlayerError,
  WrongPasswordError,
  PlayerHasAlreadyBeenRegisteredError,
};