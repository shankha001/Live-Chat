import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style/login.styles.scss";
import {
  setCurrentUser,
  setCurrentChannel,
} from "../../redux/user/user.actions";

import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

function Login({ setCurrentUser, setCurrentChannel, location }) {
  const [errormsg, seterrormsg] = useState("");
  useEffect(() => {
    if (location.state) {
      seterrormsg(location.state.error);
    }
  }, [location]);

  const [name, setName] = useState("");
  const [channel, setChannel] = useState("");

  return (
    <div>
      <div className="login-container">
        <h2 className="login-title">LIVE CHAT</h2>
        <FormControl required={true}>
          <TextField
            id="outlined-search"
            label="Enter Name"
            type="search"
            variant="outlined"
            className="login-input"
            onChange={(event) => setName(event.target.value)}
            required={true}
            value={name}
          />
          <TextField
            id="outlined-search"
            label="Enter Channel"
            type="search"
            variant="outlined"
            className="login-input"
            style={{ margin: "10px auto" }}
            onChange={(event) => setChannel(event.target.value)}
            required={true}
            value={channel}
          />

          <Link
            to="/chat"
            onClick={(e) => (!name || !channel ? e.preventDefault() : null)}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="primary"
              className="login-btn"
              style={{ margin: "10px auto" }}
              type="submit"
              onClick={() => {
                if (!name || !channel) {
                  return 0;
                } else {
                  setCurrentUser(name);
                  setCurrentChannel(channel);
                }
              }}
            >
              Login
            </Button>
          </Link>
          {errormsg}
        </FormControl>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setCurrentChannel: (user) => dispatch(setCurrentChannel(user)),
});

export default connect(null, mapDispatchToProps)(Login);
