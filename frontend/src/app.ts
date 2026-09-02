import { LoginPage } from './pages/login'
import { DashboardPage } from './pages/dashboard'

const app = document.getElementById('app')
if (!app) throw new Error('No app element found')

const router = {
  current: 'login',

  render() {
    app.innerHTML = ''

    if (this.current === 'login') {
      const loginPage = new LoginPage()
      app.appendChild(loginPage.render())
    } else if (this.current === 'dashboard') {
      const dashboardPage = new DashboardPage()
      app.appendChild(dashboardPage.render())
    }
  },

  navigate(page: string) {
    this.current = page
    this.render()
  },
}

const token = localStorage.getItem('token')
if (token) {
  router.current = 'dashboard'
}

router.render()
