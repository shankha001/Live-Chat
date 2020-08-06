const users = [];

const addUser = ({ id, currentUser, currentChannel }) => {
  name = currentUser;
  channel = currentChannel;

  const existingUser = users.find(
    (user) => user.channel === channel && user.name === name
  );
  if (existingUser) {
    // console.log('trigger');
    return { error: 'UserName Taken' };
  } else {
    const user = { id, name, channel };
    users.push(user);
    // console.log(users);

    return { user };
  }
};

const getUser = (id) => users.find((user) => user.id === id);

module.exports = { addUser };
