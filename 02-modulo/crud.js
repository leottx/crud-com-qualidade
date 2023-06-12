const fs = require('fs');
const DB_FILE_PATH = './db';

function create(content) {
  // Salva o valor contido no parâmetro content em um arquivo. Esse arquivo simula um banco de dados.
  fs.writeFileSync(DB_FILE_PATH, content);
}

create('New file update');

console.log('morango');