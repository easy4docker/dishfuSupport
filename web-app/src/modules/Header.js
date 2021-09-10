
import React, {useEffect, useState} from 'react';
import { Nav, /* NavDropdown, */ Navbar, Container, Badge } from 'react-bootstrap';
import { Link, useLocation  } from "react-router-dom";
import { RoleSection } from './common';
import { AuthHeadItem  }  from './mobileAuth';
import { Logo } from './common';

function Header(props) {
const [expanded, setExpanded] = useState("")

  const navItem = {
    authUsers:  {caption: 'User Admin', role: ['all'], linkTo: '/authUsers'},
    transTracking:  {caption: 'Transaction Report', role: ['all'], linkTo: '/transReport'}
  };
  const SelectedClass = (v)=> {
    const location = useLocation(); 
    return (location.pathname !== navItem[v].linkTo) ? 'menu-color' : 'menu-color-select';
  }
  const getNavLink = (v)=> {
    const item = !navItem[v] ? {role: []} : navItem[v],
          itemRole = (!item || !item.role) ? [] : item.role,
          itemExRole = (!item || !item.exrole) ? [] : item.exrole;
    const comp = ((item)=>(<Nav.Link as={Link} to={item.linkTo} className={SelectedClass(v)}
        onClick={()=> {  setExpanded(false); }}>{item.caption}</Nav.Link>))(item);

    return (<RoleSection roles={itemRole} comp={comp} exroles={itemExRole}  />);
  }
  useEffect(() => {
  }, []);

  return (
    <Container className="bg-info" fluid={true}>
      <Container>
        <Navbar expand="lg" className="p-1" expanded={expanded}>
            <Navbar.Brand as={Link} to="/" className="menu_color"><Logo/></Navbar.Brand>
            <Navbar.Brand as={Link} to="/auth" className="menu-color">
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {getNavLink('authUsers')}
                {getNavLink('transTracking')}
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </Container>
    </Container>
  );
}

export default Header;
