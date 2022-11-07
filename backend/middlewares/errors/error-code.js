const BAD_REQUEST = 400; // Запрос не прошел валидацию
const NOT_AUTH = 401; // Передан неверный логин или пароль
const FORBIDDEN = 403; // Недостаточно прав для удаления карточки
const CONFLICT_ERROR = 409; // Такой email уже существует
const NOT_FOUND = 404; // Не найден ресурс по переданному id
const DEFAULT_ERROR = 500; // Что-то не так с сервером

module.exports = {
  BAD_REQUEST,
  NOT_AUTH,
  FORBIDDEN,
  CONFLICT_ERROR,
  NOT_FOUND,
  DEFAULT_ERROR,
};
