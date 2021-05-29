import React, { useCallback, useState } from "react";
import {
  SHOW_ACTIVE,
  SHOW_ALL,
  SHOW_COMPLETED,
} from "../constants/TodoFilters";

import Footer from "./Footer";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo) => !todo.completed,
  [SHOW_COMPLETED]: (todo) => todo.completed,
};

const MainSection = ({ todos, actions }) => {
  const [filter, setFilter] = useState(SHOW_ALL);

  const handleClearCompleted = useCallback(() => {
    actions.clearCompleted();
  }, [actions]);

  const handleShow = useCallback(
    (filter) => {
      setFilter(filter);
    },
    [setFilter]
  );

  const renderToggleAll = useCallback(
    (completedCount) => {
      if (todos.length > 0) {
        return (
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todos.length}
            onChange={actions.completeAll}
          />
        );
      }
    },
    [todos, actions]
  );

  const renderFooter = useCallback(
    (completedCount) => {
      const activeCount = todos.length - completedCount;

      if (todos.length) {
        return (
          <Footer
            completedCount={completedCount}
            activeCount={activeCount}
            filter={filter}
            onClearCompleted={handleClearCompleted}
            onShow={handleShow}
          />
        );
      }
    },
    [todos, filter, handleClearCompleted, handleShow]
  );

  const filteredTodos = todos.filter(TODO_FILTERS[filter]);
  const completedCount = todos.reduce(
    (count, todo) => (todo.completed ? count + 1 : count),
    0
  );

  return (
    <section className="main">
      {renderToggleAll(completedCount)}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} {...actions} />
        ))}
      </ul>
      {renderFooter(completedCount)}
    </section>
  );
};

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

export default MainSection;
