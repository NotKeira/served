export class DashboardPage {
  private container: HTMLDivElement

  constructor() {
    this.container = document.createElement('div')
  }

  render(): HTMLElement {
    this.container.className = 'flex h-screen bg-dark-950'

    const sidebar = document.createElement('aside')
    sidebar.className = 'w-60 bg-dark-900 border-r border-dark-800 flex flex-col'

    const logo = document.createElement('div')
    logo.className = 'px-6 py-4 border-b border-dark-800'

    const logoText = document.createElement('h1')
    logoText.className = 'text-lg font-bold text-dark-50'
    logoText.textContent = 'Served'

    logo.appendChild(logoText)

    const nav = document.createElement('nav')
    nav.className = 'flex-1 px-4 py-6'

    const navItems = [
      { label: 'Library', href: '#' },
      { label: 'Upload', href: '#' },
      { label: 'Settings', href: '#' },
    ]

    navItems.forEach((item) => {
      const link = document.createElement('a')
      link.href = item.href
      link.className = 'block px-4 py-2 text-dark-300 hover:text-dark-50 hover:bg-dark-800 rounded-lg mb-2 transition-colors'
      link.textContent = item.label
      nav.appendChild(link)
    })

    const footer = document.createElement('div')
    footer.className = 'px-4 py-4 border-t border-dark-800'

    const signOut = document.createElement('button')
    signOut.className = 'w-full px-4 py-2 text-dark-300 hover:text-dark-50 hover:bg-dark-800 rounded-lg transition-colors text-sm'
    signOut.textContent = 'Sign Out'
    signOut.onclick = () => this.handleSignOut()

    footer.appendChild(signOut)

    sidebar.appendChild(logo)
    sidebar.appendChild(nav)
    sidebar.appendChild(footer)

    const main = document.createElement('main')
    main.className = 'flex-1 overflow-auto'

    const header = document.createElement('header')
    header.className = 'bg-dark-900 border-b border-dark-800 px-8 py-4'

    const headerTitle = document.createElement('h2')
    headerTitle.className = 'text-2xl font-bold text-dark-50'
    headerTitle.textContent = 'Library'

    header.appendChild(headerTitle)

    const content = document.createElement('div')
    content.className = 'p-8'

    const emptyState = document.createElement('div')
    emptyState.className = 'text-center py-12'

    const emptyIcon = document.createElement('div')
    emptyIcon.className = 'text-4xl text-dark-700 mb-4'
    emptyIcon.textContent = '📁'

    const emptyTitle = document.createElement('h3')
    emptyTitle.className = 'text-lg font-medium text-dark-300 mb-2'
    emptyTitle.textContent = 'No media yet'

    const emptyText = document.createElement('p')
    emptyText.className = 'text-dark-400 text-sm mb-6'
    emptyText.textContent = 'Upload files to get started'

    const uploadButton = document.createElement('button')
    uploadButton.className = 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-dark-50 font-medium px-4 py-2 rounded-lg transition-colors'
    uploadButton.textContent = 'Upload'

    emptyState.appendChild(emptyIcon)
    emptyState.appendChild(emptyTitle)
    emptyState.appendChild(emptyText)
    emptyState.appendChild(uploadButton)

    content.appendChild(emptyState)

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
