const fs = require('fs'); // necesitado para guardar/cargar educards
const educardsMod = require('./educards'); // importamos el modulo educards

// Retorna una instancia de EducardsGame. Si existe filename, recupera la instancia desde el archivo.
function getEducards(filename = 'data.json') {
  let educards = new educardsMod.Educards();
  if (fs.existsSync(filename)) {
    educards = educardsMod.Educards.load(filename);
  }
  return educards;
}

function saveEducards(educards, filename = 'data.json') {
  educards.save(filename);
}


function main() {
  
  console.log('arguments: ');
  process.argv.forEach(argument => console.log(argument));

  const args = process.argv.slice(2);

// Agregar una carta
  if (args[0] === 'addCard')
  {
    const educards = getEducards();
    educards.addCard(
      {
        tittle: args[1],
        story: args[2],
        year: args[3],
      }
    );
    saveEducards(educards);
    console.log('Card successfully added.');
  }

  // Eliminar una carta
  if (args[0] === 'removeCard'){
    const educards = getEducards();
    educards.removeCard(args[1]);
    saveEducards(educards);
    console.log('Card successfully removed.');
  }

  // Listar todas las cartas
  if (args[0] === 'getCards')
  {
    const educards = getEducards();
    educards.getCards();
    console.log("All the playing cards:");
    console.log(educards.getCards());
    saveEducards(educards);
  }
}

main();
