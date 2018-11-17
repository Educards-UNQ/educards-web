class AdmCards
{

  constructor() 
  {
    this.cards = [];
  }

  getCards()
  {
    return this.cards;
  }

 addCard(newCard)
  {
    if (this.hasCardToAdd(newCard))
    {
      throw new Error('La carta ' + newCard.getTittle() + ' ya fue registrada');
    }
    this.cards.push(newCard);
  }

// retorna: True si la carta cardToAdd se encuentra registrado.
  hasCardToAdd(cardToAdd)
  {
    return this.getAllTittleCards().includes(cardToAdd.getTittle());
  }

  // retorna: todos los titulos de las cartas registradas.
  getAllTittleCards()
  {
    return this.cards.map(card => card.getTittle());
  }

  removeCard(cardTittle)
  {
    const cardToRemove = this.findCardByTittle(cardTittle);
    this.validateCardName(cardTittle, cardToRemove);
    const indexToRemove = this.cards.indexOf(cardToRemove);
    this.cards.splice(indexToRemove,1);
  }

  findCardByTittle(cardTittle)
  {
    return this.cards.find(card => card.hasTittle(cardTittle));
  }

  validateCardName(cartTittle, card)
  {
    if (card === undefined)
    {
      throw new Error('No se encontró una carta con el titulo: ' + cartTittle);
    }
  }

}

module.exports = AdmCards;