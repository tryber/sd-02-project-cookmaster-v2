const mysqlx = require('@mysql/xdevapi');

const connection = () => mysqlx.getSession({
  user: 'root',
  password: 'password',
  host: 'localhost',
  port: 33060,
  schema: 'project_cookmaster_v2',
})
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;
