class Player 
{

  constructor(id, name, year, imagen, password)
  {
    this.id = id;
    this.year = year;
    this.name = name;
    this.image = imagen;
    this.password = password;
  }

  getYear()
  {
    return this.year;
  }

  getPassword()
  {
    return this.password;
  }

  getImage()
  {
    return this.image;
  }

  getId()
  {
    return this.id;
  }
  
  getName(){
    return this.name;
  }

}

module.exports = Player;

