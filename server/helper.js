const users = [];

const addUser = ({ id, currentUser, currentChannel }) => {
  name = currentUser;
  channel = currentChannel;

  const existingUser = users.find(
    (user) => user.channel === channel && user.name === name
  );
  if (existingUser) {
    return { error: "UserName Already is Use" };
  } else {
    const user = { id, name, channel };
    users.push(user);
    return { user };
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersOnline = (channel) =>
  users.filter((user) => user.channel === channel);

const removeUser = (id) => {
  const idx = users.findIndex((user) => user.id === id);
  if (idx !== -1) {
    return users.splice(idx, 1)[0]; //remove 1 element in index 1
  }
};

module.exports = { addUser, getUser, getUsersOnline, removeUser };
