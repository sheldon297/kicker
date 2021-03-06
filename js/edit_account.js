/* global apiPost */

async function Submit () { // eslint-disable-line no-unused-vars
  const data = {
    action: '',
    name: document.getElementById('userNameInput').value,
    email: document.getElementById('mailInput').value,
    password: document.getElementById('passwordInput').value,
    telephone: document.getElementById('phoneNumberInput').value

  }

  // validate user input
  if (!await ValidateUserInput(data)) {
    return
  }

  // submit and save changes
  data.action = 'editAccount'
  const res = await apiPost(data)
  if (res.success) {
    window.location.replace('/account')
  }
}

async function LoadEntries () { // eslint-disable-line no-unused-vars
  // reset entries with user data
  const data = {
    action: 'getUserData'
  }
  const res = await apiPost(data)
  if (res.success !== true) {
    window.location.replace('/login')
  }
  document.getElementById('mailInput').value = res.email
  document.getElementById('userNameInput').value = res.name
  document.getElementById('phoneNumberInput').value = res.telephone
  // delete password entry (placeholder indicates a password is set)
  document.getElementById('passwordInput').value = ''

  document.getElementById('errorLabel').innerHTML = ''
}

async function ValidateUserInput (data) {
  data.action = 'validateInput'
  const res = await apiPost(data)
  const label = document.getElementById('errorLabel')

  if (!res.validEmail) {
    label.innerHTML = 'Ungültige Email Adresse'
    return false
  }
  if (data.password !== '') {
    if (!res.validPassword) {
      label.innerHTML = 'Ungültiges Passwort (mind. 8 Zeichen aus Klein-/Großbuchstaben, Zahlen & Sonderzeichen)'
      return false
    }
  }
  if (!res.validName) {
    label.innerHTML = 'Ungültiger Nutzername (mind. 5 Zeichen aus A-Z, a-z, 0-9, _, -)'
    return false
  }

  return true
}
