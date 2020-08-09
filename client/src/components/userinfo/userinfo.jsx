import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './style/userinfo.styles.scss';

function UserInfo({ currentUser, users }) {
  return (
    <div className="userinfo__container">
      <h4>Your Name :</h4>
      <p> {currentUser}</p>
      <h4>Users :</h4>
      {console.log(users)}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(UserInfo);
