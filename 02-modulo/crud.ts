// const fs = require('fs'); Padrão do common JS
import fs from "fs"; // ES6
import { v4 as uuid } from "uuid";

const DB_FILE_PATH = "./db";

interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todos: Todo[] = [...read(), todo];

  // Salva o valor contido no parâmetro content em um arquivo. Esse arquivo simula um banco de dados.
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));

  return todo;
}

function read(): Todo[] {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");

  // Fail fast validation
  if (!db.todos) {
    return [];
  }

  return db.todos;
}

function update(id: string, partialTodo: Partial<Todo>) {
  const todos = read();

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) return;

  Object.assign(todo, partialTodo);

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

clearDB();

create("First file");
create("Second file");

const thirdTodo = create("Third file");

// Todo função de update de um CRUD recebe QUEM será atualizado e O QUE será o novo valor.
update(thirdTodo.id, { content: "New for the third todo" });
