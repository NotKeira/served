export class UploadPage {
  private container: HTMLDivElement

  constructor() {
    this.container = document.createElement('div')
  }

  render(): HTMLElement {
    this.container.style.display = 'flex'
    this.container.style.height = '100vh'
    this.container.style.backgroundColor = '#000000'

    // Sidebar (reusable)
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
    headerTitle.textContent = 'Upload'
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

    // Upload area
    const uploadArea = document.createElement('div')
    uploadArea.style.width = '100%'
    uploadArea.style.maxWidth = '32rem'
    uploadArea.style.padding = '2rem'
    uploadArea.style.border = '2px dashed #2d2d2d'
    uploadArea.style.borderRadius = '0.5rem'
    uploadArea.style.backgroundColor = 'transparent'
    uploadArea.style.textAlign = 'center'
    uploadArea.style.cursor = 'pointer'
    uploadArea.style.transition = 'border-color 200ms, background-color 200ms'

    uploadArea.onmouseover = () => {
      uploadArea.style.borderColor = '#2563eb'
      uploadArea.style.backgroundColor = '#0a0a0a'
    }

    uploadArea.onmouseout = () => {
      uploadArea.style.borderColor = '#2d2d2d'
      uploadArea.style.backgroundColor = 'transparent'
    }

    const icon = document.createElement('div')
    icon.textContent = '⬆️'
    icon.style.fontSize = '2rem'
    icon.style.marginBottom = '1rem'

    const title = document.createElement('h3')
    title.textContent = 'Drag and drop files here'
    title.style.fontSize = '1.125rem'
    title.style.fontWeight = '500'
    title.style.color = '#ffffff'
    title.style.margin = '0 0 0.5rem 0'

    const text = document.createElement('p')
    text.textContent = 'or click to select files'
    text.style.fontSize = '0.875rem'
    text.style.color = '#a0a0a0'
    text.style.margin = '0'

    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.multiple = true
    fileInput.style.display = 'none'

    uploadArea.appendChild(icon)
    uploadArea.appendChild(title)
    uploadArea.appendChild(text)
    uploadArea.appendChild(fileInput)

    uploadArea.onclick = () => fileInput.click()

    content.appendChild(uploadArea)

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
      link.style.color = item.page === 'upload' ? '#ffffff' : '#a0a0a0'
      link.style.backgroundColor = item.page === 'upload' ? '#2d2d2d' : 'transparent'
      link.style.textDecoration = 'none'
      link.style.borderRadius = '0.5rem'
      link.style.marginBottom = '0.5rem'
      link.style.transition = 'background-color 200ms, color 200ms'
      link.onclick = (e) => {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('navigate', { detail: { page: item.page } }))
      }
      link.onmouseover = () => {
        if (item.page !== 'upload') {
          link.style.backgroundColor = '#2d2d2d'
          link.style.color = '#ffffff'
        }
      }
      link.onmouseout = () => {
        if (item.page !== 'upload') {
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
