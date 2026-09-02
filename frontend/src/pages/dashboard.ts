export class DashboardPage {
  private container: HTMLDivElement

  constructor() {
    this.container = document.createElement('div')
  }

  render(): HTMLElement {
    this.container.style.display = 'flex'
    this.container.style.height = '100vh'
    this.container.style.backgroundColor = '#000000'

    // Sidebar
    const sidebar = document.createElement('aside')
    sidebar.style.width = '15rem'
    sidebar.style.backgroundColor = '#1a1a1a'
    sidebar.style.borderRight = '1px solid #2d2d2d'
    sidebar.style.display = 'flex'
    sidebar.style.flexDirection = 'column'
    sidebar.style.flexShrink = '0'

    // Logo
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

    // Navigation
    const nav = document.createElement('nav')
    nav.style.flex = '1'
    nav.style.padding = '1.5rem 1rem'
    nav.style.overflowY = 'auto'

    const navItems = [
      { label: 'Library', href: '#' },
      { label: 'Upload', href: '#' },
      { label: 'Settings', href: '#' },
    ]

    navItems.forEach((item) => {
      const link = document.createElement('a')
      link.href = item.href
      link.textContent = item.label
      link.style.display = 'block'
      link.style.padding = '0.5rem 1rem'
      link.style.color = '#a0a0a0'
      link.style.textDecoration = 'none'
      link.style.borderRadius = '0.5rem'
      link.style.marginBottom = '0.5rem'
      link.style.transition = 'background-color 200ms, color 200ms'
      link.onmouseover = () => {
        link.style.backgroundColor = '#2d2d2d'
        link.style.color = '#ffffff'
      }
      link.onmouseout = () => {
        link.style.backgroundColor = 'transparent'
        link.style.color = '#a0a0a0'
      }

      nav.appendChild(link)
    })

    // Footer
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
    signOut.onmouseover = () => {
      signOut.style.backgroundColor = '#2d2d2d'
      signOut.style.color = '#ffffff'
    }
    signOut.onmouseout = () => {
      signOut.style.backgroundColor = 'transparent'
      signOut.style.color = '#a0a0a0'
    }
    signOut.onclick = () => this.handleSignOut()

    footer.appendChild(signOut)

    sidebar.appendChild(logo)
    sidebar.appendChild(nav)
    sidebar.appendChild(footer)

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
    headerTitle.textContent = 'Library'
    headerTitle.style.fontSize = '1.5rem'
    headerTitle.style.fontWeight = 'bold'
    headerTitle.style.color = '#ffffff'
    headerTitle.style.margin = '0'

    header.appendChild(headerTitle)

    // Content
    const content = document.createElement('div')
    content.style.flex = '1'
    content.style.padding = '3rem 2rem'
    content.style.display = 'flex'
    content.style.flexDirection = 'column'
    content.style.alignItems = 'center'
    content.style.justifyContent = 'center'

    const icon = document.createElement('div')
    icon.textContent = '📁'
    icon.style.fontSize = '3rem'
    icon.style.marginBottom = '1rem'
    icon.style.opacity = '0.6'

    const title = document.createElement('h3')
    title.textContent = 'No media yet'
    title.style.fontSize = '1.125rem'
    title.style.fontWeight = '500'
    title.style.color = '#a0a0a0'
    title.style.margin = '0 0 0.5rem 0'

    const text = document.createElement('p')
    text.textContent = 'Upload files to get started'
    text.style.fontSize = '0.875rem'
    text.style.color = '#808080'
    text.style.margin = '0 0 1.5rem 0'

    const button = document.createElement('button')
    button.textContent = 'Upload'
    button.style.padding = '0.5rem 1rem'
    button.style.backgroundColor = '#2563eb'
    button.style.color = '#ffffff'
    button.style.border = 'none'
    button.style.borderRadius = '0.5rem'
    button.style.fontWeight = '500'
    button.style.cursor = 'pointer'
    button.style.transition = 'background-color 200ms'
    button.onmouseover = () => {
      button.style.backgroundColor = '#1d4ed8'
    }
    button.onmouseout = () => {
      button.style.backgroundColor = '#2563eb'
    }

    content.appendChild(icon)
    content.appendChild(title)
    content.appendChild(text)
    content.appendChild(button)

    main.appendChild(header)
    main.appendChild(content)

    this.container.appendChild(sidebar)
    this.container.appendChild(main)

    return this.container
  }

  private handleSignOut(): void {
    localStorage.removeItem('token')
    window.location.href = '/'
  }
}
