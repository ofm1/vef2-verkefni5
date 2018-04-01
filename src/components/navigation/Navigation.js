import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Navigation.css';
import { Route, Switch, NavLink } from 'react-router-dom';
const url = process.env.REACT_APP_SERVICE_URL;

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {

  state = { data: null, loading: true, error: false, bold: false }

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false });
    } catch (e) {
      console.error('Villa við að sækja gögn', e);
      this.setState({ error: true, loading: false});
    }
  }

  async fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    return data.schools;
  }

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return (<div>Sæki Svið..</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gögn</div>);
    }

    return (
    <div>
     <nav>
          <ul>
            {data.map((school) => (
              <li key={school.slug}>
                <NavLink to={`/${school.slug}`}>{school.name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
    </div>
    );
  }
}
