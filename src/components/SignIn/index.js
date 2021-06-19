import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { PasswordForgetLink } from '../PasswordForget';


const SignInPage = () => (
  <div style={styles.container}>
    {/*<h1>SignIn</h1>*/}
    <h1/>
    <SignInForm />
    <PasswordForgetLink />
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
              <img style={styles.logoStyle} src="https://www.linkpicture.com/q/bilkent-logo.jpg" type="image"/>
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

        <label style={styles.inputBlockStyle}
               className="control-label required" htmlFor="LoginForm_username">Bilkent ID
            <span className="required">*</span>
        </label>

        <span style={styles.addOnStyle}
              className="add-on"><i className="icon-user"></i></span>
        <input
          style={styles.inputForIDStyle}
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <p id="LoginForm_username_em_" style={styles.helpBlockStyle} className="help-block">Bilkent ID cannot be blank.</p>
        <p style={styles.helpBlockStyle}
           className="help-block"><span>Personel ID number or Student ID number</span></p>

        <label className="control-label required" htmlFor="LoginForm_password">
            <label style={styles.inputBlockStyle}
              htmlFor="LoginForm_password" className="required">
              Password
              <span className="required">*</span>
          </label>
        </label>

        <span style={styles.pwAddOnStyle}
                className="add-on"><i className="icon-user"></i></span>
        <input
          style={styles.inputForPasswordStyle}
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <div/>
        <button style={styles.loginButtonStyle}
                disabled={isInvalid} type="submit"
            className="btn btn-bilkent" type="submit" name="yt0">Login
        </button>

        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        <div style={styles.alertErrorStyle} className="alert alert-error">
          <p>If you are having problems logging in, please check the time zone setting on your computer.</p>
          <p>Turkey no longer uses daylight saving time (DST). Your computer time zone setting should be set
              as <b>UTC+3</b>. </p>
        </div>
        <div style={styles.wellStyle} className="well">
          <p>Bilkent Computer Center uses this common login gateway page for user authenticaton. Most Bilkent
              University online services are accessed through this Secure Login Gateway.</p>
          <p><a style={styles.noUnderlineStyle} href="/accounts/reset-password">If you don't know your STARS or BAIS password, please click
              here.</a></p>
        </div>

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
        height: 80,
        width: 80,
        paddingBottom: 15,
        paddingLeft: 15,
    },
    subHeader: {
        color: "#999",
        fontSize: 22,
        lineHeight: 1.4,
        fontWeight: 'normal',
        display: 'block',
    },
    inputBlockStyle: {
        fontFamily: "Arial",
        cursor: "pointer",
        fontSize: 14,
        //lineHeight: 20,
        marginBottom: 5,
        float: "left",
        width: 160,
        paddingTop: 5,
        textAlign: 'right',
        //color: "#b94a48",
        color: "#999",
        //fontSize: 22,
        //lineHeight: 1.4,
        fontWeight: 'normal',
        //textAlign: 'right',
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
        paddingTop: 30,

    },
    divBorder: {
        borderBottom: "1px solid #e5e5e5",
        borderColor: "ff0000",
        borderHeight: 200,
        //marginLeft: 0,
        marginRight: 600,
        marginBottom: 20,
        size: 20,
    },
    alertErrorStyle: {
        //-webkit-text-size-adjust: 100%;
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 13,
        //lineHeight: 20,
        marginBottom: 20,
        marginTop: -180,
        marginRight: 620,
        marginLeft: 580,
        padding: "8px 35px 8px 10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        border: "1px solid #f0c36d",
        borderRadius: 2,
        backgroundColor: "#f2dede",
        textShadow: "0 1px 0 rgba(255, 255, 255, 0.5)",
        borderColor: "#d59595",
        color: "#b94a48",
    },
    wellStyle: {
        //webkitTextSizeAdjust: "100%",
        marginRight: 620,
        marginLeft: 580,
        //paddingTop: 10,
        paddingRight:580,
        fontFamily: "Arial",
        fontSize: 13,
        //lineHeight: 1,
        marginBottom: 20,
        color: "#333333",
        minHeight: 20,
        //padding: 19,
        padding: "15px 35px 15px 10px",
        backgroundColor: "#f1f1f1",
        border: "1px solid #e5e5e5",
        borderRadius: 0,
        boxShadow: 0,
    },
    noUnderlineStyle: {
        textDecoration: 0,
        color: "#014082",
    },

    inputForIDStyle: {
        whiteSpace: "nowrap",
        margin: 0,
        fontWeight: "normal",
        fontFamily: "Helvetica Neue",
        marginLeft: 0,
        width: 210,
        height: 20,
        lineHeight: 20,
        color: "#555",
        position: "relative",
        verticalAlign: "middle",
        padding: "4px 8px",
        fontSize: 13,
        boxShadow: "none",
        transition: "none",
        border: "1px solid #d9d9d9",
        borderRadius: "0 1px 1px 0",
        display: "inline-block",
        marginBottom: 30,
        cursor: "default",
        backgroundColor: "#FFF",
        /*marginLeft: -120,
        display: 'block',
        marginBottom: 30,*/
    },
    inputForPasswordStyle: {
        //-webkit-text-size-adjust: 100%,
        whiteSpace: "nowrap",
        margin: 0,
        fontWeight: "normal",
        fontFamily: "Helvetica Neue",
        marginLeft: 0,
        width: 210,
        height: 20,
        lineHeight: 20,
        color: "#555",
        position: "relative",
        verticalAlign: "middle",
        padding: "4px 8px",
        fontSize: 13,
        boxShadow: "none",
        transition: "none",
        border: "1px solid #d9d9d9",
        borderRadius: "0 1px 1px 0",
        display: "inline-block",
        marginBottom: 0,
        cursor: "default",
        backgroundColor: "#FFF",
        /*display: 'block',
        marginLeft: 100,*/
    },
    helpBlockStyle: {
        fontFamily: "Arial",
        //lineHeight: 20,
        //margin: "0 0 10px",
        marginLeft: 160,
        display: "block",
        //marginBottom: 0,
        fontSize: 11,
        color: "#b94a48",
        marginTop: -20,
        paddingBottom: 15,
    },

    loginButtonStyle: {
        //-webkit-text-size-adjust: 100%;
        webkitAppearance: "button",
        display: "inline-block",
        //lineHeight: 20,
        position: "relative",
        padding: "4px 12px",
        //margin: 10,
        marginLeft: 160,
        marginRight: 20,
        whiteSpace: "nowrap",
        fontFamily: "Arial",
        fontWeight: "bold",
        fontSize: 13,
        textAlign: "center",
        verticalAlign: "middle",
        webkitBackgroundClip: "padding",
        cursor: "default",
        borderRadius: 2,
        boxShadow: "none",
        border: "1px solid #013163",
        textShadow: "0 -1px 0 rgba(0, 0, 0, 0.25)",
        color: "#ffffff",
        backgroundColor: "#014082",
        backgroundImage: "linear-gradient(to bottom, #014a96, #013163)",
        backgroundRepeat: "repeat-x",
    },
    addOnStyle: {
        //-webkit-text-size-adjust: 100%;
        fontFamily: "Arial",
        whiteSpace: "nowrap",
        display: "inline-block",
        width: "auto",
        height: 20,
        minWidth: 16,
        padding: "4px 5px",
        fontSize: 14,
        fontWeight: "normal",
        lineHeight: 20,
        textAlign: "center",
        textShadow: "0 1px 0 #fff",
        border: "1px solid #ccc",
        verticalAlign: "top",
        marginRight: -1,
        borderRadius: "4px 0 0 4px",
        color: "#ccc",
        backgroundColor: "#eee",
        borderColor: "#ccc",
    },
    pwAddOnStyle: {
        fontFamily: "Arial",
        whiteSpace: "nowrap",
        display: "inline-block",
        width: "auto",
        height: 20,
        minWidth: 16,
        padding: "4px 5px",
        fontSize: 14,
        fontWeight: "normal",
        lineHeight: 20,
        textAlign: "center",
        textShadow: "0 1px 0 #fff",
        border: "1px solid #ccc",
        verticalAlign: "top",
        marginRight: -1,
        borderRadius: "4px 0 0 4px",
        color: "#ccc",
        backgroundColor: "#eee",
        borderColor: "#ccc",
        marginBottom: 25,
    },
};

