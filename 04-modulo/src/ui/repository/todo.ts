interface TodoRepositoryParams {
  page: number;
  limit: number;
}

interface TodoRepositoryOutput {
  todos: Todo[];
}

// Model ou Schema
interface Todo {
  id: string;
  content: string;
  date: Date;
  done: boolean;
}

function get({
  page,
  limit,
}: TodoRepositoryParams): Promise<TodoRepositoryOutput> {
  return fetch("/api/todos").then(async (res) => {
    const todosString = await res.text();
    const serverTodos = parseTodosFromServer(JSON.parse(todosString)).todos;

    const ALL_TODOS = serverTodos;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
    const totalPages = Math.ceil(ALL_TODOS.length / limit);

    return {
      todos: paginatedTodos,
      total: ALL_TODOS.length,
      pages: 1,
    };
  });
}

function parseTodosFromServer(responseBody: unknown): { todos: Array<Todo> } {
  if (
    responseBody !== null &&
    typeof responseBody === "object" &&
    "todos" in responseBody &&
    Array.isArray(responseBody.todos)
  ) {
    return {
      todos: responseBody.todos.map((todo: unknown) => {
        if (todo === null && typeof todo !== "object") {
          throw new Error("Invalid todo from API");
        }

        const { id, content, date, done } = todo as {
          id: string;
          content: string;
          date: string;
          done: string;
        };

        return {
          id,
          content,
          done: String(done).toLowerCase() === "true",
          date: new Date(date),
        };
      }),
    };
  }

  return {
    todos: [],
  };
}

export const todoRepository = {
  get,
};
