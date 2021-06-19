import React from "react";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);
//<SignOutButton />
const NavigationAuth = () => (
  <ul>  
    <li >
      <SignOutButton/>
    </li>
  </ul>
);

const NavigationNonAuth = () => (
    <div style={styles.container} className="container">
        <a style={styles.brandStyle}
        className="brand" href="/accounts/">Bilkent University Online Services</a>
            <ul style={styles.linkButtonsStyle} className="pull-right nav" id="yw1" role="menu">
                <a style={styles.textStyle} href="/accounts/site/language?language=tr"><i
                className="icon-flag icon-white"/> Türkçe</a>
            </ul>
        <ul>
        <li style={styles.textStyle}>
          <Link style={styles.textStyle} to={ROUTES.PASSWORD_FORGET}>Reset password</Link>
        </li>
        <li style={styles.textStyle}>
          <Link style={styles.textStyle} to={ROUTES.SIGN_IN}>Login</Link>
        </li>
        </ul>
    </div>
);

let styles = {
    container: {
        //paddingTop: 30,
        backgroundColor: "#003366",
        display: 'flex',
        justifyContent: 'center',

    },
    textStyle: {
        display: "inline-block",
        color: "#ffffff",
        fontFamily: "Arial",
        textDecoration: 0,
        marginRight: 30,
    },
    brandStyle: {
        fontSize: 20,
        fontWeight: 200,
        fontFamily: "Arial",
        color: "#ffffff",
        textDecoration: 0,
        padding: 12,
    },
    linkButtonsStyle: {
        //display: 'flex',
        marginLeft: 500,
        justifyContent: 'flex-end',
    },
};

export default Navigation;
