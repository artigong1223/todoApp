import React from 'react';
import propTypes from 'prop-types';

export default class TaskTogglTime extends React.Component {
  static defaultProps = {
    onStop: () => {},
    onPlay: () => {},
    onTick: () => {},
  };
  static propTypes = {
    done: propTypes.bool.isRequired,
    onStop: propTypes.func,
    onPlay: propTypes.func,
    min: propTypes.node.isRequired,
    sec: propTypes.node.isRequired,
  };
  render() {
    const { onPlay, onStop, min, sec, done } = this.props;
    return (
      <span className="desc">
        <span
          onClick={(e) => {
            e.stopPropagation();
            !done ? onPlay() : null;
          }}
          className="icon icon-play"
        ></span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            !done ? onStop() : null;
          }}
          className="icon icon-pause"
        ></span>
        {min}:{sec}
      </span>
    );
  }
}
