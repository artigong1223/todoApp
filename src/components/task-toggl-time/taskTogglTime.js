import React from 'react';
import propTypes from 'prop-types';

function TaskTogglTime(props) {
  TaskTogglTime.defaultProps = {
    onStop: () => {},
    onPlay: () => {},
    onTick: () => {},
  };
  TaskTogglTime.propTypes = {
    done: propTypes.bool.isRequired,
    onStop: propTypes.func,
    onPlay: propTypes.func,
    min: propTypes.node.isRequired,
    sec: propTypes.node.isRequired,
  };
  const { min, sec, done, onTick, count, onPlay, onStop } = props;
  React.useEffect(() => {
    if (!done) {
      const interval = setInterval(() => {
        count && onTick();
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  });
  return (
    <span className="desc">
      <span
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
        }}
        className="icon icon-play"
      ></span>
      <span
        onClick={(e) => {
          e.stopPropagation();
          onStop();
        }}
        className="icon icon-pause"
      ></span>
      {min}:{sec}
    </span>
  );
}
export default TaskTogglTime;
