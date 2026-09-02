export class SettingsPage {
  private container: HTMLDivElement

  constructor() {
    this.container = document.createElement('div')
  }

  render(): HTMLElement {
    this.container.style.display = 'flex'
    this.container.style.height = '100vh'
    this.container.style.backgroundColor = '#000000'

    // Sidebar
    const sidebar = this.createSidebar()

    // Main
    const main = document.createElement('main')
    main.style.flex = '1'
    main.style.display = 'flex'
    main.style.flexDirection = 'column'
    main.style.overflowY = 'auto'

    // Header
    const header = document.createElement('header')
    header.style.padding = '1rem 2rem'
    header.style.borderBottom = '1px solid #2d2d2d'
    header.style.backgroundColor = '#000000'
    header.style.flexShrink = '0'

    const headerTitle = document.createElement('h2')
    headerTitle.textContent = 'Settings'
    headerTitle.style.fontSize = '1.5rem'
    headerTitle.style.fontWeight = 'bold'
    headerTitle.style.color = '#ffffff'
    headerTitle.style.margin = '0'

    header.appendChild(headerTitle)

    // Content
    const content = document.createElement('div')
    content.style.flex = '1'
    content.style.padding = '2rem'
    content.style.maxWidth = '48rem'

    // Account section
    const accountSection = document.createElement('div')
    accountSection.style.marginBottom = '2rem'

    const accountTitle = document.createElement('h3')
    accountTitle.textContent = 'Account'
    accountTitle.style.fontSize = '1rem'
    accountTitle.style.fontWeight = '500'
    accountTitle.style.color = '#ffffff'
    accountTitle.style.marginTop = '0'
    accountTitle.style.marginBottom = '1rem'

    const accountItem = document.createElement('div')
    accountItem.style.padding = '1rem'
    accountItem.style.backgroundColor = '#1a1a1a'
    accountItem.style.borderRadius = '0.5rem'
    accountItem.style.marginBottom = '0.5rem'

    const emailLabel = document.createElement('div')
    emailLabel.textContent = 'Email'
    emailLabel.style.fontSize = '0.875rem'
    emailLabel.style.color = '#a0a0a0'
    emailLabel.style.marginBottom = '0.25rem'

    const emailValue = document.createElement('div')
    emailValue.textContent = 'name@example.com'
    emailValue.style.fontSize = '1rem'
    emailValue.style.color = '#ffffff'

    accountItem.appendChild(emailLabel)
    accountItem.appendChild(emailValue)

    accountSection.appendChild(accountTitle)
    accountSection.appendChild(accountItem)

    // Storage section
    const storageSection = document.createElement('div')
    storageSection.style.marginBottom = '2rem'

    const storageTitle = document.createElement('h3')
    storageTitle.textContent = 'Storage'
    storageTitle.style.fontSize = '1rem'
    storageTitle.style.fontWeight = '500'
    storageTitle.style.color = '#ffffff'
    storageTitle.style.marginTop = '0'
    storageTitle.style.marginBottom = '1rem'

    const storageItem = document.createElement('div')
    storageItem.style.padding = '1rem'
    storageItem.style.backgroundColor = '#1a1a1a'
    storageItem.style.borderRadius = '0.5rem'

    const usageLabel = document.createElement('div')
    usageLabel.textContent = 'Storage Used'
    usageLabel.style.fontSize = '0.875rem'
    usageLabel.style.color = '#a0a0a0'
    usageLabel.style.marginBottom = '0.5rem'

    const usageValue = document.createElement('div')
    usageValue.textContent = '0 B / 1 TB'
    usageValue.style.fontSize = '1rem'
    usageValue.style.color = '#ffffff'
    usageValue.style.marginBottom = '1rem'

    const progressBar = document.createElement('div')
    progressBar.style.width = '100%'
    progressBar.style.height = '0.5rem'
    progressBar.style.backgroundColor = '#2d2d2d'
    progressBar.style.borderRadius = '0.25rem'
    progressBar.style.overflow = 'hidden'

    const progressFill = document.createElement('div')
    progressFill.style.width = '0%'
    progressFill.style.height = '100%'
    progressFill.style.backgroundColor = '#2563eb'

    progressBar.appendChild(progressFill)

    storageItem.appendChild(usageLabel)
    storageItem.appendChild(usageValue)
    storageItem.appendChild(progressBar)

    storageSection.appendChild(storageTitle)
    storageSection.appendChild(storageItem)

    content.appendChild(accountSection)
    content.appendChild(storageSection)

    main.appendChild(header)
    main.appendChild(content)

    this.container.appendChild(sidebar)
    this.container.appendChild(main)

    return this.container
  }

  private createSidebar(): HTMLElement {
    const sidebar = document.createElement('aside')
    sidebar.style.width = '15rem'
    sidebar.style.backgroundColor = '#1a1a1a'
    sidebar.style.borderRight = '1px solid #2d2d2d'
    sidebar.style.display = 'flex'
    sidebar.style.flexDirection = 'column'
    sidebar.style.flexShrink = '0'

    const logo = document.createElement('div')
    logo.style.padding = '1rem 1.5rem'
    logo.style.borderBottom = '1px solid #2d2d2d'

    const logoText = document.createElement('h1')
    logoText.textContent = 'Served'
    logoText.style.fontSize = '1.125rem'
    logoText.style.fontWeight = 'bold'
    logoText.style.color = '#ffffff'
    logoText.style.margin = '0'

    logo.appendChild(logoText)

    const nav = document.createElement('nav')
    nav.style.flex = '1'
    nav.style.padding = '1.5rem 1rem'
    nav.style.overflowY = 'auto'

    const navItems = [
      { label: 'Library', href: '#', page: 'library' },
      { label: 'Upload', href: '#', page: 'upload' },
      { label: 'Settings', href: '#', page: 'settings' },
    ]

    navItems.forEach((item) => {
      const link = document.createElement('a')
      link.href = item.href
      link.textContent = item.label
      link.style.display = 'block'
      link.style.padding = '0.5rem 1rem'
      link.style.color = item.page === 'settings' ? '#ffffff' : '#a0a0a0'
      link.style.backgroundColor = item.page === 'settings' ? '#2d2d2d' : 'transparent'
      link.style.textDecoration = 'none'
      link.style.borderRadius = '0.5rem'
      link.style.marginBottom = '0.5rem'
      link.style.transition = 'background-color 200ms, color 200ms'
      link.onclick = (e) => {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('navigate', { detail: { page: item.page } }))
      }
      link.onmouseover = () => {
        if (item.page !== 'settings') {
          link.style.backgroundColor = '#2d2d2d'
          link.style.color = '#ffffff'
        }
      }
      link.onmouseout = () => {
        if (item.page !== 'settings') {
          link.style.backgroundColor = 'transparent'
          link.style.color = '#a0a0a0'
        }
      }

      nav.appendChild(link)
    })

    const footer = document.createElement('div')
    footer.style.padding = '1rem'
    footer.style.borderTop = '1px solid #2d2d2d'

    const signOut = document.createElement('button')
    signOut.textContent = 'Sign Out'
    signOut.style.width = '100%'
    signOut.style.padding = '0.5rem 1rem'
    signOut.style.color = '#a0a0a0'
    signOut.style.backgroundColor = 'transparent'
    signOut.style.border = 'none'
    signOut.style.borderRadius = '0.5rem'
    signOut.style.fontSize = '0.875rem'
    signOut.style.cursor = 'pointer'
    signOut.style.textAlign = 'left'
    signOut.style.transition = 'background-color 200ms, color 200ms'
    signOut.onclick = () => this.handleSignOut()

    signOut.onmouseover = () => {
      signOut.style.backgroundColor = '#2d2d2d'
      signOut.style.color = '#ffffff'
    }

    signOut.onmouseout = () => {
      signOut.style.backgroundColor = 'transparent'
      signOut.style.color = '#a0a0a0'
    }

    footer.appendChild(signOut)

    sidebar.appendChild(logo)
    sidebar.appendChild(nav)
    sidebar.appendChild(footer)

    return sidebar
  }

  private handleSignOut(): void {
    localStorage.removeItem('token')
    window.location.href = '/'
  }
}
