function contentInput() {
  const userInput = document.getElementById('userInput')
  const user = document.getElementById('user')
  const valueUser = user.value

  const passwordInput = document.getElementById('passwordInput')
  const password = document.getElementById('password')
  const valuePassword = password.value

  if (valueUser) {
    userInput.classList.add('completed')
  } else {
    userInput.classList.remove('completed')
  }

  if (valuePassword) {
    passwordInput.classList.add('completed')
  } else {
    passwordInput.classList.remove('completed')
  }

  const button = document.getElementById('button')
  if (valueUser && valuePassword) {
    button.disabled = false
    button.classList.add('enable')
  } else {
    button.disabled = true
    button.classList.remove('enable')
  }
}

function login() {
  const errorCredencials = document.querySelector('.errorCredencials')
  errorCredencials.classList.add('enable')

  const user = document.getElementById('user')
  const valueUser = user.value

  const password = document.getElementById('password')
  const valuePassword = password.value

  const arrayDataUser = []
  arrayDataUser.push(`${valueUser}`)
  arrayDataUser.push(`${valuePassword}`)
  const joinArray = arrayDataUser.join(':')
  const valueEncoded = btoa(`${joinArray}`)

  function validateCredentials() {
    const urlApi =
      'https://run.mocky.io/v3/675b34d2-b51e-4a76-8520-85a6102e306c'

    fetch(urlApi)
      .then(response => response.json())
      .then(result => {
        const payloadApiUsers = result.users
        const userExists = payloadApiUsers.find(
          usersApi => usersApi.username === valueUser
        )

        if (userExists) {
          const payloadApiEncoded = userExists.encodedCredentials
          const verifyValueEncoded = payloadApiEncoded.match(valueEncoded)

          errorCredencials.classList.add('enable')
          if (verifyValueEncoded) {
            window.location.href = './welcome/welcome.html'

            const onlyDescriptionWelcome = document.querySelector(
              '.onlyDescriptionWelcome'
            )

            onlyDescriptionWelcome.innerHTML = `Bem vindo ${userExists.name}!`
          } else {
            errorCredencials.innerHTML = 'Credenciais informadas inválidas'
          }
        } else {
          errorCredencials.innerHTML = 'Usuário não encontrado'
        }
      })
  }
  validateCredentials()
}

/* ========== FORGOT PASSWORD ========== */

function verifyEmail() {
  const email = document.getElementById('emailForgotPass')
  const valueEmail = email.value

  const patternEmail = email.pattern
  const resultPattern = valueEmail.match(patternEmail)

  const button = document.getElementById('sendEmail')

  const inputEmail = document.querySelector('.inputEmail')
  if (valueEmail) {
    const textError = document.querySelector('.textError')

    textError.classList.add('enable')
    inputEmail.classList.add('focus')
    textError.innerHTML = 'Informe um e-mail válido'

    if (resultPattern) {
      textError.classList.remove('enable')
      button.disabled = false
      button.classList.add('enable')
    } else {
      button.disabled = true
      button.classList.remove('enable')
    }
  } else {
    inputEmail.classList.remove('focus')
  }
}

function sendEmail() {
  const email = document.getElementById('emailForgotPass')
  const valueEmail = email.value

  const textError = document.querySelector('.textError')

  const urlApi = 'https://run.mocky.io/v3/675b34d2-b51e-4a76-8520-85a6102e306c'

  fetch(urlApi)
    .then(response => response.json())
    .then(result => {
      const validateEmail = result.users.find(
        findEmail => findEmail.email === valueEmail
      )

      if (validateEmail) {
        const verifyValueEmail = validateEmail.email.match(valueEmail)
        if (verifyValueEmail) {
          const successPassword = document.querySelector(
            '.containerForgotPasword'
          )
          const descriptionTitle = document.querySelector('.descriptionTitle')
          const onlyDescription = document.querySelector('.onlyDescription')

          successPassword.classList.add('successPassword')

          descriptionTitle.innerHTML =
            'Enviamos um link para o seu e-mail cadastrado.'
          onlyDescription.innerHTML = 'Cheque na sua caixa de entrada. :)'
        } else {
          textError.classList.add('enable')
          textError.innerHTML = 'Usuário não encontrado'
        }
      } else {
        textError.classList.add('enable')
        textError.innerHTML = 'Usuário não encontrado'
      }
    })
}
