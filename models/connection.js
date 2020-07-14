const mysqlx = require('@mysql/xdevapi');

const connection = () => (
  mysqlx.getSession({
    user: 'root',
    password: 'password',
    host: 'localhost',
    port: 33060,
    schema: 'cookmaster',
  })
  // .then((session) => {
  //   console.log(session)
  //   // return session.getSchema('cookmaster');
  // })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
);

module.exports = connection;