import React from "react";

import "./UserTable.css";

import API from "./utils/API";

import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {Button, InputGroup, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import ConditionalModal from './ConditionalModal'


class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();


    this.state = {
      users: [],
      loading:true,
      pageSize:5,
      pageNumber: 0,
      pageCount: 3, // this is a hack - see readme!
      filterCriteria: "",
      showModal: false,
    };
  }

  async componentDidMount() {
        this.updateData(this.state.pageNumber, this.state.pageSize, this.state.filterCriteria)
  }

  async updateData(pageNumber, pageSize, searchFilter) {
    try {
        this.setState((state) => {return {...state, loading:true, showModal: false}})
        const usersData = await API.get(`/users?name_like=${searchFilter}&_page=${pageNumber}&_limit=${pageSize}`);
        this.setState((state) => {return {...state,
              users:usersData.data,
              loading:false,
              pageNumber:pageNumber,
              pageSize: pageSize,
              filterCriteria:searchFilter,
              showModal: false
        }})
    } catch(err) {
        this.setState((state) => { return {...this.state,
            users: [],
            loading:false,
            pageNumber: pageNumber,
            pageSize: pageSize,
            filterCriteria:searchFilter,
            showModal: true
        }})
      }
  }

   setPage(newPage) {
        this.updateData(newPage+1, this.state.pageSize, this.state.filterCriteria)
    }

    setNameFilter() {
       const filterValue = this.searchInputRef.current.value || ""
       this.updateData(this.state.pageNumber, this.state.pageSize, filterValue)
    }

  render() {
    return (
    <div>
        <ConditionalModal showModal={this.state.showModal} clickHandler={() => this.updateData(this.state.pageNumber, this.state.pageSize, this.state.filterCriteria)}/>
        <div style={{margin:20, width:800}}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <Button disabled={this.state.loading} variant="primary" onClick={() => {this.setNameFilter()}}>Search By Name</Button>
            </InputGroup.Prepend>
            <FormControl ref={this.searchInputRef} style={{marginLeft:3,width:200}} />
          <Button style = {{marginLeft:50}} disabled={this.state.loading} variant="primary"
                onClick={()=>{this.updateData(this.state.pageNumber, this.state.pageSize, this.state.filterCriteria)}}>Reload Page</Button>
          </InputGroup>
        </div>
        <ReactTable style={{margin:20}}
            columns = {[
                {
                    accessor: "user.id",
                    show: false
                },
                {
                    Header: "User Name",
                    accessor: "name",
                },
                {
                    Header: "User Email",
                    accessor: "email",
                }
            ]}
            data= {this.state.users}
            loading={this.state.loading}
            defaultPageSize={this.state.pageSize}
            pageSizeOptions = {[5]}
            onPageChange={(newPage) => this.setPage(newPage)}
            pages={this.state.pageCount}
            manual
            sortable={false}
         />
     </div>);
  }
}

export default UserTable;
