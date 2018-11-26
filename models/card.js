class Card {

  constructor(id, tittle, story, year) 
  {
    this.id = id;
    this.tittle = tittle;
    this.story = story;
    this.year = year;
  }

  getId()
  {
    return this.id;
  }

  getTittle()
  {
    return this.tittle;
  }

  getName(){
    return this.tittle;
  }

 hasTittle(cardTittle)
  {
    return this.tittle === cardTittle;
  }

  hasId(id){
    return this.id === id;
  }

}

module.exports = Card;
