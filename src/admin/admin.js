import styles from '../App.css';
import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import { getUserID, setAlgorithmName, setStudentIDView, setIsGraded, setGrade } from '../circuit/functions.js';
// Main Components
import NavBar from "../components/navBar.js";
import filterFactory, { textFilter, numberFilter, Comparator, selectFilter, dateFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { retrieveCircuits, gradeCircuit } from '../circuit/apicaller';
import { Button } from 'react-bootstrap';


// dummy data to use in the meantime.
const graded_select = {
  0: 'Not Graded',
  1: 'Graded'
};

var table_columns = [{
  dataField: 'student_id',
  text: 'Student ID',
  filter: textFilter(),
  headerStyle: () => {return{width:"15%"}},
}, {
  dataField: 'circuit_name',
  text: 'Algorithm Name',
  filter: textFilter(),
  headerStyle: () => {return{width:"15%"}},
}, {
  dataField: 'circuit_input',
  text: 'Algorithm Input',
  headerStyle: () => {return{width:"15%"}},
  filter: textFilter()
},{
  dataField: 'created_date',
  text: 'Submitted at',
  filter: dateFilter(),
  headerStyle: () => {return{width:"20%"}},
  sort: true
}, {
  dataField: 'is_graded',
  text: 'Graded',
  formatter: cell => graded_select[cell],
  filter: selectFilter({
    options: graded_select
  })
}, {
  dataField: 'algorithm_grade',
  text: 'Grade',
  headerStyle: () => {return{width:"10%"}},
}, {
  dataField: 'view',
  text: 'View',
  events: {
    onClick: (e, column, columnIndex, row) => {
      setStudentIDView(row.student_id);
      setAlgorithmName(row.circuit_name);
      setGrade(row.algorithm_grade);
      setIsGraded(row.is_graded);
      window.location.href = '/admin/dnd';
    }
  },
  formatter: (cellContent, row) => (
    <button class="btn btn-primary">View</button>
  ),
  headerStyle: () => {return{width:"12%"}},
}]

// Gets the length of the payload data to determine roof of pagination.
const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from } to { to } of { size } Results
  </span>
);

var tablePaginationOptions;

export default class Admin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      table_data: []
    };
  }

  async componentDidMount() {
    // Gets data before the render
    const is_admin = parseInt(localStorage.getItem('is_admin'));
    if (!is_admin) window.location.href = '/';
    else {
      var data = await this.getCircuits();
      this.setState({
        table_data: data
      });
      // Needs to be defined at this point because only now do we have a length for table_data
      tablePaginationOptions = {
        paginationSize: 4,
        pageStartIndex: 0,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: 'All', value: this.state.table_data.length
        }]
      };
    }
  }

  getCircuits = async () => {
    var list = [];
    const results = await retrieveCircuits({
      'is_submitted': 1
   });
    for (var i = 0; i < results['circuits'].length; i++) {
        list[i] = results['circuits'][i];
    }
    //console.log(list);
    return list;
  }

  onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('student_id', this.state.studentID);
    window.location.href = '/dnd';
  }

  render() {
    const admin_id = getUserID(false);
    const is_admin = parseInt(localStorage.getItem('is_admin'));
    if (admin_id && is_admin) {
      return (
        <BrowserRouter>
          <div className="App">
              <NavBar />
              <div><br></br></div>
              <div class="containerAdmin admin-table">
                  <BootstrapTable
                  bodyClasses="tbodyContainer"
                  keyField='student_id'
                  data={ this.state.table_data }
                  columns={ table_columns }
                  pagination={ paginationFactory(tablePaginationOptions) }
                  filter={ filterFactory() }  />
              </div>
          </div>
        </BrowserRouter>
      );
    } else {
      window.location.href = '/';
    }
  }
}
