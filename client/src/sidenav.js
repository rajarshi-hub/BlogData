import React from 'react'
import SideNav from 'react-simple-sidenav'
import SideNavItems from './sidenavitems'
const Nav=(props)=>{
    return(
    <SideNav
        showNav={props.showNav}
        onHideNav={props.onHideNav}
        navStyle={{
            background:"#242424",
            maxWidth:'260px'
        }}
        >
            <SideNavItems/>
            </SideNav>
    );

}
export default Nav;