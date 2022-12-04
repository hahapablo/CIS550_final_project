import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
        <Navbar type="dark" theme="dark" expand="md">
          <NavbarBrand href="/">Spotify 2.0</NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink active  href="/search" >
                  Search
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active  href="/category" >
                  Category
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active  href="/lyrics" >
                  Lyrics
                </NavLink>
              </NavItem>
            </Nav>
        </Navbar>
        )
    }
}

export default MenuBar
