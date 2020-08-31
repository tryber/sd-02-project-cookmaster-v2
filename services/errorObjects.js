function UserNotFound(message = '') {
  this.message = `Usuário não foi encontrado.`;
  this.status = 404;
}

function UserAlreadyExists() {
  this.message = `Usuário com o mesmo e-mail já cadastrado.`;
  this.status = 400;
}

function UserDoesntOwnRecipe() {
  this.message = `O usuário não é dono da receita`;
  this.status = 403;
}

function AdminRightsRequired() {
  this.message = `Necessário credenciais de administrador`;
  this.status = 403;
}

function RecipesNotFound() {
  this.message = `Nenhuma receita foi encontrada.`
  this.status = 404
}

function TokenNotFound() {
  this.message = `Token não encontrado ou informado`;
  this.status = 404;
}

function UserWithTokenIdNotFound() {
  this.message = `Erro ao procurar usuario do token.`;
  this.status = 401;
}

function InvalidToken() {
  this.message = `Erro: Seu token é inválido`;
  this.status = 400;
}

function FileNotAttached() {
  this.message = `Arquivo não encontrado nos parâmetros da requisição`;
  this.status = 400;
}

function ImageNotUploaded() {
  this.message = `Falha ao adicionar imagem.`;
  this.status = 500;
}

function FailedToSave() {
  this.message = `Erro ao salvar o usuário no banco.`;
  this.status = 500;
}

function FailedToSaveRecipe() {
  this.message = `Erro ao salvar/atualizar a receita no banco.`;
  this.status = 500;
}

function FailedToDeleteRecipe() {
  this.message = `Erro ao deletar receita do banco.`;
  this.status = 500;
}

function MongoError(message, status) {
  this.name = 'MongoError';
  this.message = message || 'Mensagem de erro padrão';
  this.status = status || 500;
}

module.exports = {
  FailedToSave,
  UserNotFound,
  UserAlreadyExists,
  MongoError,
  TokenNotFound,
  UserWithTokenIdNotFound,
  InvalidToken,
  RecipesNotFound,
  FailedToSaveRecipe,
  UserDoesntOwnRecipe,
  FailedToDeleteRecipe,
  FileNotAttached,
  ImageNotUploaded,
  AdminRightsRequired,
};
