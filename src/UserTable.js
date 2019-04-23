import React from "react";

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

  render() {
    return (
      <table>
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
    );
  }
}

export default UserTable;
