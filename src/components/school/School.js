import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import './School.css';
import Department from '../department'
import { Route, Switch, NavLink } from 'react-router-dom';
const url = process.env.REACT_APP_SERVICE_URL;
/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {
  
  state = { 
    data: null, 
    loading: true, 
    error: false, 
    visible: null,}

  onHeaderClick = (departmentName) => {
    return (e) => {
      const visible = this.state.visible === departmentName ? null : departmentName;
      this.setState({ visible });
    }
  }


  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false });
    } catch (e) {
      console.error('Villa við að sækja gögn', e);
      this.setState({ error: true, loading: false});
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.componentDidMount();
  }

  async fetchData() {
    const { match } = this.props;
    const school = match.params.school;
    const response = await fetch(`${url}${school}`);
    console.log(`${url}${school}`);
    const data = await response.json();
    return data.school;
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
      <section className="school">
      <Helmet title={data.heading} />
      <h2>{data.heading}</h2>
      
      {data.departments.map((heading) => {
        return (
          <Department 
          name = {heading.heading}
          tests = {heading.tests}
          visible = {this.state.visible === heading.heading}
          onHeaderClick={(this.onHeaderClick(heading.heading))} />
        )
      })}
      <NavLink to={`/`}>Heim</NavLink>
      </section>
    );
  }
}
