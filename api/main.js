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

  // IMPLEMENTAR LOS COMANDOS DE CONSOLA
}

main();
