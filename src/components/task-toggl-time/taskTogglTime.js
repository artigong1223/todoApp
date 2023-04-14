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
    min: propTypes.number.isRequired,
    sec: propTypes.number.isRequired,
  };
  render() {
    const { onPlay, onStop, min, sec, done } = this.props;
    return (
      <span className="desc">
        <span
          onClick={(e) => {
            e.stopPropagation();
            done ? null : onPlay();
          }}
          className="icon icon-play"
        ></span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            done ? null : onStop();
          }}
          className="icon icon-pause"
        ></span>
        {min}:{sec}
      </span>
    );
  }
}
