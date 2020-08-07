const connection = require("./db.js");

// constructor
const Todo = function(todo) {
  this.todoString = todo.todoString;
  this.completed= todo.completed;
};

Todo.create = (newTodo, result) => {
  connection.query("INSERT INTO todo SET ?", newTodo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Todo: ", { id: res.insertId, ...newTodo });
    result(null, { id: res.insertId, ...newTodo });
  });
};

Todo.findById = (TodoId, result) => {
  connection.query(`SELECT * FROM todo WHERE id = ${TodoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Todo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Todo with the id
    result({ kind: "not_found" }, null);
  });
};

Todo.getAll = result => {
  connection.query("SELECT * FROM todo", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Todo: ", res);
    result(null, res);
  });
};

Todo.updateById = (id, Todo, result) => {
  connection.query(
    "UPDATE todo SET todoString = ?,  completed = ? WHERE id = ?",
    [Todo.todoString, Todo.completed, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Todo with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated todo: ", { id: id, ...Todo });
      result(null, { id: id, ...Todo });
    }
  );
};

Todo.remove = (id, result) => {
  connection.query("DELETE FROM todo WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Todo with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted todo with id: ", id);
    result(null, res);
  });
};

Todo.removeAll = result => {
  connection.query("DELETE FROM todo", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Todos`);
    result(null, res);
  });
};

module.exports = Todo;
