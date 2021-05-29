import React, { useCallback, useState } from "react";

import PropTypes from "prop-types";
import classnames from "classnames";

const TodoTextInput = ({ newTodo, editing, onSave, placeholder }) => {
  const [text, setText] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      const text = e.target.value.trim();
      if (e.which === 13) {
        onSave(text);
        if (newTodo) {
          setText("");
        }
      }
    },
    [onSave, newTodo, setText]
  );

  const handleChange = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [setText]
  );

  const handleBlur = useCallback(
    (e) => {
      if (!newTodo) {
        onSave(e.target.value);
      }
    },
    [newTodo, onSave]
  );

  return (
    <input
      className={classnames({
        edit: editing,
        "new-todo": newTodo,
      })}
      type="text"
      placeholder={placeholder}
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
};

TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool,
};

export default TodoTextInput;
