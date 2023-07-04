import { todoRepository } from "@ui/repository/todo";

interface TodoCrontrollerParams {
  page: number;
}

async function get(params: TodoCrontrollerParams) {
  return todoRepository.get({ page: params.page, limit: 2 });
}

export const todoController = {
  get,
};
