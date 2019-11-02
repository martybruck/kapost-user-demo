import React from "react";
import { shallow, mount } from "enzyme";

import UserTable from "./UserTable";
import {Modal} from 'react-bootstrap'

jest.mock('axios');

it("renders without crashing", () => {
  shallow(<UserTable />);
});

it("sets name filter", () => {
    const wrapper = shallow(<UserTable/>)
    const instance = wrapper.instance()
    instance.setPage(1)
    expect(wrapper.state().pageNumber).toEqual(2);
    expect(wrapper.state().pageCount).toEqual(3);
    expect(wrapper.state().filterCriteria).toEqual("");

})

it("showModal flag controls modal dialog", () => {
    const wrapper = mount(<UserTable/>)
    wrapper.setState({ showModal: true });
    expect(wrapper.exists('.modal')).toEqual(true);
    wrapper.setState({ showModal: false });
    expect(wrapper.exists('.modal')).toEqual(false);
})
