import React, { useCallback, useState } from "react";

import PropTypes from "prop-types";
import TodoTextInput from "./TodoTextInput";
import classnames from "classnames";

const TodoItem = ({ todo, editTodo, deleteTodo, completeTodo }) => {
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = useCallback(() => {
    setEditing(true);
  }, [setEditing]);

  const handleSave = useCallback(
    (id, text) => {
      if (text.length === 0) {
        deleteTodo(id);
      } else {
        editTodo(id, text);
      }
      setEditing(false);
    },
    [deleteTodo, editTodo, setEditing]
  );

  let element;
  if (editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={editing}
        onSave={(text) => handleSave(todo.id, text)}
      />
    );
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={() => deleteTodo(todo.id)} />
      </div>
    );
  }

  return (
    <li
      className={classnames({
        completed: todo.completed,
        editing: editing,
      })}
    >
      {element}
    </li>
  );
};
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
