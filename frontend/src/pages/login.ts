export class LoginPage {
  private container: HTMLDivElement
  private emailInput: HTMLInputElement
  private passwordInput: HTMLInputElement
  private submitButton: HTMLButtonElement
  private errorMessage: HTMLDivElement

  constructor() {
    this.container = document.createElement('div')
    this.emailInput = document.createElement('input')
    this.passwordInput = document.createElement('input')
    this.submitButton = document.createElement('button')
    this.errorMessage = document.createElement('div')
  }

  render(): HTMLElement {
    this.container.className = 'min-h-screen flex items-center justify-center px-4'

    const card = document.createElement('div')
    card.className = 'w-full max-w-sm'

    const title = document.createElement('h1')
    title.className = 'text-4xl font-bold text-dark-50 mb-2'
    title.textContent = 'Served'

    const subtitle = document.createElement('p')
    subtitle.className = 'text-dark-300 mb-8'
    subtitle.textContent = 'Sign in to your media server'

    const form = document.createElement('form')
    form.onsubmit = (e) => this.handleSubmit(e)

    const emailGroup = document.createElement('div')
    emailGroup.className = 'mb-5'

    const emailLabel = document.createElement('label')
    emailLabel.className = 'block text-dark-300 text-sm mb-2'
    emailLabel.setAttribute('for', 'email')
    emailLabel.textContent = 'Email'

    this.emailInput.id = 'email'
    this.emailInput.type = 'email'
    this.emailInput.required = true
    this.emailInput.className = 'w-full bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 text-dark-50 text-sm placeholder-dark-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
    this.emailInput.placeholder = 'name@example.com'

    emailGroup.appendChild(emailLabel)
    emailGroup.appendChild(this.emailInput)

    const passwordGroup = document.createElement('div')
    passwordGroup.className = 'mb-6'

    const passwordLabel = document.createElement('label')
    passwordLabel.className = 'block text-dark-300 text-sm mb-2'
    passwordLabel.setAttribute('for', 'password')
    passwordLabel.textContent = 'Password'

    this.passwordInput.id = 'password'
    this.passwordInput.type = 'password'
    this.passwordInput.required = true
    this.passwordInput.className = 'w-full bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 text-dark-50 text-sm placeholder-dark-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
    this.passwordInput.placeholder = 'Password'

    passwordGroup.appendChild(passwordLabel)
    passwordGroup.appendChild(this.passwordInput)

    this.submitButton.type = 'submit'
    this.submitButton.className = 'w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-dark-50 font-medium py-2 rounded-lg transition-colors'
    this.submitButton.textContent = 'Sign In'

    this.errorMessage.className = 'mt-4 px-3 py-2 bg-red-900 border border-red-700 text-red-100 text-sm rounded-lg hidden'

    form.appendChild(emailGroup)
    form.appendChild(passwordGroup)
    form.appendChild(this.submitButton)
    form.appendChild(this.errorMessage)

    card.appendChild(title)
    card.appendChild(subtitle)
    card.appendChild(form)

    this.container.appendChild(card)

    return this.container
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault()

    this.submitButton.disabled = true
    this.errorMessage.classList.add('hidden')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.emailInput.value,
          password: this.passwordInput.value,
        }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      window.location.href = '/dashboard'
    } catch (error) {
      this.errorMessage.textContent = 'Invalid email or password'
      this.errorMessage.classList.remove('hidden')
    } finally {
      this.submitButton.disabled = false
    }
  }
}
