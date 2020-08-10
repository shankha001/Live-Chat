const users = [];

const addUser = ({ id, currentUser, currentChannel }) => {
  name = currentUser;
  channel = currentChannel;

  const existingUser = users.find(
    (user) => user.channel === channel && user.name === name
  );
  if (existingUser) {
    return { error: 'UserName Taken' };
  } else {
    const user = { id, name, channel };
    users.push(user);
    return { user };
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersOnline = (channel) =>
  users.filter((user) => user.channel === channel);

module.exports = { addUser, getUser, getUsersOnline };
