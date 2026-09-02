// Notification system
class NotificationManager {
  private notifications: any[] = []
  private container: HTMLDivElement

  constructor() {
    this.createContainer()
  }

  private createContainer(): void {
    this.container = document.createElement('div')
    this.container.style.position = 'fixed'
    this.container.style.top = '1rem'
    this.container.style.right = '1rem'
    this.container.style.zIndex = '9999'
    this.container.style.pointerEvents = 'none'
    document.body.appendChild(this.container)
  }

  show(message: string, type: string = 'info', duration: number = 4000): HTMLElement {
    const notification = document.createElement('div')
    notification.style.backgroundColor = this.getColor(type)
    notification.style.color = '#ffffff'
    notification.style.padding = '1rem'
    notification.style.borderRadius = '0.5rem'
    notification.style.marginBottom = '0.5rem'
    notification.style.fontSize = '0.875rem'
    notification.style.maxWidth = '24rem'
    notification.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.5)'
    notification.style.animation = 'slideIn 300ms ease-out'
    notification.style.pointerEvents = 'auto'
    notification.textContent = message

    this.container.appendChild(notification)

    if (duration > 0) {
      setTimeout(() => {
        notification.style.animation = 'slideOut 300ms ease-in'
        setTimeout(() => {
          this.container.removeChild(notification)
        }, 300)
      }, duration)
    }

    return notification
  }

  private getColor(type: string): string {
    switch (type) {
      case 'success':
        return '#059669'
      case 'error':
        return '#dc2626'
      case 'warning':
        return '#d97706'
      case 'info':
      default:
        return '#2563eb'
    }
  }
}

// Upload tracker
class UploadTracker {
  private uploads: Map<string | number, any> = new Map()
  private container: HTMLDivElement

  constructor() {
    this.createContainer()
  }

  private createContainer(): void {
    this.container = document.createElement('div')
    this.container.style.position = 'fixed'
    this.container.style.top = '1rem'
    this.container.style.right = '1rem'
    this.container.style.zIndex = '9998'
    this.container.style.width = '20rem'
    this.container.style.maxHeight = '50vh'
    this.container.style.overflowY = 'auto'
    document.body.appendChild(this.container)
  }

  addUpload(id: string | number, filename: string): void {
    const uploadEl = document.createElement('div')
    uploadEl.id = `upload-${id}`
    uploadEl.style.backgroundColor = '#1a1a1a'
    uploadEl.style.border = '1px solid #2d2d2d'
    uploadEl.style.borderRadius = '0.5rem'
    uploadEl.style.padding = '1rem'
    uploadEl.style.marginBottom = '0.5rem'
    uploadEl.style.color = '#ffffff'

    const nameEl = document.createElement('div')
    nameEl.textContent = filename
    nameEl.style.fontSize = '0.875rem'
    nameEl.style.marginBottom = '0.5rem'
    nameEl.style.overflow = 'hidden'
    nameEl.style.textOverflow = 'ellipsis'
    nameEl.style.whiteSpace = 'nowrap'

    const progressContainer = document.createElement('div')
    progressContainer.style.width = '100%'
    progressContainer.style.height = '0.25rem'
    progressContainer.style.backgroundColor = '#2d2d2d'
    progressContainer.style.borderRadius = '0.125rem'
    progressContainer.style.overflow = 'hidden'

    const progressBar = document.createElement('div')
    progressBar.id = `progress-${id}`
    progressBar.style.height = '100%'
    progressBar.style.backgroundColor = '#2563eb'
    progressBar.style.width = '0%'
    progressBar.style.transition = 'width 200ms ease'

    progressContainer.appendChild(progressBar)

    const statusEl = document.createElement('div')
    statusEl.id = `status-${id}`
    statusEl.textContent = 'Uploading...'
    statusEl.style.fontSize = '0.75rem'
    statusEl.style.color = '#a0a0a0'
    statusEl.style.marginTop = '0.5rem'

    uploadEl.appendChild(nameEl)
    uploadEl.appendChild(progressContainer)
    uploadEl.appendChild(statusEl)

    this.container.appendChild(uploadEl)
    this.uploads.set(id, { element: uploadEl, progress: 0 })
  }

  updateProgress(id: string | number, progress: number): void {
    const progressBar = document.getElementById(`progress-${id}`)
    if (progressBar) {
      progressBar.style.width = `${progress}%`
    }
    if (this.uploads.has(id)) {
      this.uploads.get(id).progress = progress
    }
  }

  complete(id: string | number, success: boolean = true): void {
    const upload = this.uploads.get(id)
    if (!upload) return

    const statusEl = document.getElementById(`status-${id}`)
    const progressBar = document.getElementById(`progress-${id}`)

    if (success) {
      statusEl!.textContent = 'Complete'
      statusEl!.style.color = '#10b981'
      progressBar!.style.backgroundColor = '#10b981'
    } else {
      statusEl!.textContent = 'Failed'
      statusEl!.style.color = '#ef4444'
      progressBar!.style.backgroundColor = '#ef4444'
    }

    setTimeout(() => {
      upload.element.style.animation = 'slideOut 300ms ease-in'
      setTimeout(() => {
        this.container.removeChild(upload.element)
        this.uploads.delete(id)
      }, 300)
    }, 2000)
  }
}

const notificationManager = new NotificationManager()
const uploadTracker = new UploadTracker()

// Add animations
const style = document.createElement('style')
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

export { notificationManager, uploadTracker }
