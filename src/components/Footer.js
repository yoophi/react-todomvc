import React, { useCallback } from "react";
import {
  SHOW_ACTIVE,
  SHOW_ALL,
  SHOW_COMPLETED,
} from "../constants/TodoFilters";

import PropTypes from "prop-types";
import classnames from "classnames";

const FILTER_TITLES = {
  [SHOW_ALL]: "All",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: "Completed",
};

const Footer = ({
  completedCount,
  activeCount,
  filter: selectedFilter,
  onClearCompleted,
  onShow,
}) => {
  const renderTodoCount = useCallback(() => {
    const itemWord = activeCount === 1 ? "item" : "items";

    return (
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
    );
  }, [activeCount]);

  const renderFilterLink = useCallback(
    (filter) => {
      const title = FILTER_TITLES[filter];

      return (
        <a
          className={classnames({ selected: filter === selectedFilter })}
          style={{ cursor: "pointer" }}
          onClick={() => onShow(filter)}
        >
          {title}
        </a>
      );
    },
    [selectedFilter, onShow]
  );

  const renderClearButton = useCallback(() => {
    if (completedCount > 0) {
      return (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      );
    }
  }, [completedCount, onClearCompleted]);

  return (
    <footer className="footer">
      {renderTodoCount()}
      <ul className="filters">
        {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map((filter) => (
          <li key={filter}>{renderFilterLink(filter)}</li>
        ))}
      </ul>
      {renderClearButton()}
    </footer>
  );
};

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
};

export default Footer;
