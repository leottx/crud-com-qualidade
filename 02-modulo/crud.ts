// const fs = require('fs'); Padrão do common JS
import fs from "fs"; // ES6
const DB_FILE_PATH = './db';

interface Todo {
  date: string,
  content: string,
  done: boolean
}

function create(content: string) {
  const todo: Todo = {
    date: new Date().toISOString(),
    content: content,
    done: false
  }

  const todos:Todo[] = [
    ...read(),
    todo,
  ]

  // Salva o valor contido no parâmetro content em um arquivo. Esse arquivo simula um banco de dados.
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({todos}, null, 2));
}

function read() {
  const dbString = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  const db = JSON.parse(dbString || '{}');
  
  // Fail fast validation
  if (!db.todos) {
    return [];
  }
  
  return db.todos;
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, '');
}

clearDB();

create('First file');
create('Second file');
create('Third file');

console.log(read());