import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Department.css';

/**
 * Þessi component ætti að vera einfaldur í birtingu en taka fall frá foreldri
 * sem keyrir þegar smellt er á fyrirsögn.
 */

export default class Exams extends Component {

  static propTypes = {
    name: PropTypes.string,
    tests: PropTypes.JSON,
    visible: PropTypes.bool,
    onHeaderClick: PropTypes.func,
  }
  
  static defaultProps = {
    visible: false,
    onHeaderClick: () => {},
  }

  state = {
    sign: true
  }

  render() {
    const display = this.props.visible ? 'block' : 'none';
    const sign = this.props.visible ? '-' : '+';
    return (
      <section className="department">
         <p onClick={this.props.onHeaderClick}><p class = "sign">{sign}</p> {this.props.name}</p>
         <div style = {{display}}>
          <table>
            <thead>
              <tr>
                <th>Auðkenni</th>
                <th>Námskeið</th>
                <th>Fjöldi</th>
                <th>Dagsetning</th>
              </tr>
            </thead>
            <tbody>
            {this.props.tests.map((test) => (
                <tr>
                <td>{test.course}</td>
                <td>{test.name}</td>
                <td>{test.students}</td>
                <td>{test.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}
