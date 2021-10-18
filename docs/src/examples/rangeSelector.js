import React from 'react';
import momentJalaali from 'moment-jalaali';
import { Calendar } from '../../../src/components/Calendar';

class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {startDay: momentJalaali(), endDay: momentJalaali().add(3, 'days')},
      isGregorian: false
    };
  }

  getCustomFormat(inputValue, isGregorian) {
    if (!inputValue)
      return '';
    const inputFormat = isGregorian ? 'YYYY/M/D' : 'jYYYY/jM/jD';
    return isGregorian ? inputValue.locale('es').format(inputFormat) :
      inputValue.locale('fa').format(inputFormat);
  }

  render() {
    return <div>
      <Calendar
        value={this.state.value}
        isGregorian={this.state.isGregorian}
        isRangeSelector={true}
        onChange={value => { this.setState({ value }) }}
      />
      <br />
      <button
        onClick={() => this.setState({ isGregorian: !this.state.isGregorian })}>
        {this.state.isGregorian ? 'switch to jalaali' : 'switch to gregorian'}
      </button>
      <h2>
        start date: {this.getCustomFormat(this.state.value.startDay, this.state.isGregorian)}
        <br/>
        end date: {this.getCustomFormat(this.state.value.endDay, this.state.isGregorian)}
      </h2>
    </div>
  }
}

const title = 'RangeSelector';
const code = `import momentJalaali from 'moment-jalaali';
import { Calendar } from 'react-datepicker2';

class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali(),
      isGregorian: true
    };
  }

  getCustomFormat(inputValue, isGregorian) {
    if (!inputValue)
      return '';
    const inputFormat = isGregorian ? 'YYYY/M/D' : 'jYYYY/jM/jD';
    return isGregorian ? inputValue.locale('es').format(inputFormat) :
      inputValue.locale('fa').format(inputFormat);
  }

  render() {
    return <div>
      <Calendar
        value={this.state.value}
        isGregorian={this.state.isGregorian}
        onChange={value => { this.setState({ value }) }}
      />
      <br />
      <button
        onClick={() => this.setState({ isGregorian: !this.state.isGregorian })}>
        {this.state.isGregorian ? 'switch to jalaali' : 'switch to gregorian'}
      </button>
      <h2>
        selected date: {this.getCustomFormat(this.state.value, this.state.isGregorian)}
      </h2>
    </div>
  }
}
`;
const RangeSelector = { component, title, code };
export default RangeSelector;