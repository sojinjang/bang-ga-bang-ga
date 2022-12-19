function isName(name) {
  return /^[가-힣]{2,4}/.test(name);
}
function isNickName(nickname) {
  return /^[가-힣a-zA-Z0-9]{3,12}$/.test(nickname);
}
function isNum(numStr) {
  return /^[0-9]+$/.test(numStr);
}

function isPhoneNumber(phoneNumberiInput) {
  const phoneNumberRegExp = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
  return phoneNumberRegExp.test(phoneNumberiInput);
}

function isValidEmail(emailiInput) {
  const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return emailRegExp.test(emailiInput);
}

function isValidPassword(passwordInput) {
  const passwordRegExp = /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
  return passwordRegExp.test(passwordInput);
}

export { isName, isNickName, isNum, isPhoneNumber, isValidEmail, isValidPassword };
