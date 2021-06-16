import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


const SignInPage = () => (
  <div style={styles.container}>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>

          <div style={styles.headerContainer}>
              <header>
                  <img style={styles.logoStyle} src="../../bilkent-logo.jpg"/>
                  <h1 style={styles.bilkentTitleStyle}>
                      Bilkent University
                      <span style={styles.subHeader} className="sub-header">Secure Login Gateway</span>
                  </h1>
              </header>
              <legend style={styles.legendStyle}>
                  Login :
                  <b>SRS</b> - Student Academic Information Registration System
              </legend>
              <div style={styles.divBorder}/>
          </div>

        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };

let styles = {
    container: {
        //paddingTop: 30,
        //backgroundColor: "#eee",
        paddingLeft: 420,
    },
    logoStyle: {
        height: 100,
        width: 100,
    },
    subHeader: {
        color: "#999",
        fontSize: 22,
        lineHeight: 1.4,
        fontWeight: 'normal',
        display: 'block',
    },
    bilkentTitleStyle: {
        marginTop: -100,
        color: "#014a96",
        paddingLeft: 120,
    },
    headerContainer: {
        display: 'wrap',
        //justifyContent: 'center',
        //alignItems: 'left',

    },
    legendStyle: {
        fontFamily: 'Arial',
        display: 'block',
        width: '100%',
        padding: 0,
        marginBottom: 20,
        fontSize: 21,
        //lineHeight: 40,
        color: '#333',
        border: 0,

    },
    divBorder: {
        borderBottom: "1px solid #e5e5e5",
       // borderBottomColor: '#ff0000',
        borderColor: "ff0000",
        borderHeight: 200,
        //marginLeft: 0,
        marginRight: 600,
        marginBottom: 20,
        size: 20,
    },

};

