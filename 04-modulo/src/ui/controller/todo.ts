async function get() {
  return fetch("http://localhost:3000/api/todos").then(async (res) => {
    const todosString = await res.text();
    const serverTodos = JSON.parse(todosString).todos;

    return serverTodos;
  });
}

export const todoController = {
  get,
};
