import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './style/userinfo.styles.scss';

function UserInfo({ currentUser }) {
  return (
    <div className="userinfo__container">
      <h4>Your Name :</h4>
      <p> {currentUser}</p>
      <h4>Users :</h4>
      <p>mary</p>
      <p>Jack</p>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(UserInfo);
