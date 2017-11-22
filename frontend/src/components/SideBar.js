import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import leftside from '../leftside.jpg';

const SideBarItem = styled('div')`
  width: 178px;
`;

const SideBarDivider = styled('div')`
  width: 178px;
  height: 671px;
  background-image: url(${leftside});
  border-right: 1px solid black;
  float: left;
  text-align: center;
`;

const SideBar = ({ username, logout, role }) => (
  <SideBarDivider>
    {
      username === null ? undefined : <SideBarItem><Link to="/profile"><button className="sidebar-btn">Profile</button></Link></SideBarItem>
    }
    {
      role === 'companyAdmin' ? <SideBarItem><Link to="/addRep"><button className="sidebar-btn">Add representative</button></Link></SideBarItem> : undefined
    }
    {
      username === null ? <SideBarItem><Link to="/login"><button className="sidebar-btn">Log in</button></Link></SideBarItem> :
      <SideBarItem><button className="sidebar-btn" onClick={() => logout()}>Log out</button></SideBarItem>
    }
    {
      username === null ? <SideBarItem><Link to="/register"><button className="sidebar-btn">Create an account</button></Link></SideBarItem> : undefined
    }
  </SideBarDivider>
);

SideBar.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
  role: PropTypes.string,
};

SideBar.defaultProps = {
  username: null,
  role: null,
};

export default SideBar;
