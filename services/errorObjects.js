function UserNotFound(message = '') {
  this.message = `Usuário não foi encontrado.`;
  this.status = 404;
}

function UserAlreadyExists() {
  this.message = `Usuário com o mesmo e-mail já cadastrado.`;
  this.status = 400;
}

function MongoError(message, status) {
  this.name = 'MongoError';
  this.message = message || 'Mensagem de erro padrão';
  this.status = status || 400;
}

module.exports = {
  UserNotFound,
  UserAlreadyExists,
  MongoError,
};
