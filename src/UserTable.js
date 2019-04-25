import React from "react";

import "./UserTable.css";

import API from "./utils/API";

class UserTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    const usersData = await API.get("/users");

    this.setState({
      users: usersData.data,
    });
  }

  handleSearch = async (ev) => {
    const value = ev.target.value;
    const searchData = await API.get(`/users?name_like=${value}`);

    this.setState({
      users: searchData.data,
    });
  }

  render() {
    return (
      <div className="UserTable">
        <input type="text" onChange={this.handleSearch} />
        <table border="1">
          <tbody>
            {this.state.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserTable;
