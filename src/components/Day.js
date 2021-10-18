import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { persianNumber } from '../utils/persian';

export default class Day extends Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    isCurrentMonth: PropTypes.bool,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    isGregorian: PropTypes.bool
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.selected !== this.props.selected ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.isCurrentMonth !== this.props.isCurrentMonth ||
      nextProps.highlighted !== this.props.highlighted ||
      nextProps.isRangeEnd !== this.props.isRangeEnd ||
      nextProps.isRangeStart !== this.props.isRangeStart
    );
  }

  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    const { disabled, onClick, day } = this.props;
    if (disabled)
      return;

    if (onClick) {
      onClick(day);
    }
  }

  render() {
    const {
      day,
      disabled,
      selected,
      isCurrentMonth,
      onClick,
      styles,
      isGregorian,
      isToday,
      colors,
      highlighted,
      isRangeEnd,
      isRangeStart,
      ...rest
    } = this.props;

    const className = classnames(styles.dayWrapper, {
      [styles.selected]: selected,
      [styles.currentMonth]: isCurrentMonth,
      [styles.today]: isToday,
      [styles.disabled]: disabled,
    });

    const highlightContainer = classnames({
      [styles.highlighted]: highlighted,
      [styles.rangeend]: isRangeEnd,
      [styles.rangestart]: isRangeStart,
    })

    const highlightDotContainer = classnames("highLightDot-container", {
      [styles.disabled]: disabled
    });

    return (
      <div className={className}>
        <div className={highlightContainer}>
        <button type="button" onClick={this.handleClick.bind(this)} disabled={disabled} {...rest}>
          {isGregorian ? day.format('D') : persianNumber(day.format('jD'))}
        </button>
        </div>
        <div className={highlightDotContainer} onClick={this.handleClick.bind(this)}>
          {colors.map((x, i) => (
            <span key={i} className="highLightDot" style={{ backgroundColor: x }}></span>
          ))}
        </div>
      </div>
    );
  }
}
