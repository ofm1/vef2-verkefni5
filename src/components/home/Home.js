import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import './Home.css';

const url = process.env.REACT_APP_SERVICE_URL;

/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */

export default class Home extends Component {

  state = { data: null, loading: true, error: false }

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
    const response = await fetch(`${url}stats`);
    const data = await response.json();
    return data.stats;
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
      <div class = "home">
         <Helmet title="" />
        <p>Fjöldi prófa: {data.numTests} </p>
        <p>Fjöldi nemenda í öllum prófum: {data.numStudents}</p>
        <p>Meðalfjöldi nemenda í prófi: {data.averageStudents}</p>
        <p>Minnsti fjöldi nemenda í prófi: {data.min}</p>
        <p>Mesti fjöldi nemenda í prófi: {data.max}</p>
    </div>
    );
  }
}
