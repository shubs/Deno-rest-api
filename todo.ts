import { Drash } from "https://deno.land/x/drash/mod.ts";

let todos = [
  {
    "id": 1,
    "title": "Passer à Typescript",
    "completed": false,
  },
  {
    "id": 2,
    "title": "Créer une API REST",
    "completed": false,
  },
  {
    "id": 3,
    "title": "M'abonner à Devtheory",
    "completed": false,
  },
];

export class TodoList extends Drash.Http.Resource {
  static paths = ["/todos"];

  public GET() {
    this.response.body = todos;
    return this.response;
  }

  public POST() {
    const t = {
      id: Math.floor(Math.random() * Math.floor(321321)),
      title: this.request.getBodyParam("title"),
      completed: this.request.getBodyParam("completed"),
    };
    todos.push(t);

    this.response.body = t;
    return this.response;
  }
}

export class TodoElement extends Drash.Http.Resource {
  static paths = ["/todos/:id"];

  public GET() {
    const URL_param = this.request.getPathParam("id");
    const t = todos.find((t) => t.id == URL_param);
    if (!t) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Todo with id ${URL_param} not found`,
      );
    }
    this.response.body = t;
    return this.response;
  }

  public DELETE() {
    const URL_param = this.request.getPathParam("id");
    const t = todos.find((t) => t.id == URL_param);
    if (!t) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Todo with id ${URL_param} not found`,
      );
    }
    todos = todos.filter((t) => t.id != URL_param);
    this.response.body = "DELETED OK";
    return this.response;
  }

  public PUT() {
    const URL_param = this.request.getPathParam("id");
    const t = todos.find((t) => t.id == URL_param);
    if (!t) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Todo with id ${URL_param} not found`,
      );
    }
    t.completed = this.request.getBodyParam("completed");
    this.response.body = t;
    return this.response;
  }
}
