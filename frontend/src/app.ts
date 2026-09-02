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

// Error modal
class ErrorModal {
  private overlay: HTMLDivElement | null = null

  show(filename: string, reason: string): void {
    this.overlay = document.createElement('div')
    this.overlay.style.position = 'fixed'
    this.overlay.style.top = '0'
    this.overlay.style.left = '0'
    this.overlay.style.right = '0'
    this.overlay.style.bottom = '0'
    this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    this.overlay.style.display = 'flex'
    this.overlay.style.alignItems = 'center'
    this.overlay.style.justifyContent = 'center'
    this.overlay.style.zIndex = '10000'

    const modal = document.createElement('div')
    modal.style.backgroundColor = '#1a1a1a'
    modal.style.border = '1px solid #2d2d2d'
    modal.style.borderRadius = '0.5rem'
    modal.style.padding = '2rem'
    modal.style.maxWidth = '28rem'
    modal.style.color = '#ffffff'

    const titleEl = document.createElement('h2')
    titleEl.textContent = 'Upload Error'
    titleEl.style.fontSize = '1.25rem'
    titleEl.style.fontWeight = 'bold'
    titleEl.style.margin = '0 0 1rem 0'
    titleEl.style.color = '#ef4444'

    const filenameEl = document.createElement('div')
    filenameEl.textContent = filename
    filenameEl.style.fontSize = '0.875rem'
    filenameEl.style.color = '#a0a0a0'
    filenameEl.style.marginBottom = '0.5rem'
    filenameEl.style.overflow = 'hidden'
    filenameEl.style.textOverflow = 'ellipsis'
    filenameEl.style.whiteSpace = 'nowrap'

    const reasonEl = document.createElement('div')
    reasonEl.textContent = reason
    reasonEl.style.fontSize = '0.875rem'
    reasonEl.style.color = '#ffffff'
    reasonEl.style.backgroundColor = '#2d2d2d'
    reasonEl.style.padding = '0.75rem'
    reasonEl.style.borderRadius = '0.25rem'
    reasonEl.style.marginBottom = '1.5rem'

    const button = document.createElement('button')
    button.textContent = 'Close'
    button.style.width = '100%'
    button.style.padding = '0.5rem 1rem'
    button.style.backgroundColor = '#2563eb'
    button.style.color = '#ffffff'
    button.style.border = 'none'
    button.style.borderRadius = '0.25rem'
    button.style.cursor = 'pointer'
    button.style.fontSize = '0.875rem'
    button.style.fontWeight = '500'
    button.onclick = () => this.close()

    modal.appendChild(titleEl)
    modal.appendChild(filenameEl)
    modal.appendChild(reasonEl)
    modal.appendChild(button)

    this.overlay.appendChild(modal)
    this.overlay.onclick = (e) => {
      if (e.target === this.overlay) this.close()
    }

    document.body.appendChild(this.overlay)
  }

  private close(): void {
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay)
      this.overlay = null
    }
  }
}

// Overview modal
class OverviewModal {
  private overlay: HTMLDivElement | null = null

  show(completed: number, failed: number, uploadHistory: any[]): void {
    this.overlay = document.createElement('div')
    this.overlay.style.position = 'fixed'
    this.overlay.style.top = '0'
    this.overlay.style.left = '0'
    this.overlay.style.right = '0'
    this.overlay.style.bottom = '0'
    this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    this.overlay.style.display = 'flex'
    this.overlay.style.alignItems = 'center'
    this.overlay.style.justifyContent = 'center'
    this.overlay.style.zIndex = '10000'
    this.overlay.style.overflowY = 'auto'

    const modal = document.createElement('div')
    modal.style.backgroundColor = '#1a1a1a'
    modal.style.border = '1px solid #2d2d2d'
    modal.style.borderRadius = '0.5rem'
    modal.style.padding = '2rem'
    modal.style.maxWidth = '32rem'
    modal.style.width = '90vw'
    modal.style.maxHeight = '70vh'
    modal.style.color = '#ffffff'
    modal.style.overflowY = 'auto'
    modal.style.margin = 'auto'

    const titleEl = document.createElement('h2')
    titleEl.textContent = 'Upload Summary'
    titleEl.style.fontSize = '1.25rem'
    titleEl.style.fontWeight = 'bold'
    titleEl.style.margin = '0 0 1.5rem 0'

    const statsContainer = document.createElement('div')
    statsContainer.style.display = 'grid'
    statsContainer.style.gridTemplateColumns = '1fr 1fr'
    statsContainer.style.gap = '1rem'
    statsContainer.style.marginBottom = '1.5rem'

    const completedBox = document.createElement('div')
    completedBox.style.backgroundColor = '#2d2d2d'
    completedBox.style.padding = '1rem'
    completedBox.style.borderRadius = '0.25rem'
    completedBox.style.textAlign = 'center'

    const completedNum = document.createElement('div')
    completedNum.textContent = completed.toString()
    completedNum.style.fontSize = '1.5rem'
    completedNum.style.fontWeight = 'bold'
    completedNum.style.color = '#10b981'

    const completedLabel = document.createElement('div')
    completedLabel.textContent = 'Completed'
    completedLabel.style.fontSize = '0.75rem'
    completedLabel.style.color = '#a0a0a0'
    completedLabel.style.marginTop = '0.25rem'

    completedBox.appendChild(completedNum)
    completedBox.appendChild(completedLabel)

    const failedBox = document.createElement('div')
    failedBox.style.backgroundColor = '#2d2d2d'
    failedBox.style.padding = '1rem'
    failedBox.style.borderRadius = '0.25rem'
    failedBox.style.textAlign = 'center'

    const failedNum = document.createElement('div')
    failedNum.textContent = failed.toString()
    failedNum.style.fontSize = '1.5rem'
    failedNum.style.fontWeight = 'bold'
    failedNum.style.color = '#ef4444'

    const failedLabel = document.createElement('div')
    failedLabel.textContent = 'Failed'
    failedLabel.style.fontSize = '0.75rem'
    failedLabel.style.color = '#a0a0a0'
    failedLabel.style.marginTop = '0.25rem'

    failedBox.appendChild(failedNum)
    failedBox.appendChild(failedLabel)

    statsContainer.appendChild(completedBox)
    statsContainer.appendChild(failedBox)

    const listEl = document.createElement('div')
    listEl.style.borderTop = '1px solid #2d2d2d'
    listEl.style.paddingTop = '1.5rem'
    listEl.style.marginBottom = '1.5rem'
    listEl.style.maxHeight = '25vh'
    listEl.style.overflowY = 'auto'

    uploadHistory.forEach((upload: any) => {
      const itemEl = document.createElement('div')
      itemEl.style.marginBottom = '0.75rem'
      itemEl.style.fontSize = '0.875rem'
      itemEl.style.cursor = 'pointer'
      itemEl.style.padding = '0.5rem'
      itemEl.style.borderRadius = '0.25rem'
      itemEl.style.transition = 'background-color 200ms'

      itemEl.onmouseover = () => {
        itemEl.style.backgroundColor = '#2d2d2d'
      }
      itemEl.onmouseout = () => {
        itemEl.style.backgroundColor = 'transparent'
      }

      const nameEl = document.createElement('div')
      nameEl.textContent = upload.filename
      nameEl.style.color = '#ffffff'
      nameEl.style.overflow = 'hidden'
      nameEl.style.textOverflow = 'ellipsis'
      nameEl.style.whiteSpace = 'nowrap'

      const statusEl = document.createElement('div')
      statusEl.textContent = `${upload.success ? '✓ Completed' : '✗ Failed'} • ${upload.duration} • ${upload.size}`
      statusEl.style.color = upload.success ? '#10b981' : '#ef4444'
      statusEl.style.fontSize = '0.75rem'
      statusEl.style.marginTop = '0.25rem'

      itemEl.appendChild(nameEl)
      itemEl.appendChild(statusEl)

      if (!upload.success && upload.error) {
        itemEl.onclick = () => {
          const errorModal = new ErrorModal()
          errorModal.show(upload.filename, upload.error)
        }
      }

      listEl.appendChild(itemEl)
    })

    const closeBtn = document.createElement('button')
    closeBtn.textContent = 'Close'
    closeBtn.style.width = '100%'
    closeBtn.style.padding = '0.5rem 1rem'
    closeBtn.style.backgroundColor = '#2563eb'
    closeBtn.style.color = '#ffffff'
    closeBtn.style.border = 'none'
    closeBtn.style.borderRadius = '0.25rem'
    closeBtn.style.cursor = 'pointer'
    closeBtn.style.fontSize = '0.875rem'
    closeBtn.style.fontWeight = '500'
    closeBtn.onclick = () => this.close()

    modal.appendChild(titleEl)
    modal.appendChild(statsContainer)
    modal.appendChild(listEl)
    modal.appendChild(closeBtn)

    this.overlay.appendChild(modal)
    this.overlay.onclick = (e) => {
      if (e.target === this.overlay) this.close()
    }

    document.body.appendChild(this.overlay)
  }

  private close(): void {
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay)
      this.overlay = null
    }
  }
}

// Upload tracker
class UploadTracker {
  private uploads: Map<string | number, any> = new Map()
  private container: HTMLDivElement
  private uploadHistory: any[] = []
  private isCollapsed: boolean = false

  constructor() {
    this.createContainer()
  }

  private createContainer(): void {
    this.container = document.createElement('div')
    this.container.style.position = 'fixed'
    this.container.style.bottom = '1rem'
    this.container.style.right = '1rem'
    this.container.style.zIndex = '9998'
    this.container.style.width = '20rem'
    document.body.appendChild(this.container)
  }

  private renderHeader(): HTMLElement {
    const header = document.createElement('div')
    header.style.backgroundColor = '#1a1a1a'
    header.style.border = '1px solid #2d2d2d'
    header.style.borderBottom = this.isCollapsed ? '1px solid #2d2d2d' : 'none'
    header.style.borderRadius = '0.5rem'
    header.style.padding = '0.75rem 1rem'
    header.style.display = 'flex'
    header.style.justifyContent = 'space-between'
    header.style.alignItems = 'center'
    header.style.cursor = 'pointer'
    header.style.color = '#ffffff'
    header.style.fontSize = '0.875rem'

    const info = document.createElement('div')
    const completed = Array.from(this.uploads.values()).filter((u: any) => u.completed).length
    const total = this.uploads.size
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0
    info.textContent = `${total} files • ${progress}%`

    const toggleBtn = document.createElement('button')
    toggleBtn.textContent = this.isCollapsed ? '▼' : '▲'
    toggleBtn.style.background = 'none'
    toggleBtn.style.border = 'none'
    toggleBtn.style.color = '#a0a0a0'
    toggleBtn.style.cursor = 'pointer'
    toggleBtn.style.fontSize = '0.75rem'
    toggleBtn.onclick = (e) => {
      e.stopPropagation()
      this.isCollapsed = !this.isCollapsed
      this.render()
    }

    header.appendChild(info)
    header.appendChild(toggleBtn)
    return header
  }

  private render(): void {
    this.container.innerHTML = ''
    this.container.appendChild(this.renderHeader())

    if (!this.isCollapsed) {
      const list = document.createElement('div')
      list.style.maxHeight = '50vh'
      list.style.overflowY = 'auto'

      this.uploads.forEach((upload: any) => {
        list.appendChild(upload.element)
      })

      if (this.uploads.size === 0 && this.uploadHistory.length > 0) {
        const viewBtn = document.createElement('button')
        viewBtn.textContent = 'View Overview'
        viewBtn.style.width = '100%'
        viewBtn.style.padding = '0.75rem'
        viewBtn.style.backgroundColor = '#2563eb'
        viewBtn.style.color = '#ffffff'
        viewBtn.style.border = 'none'
        viewBtn.style.borderBottomLeftRadius = '0.5rem'
        viewBtn.style.borderBottomRightRadius = '0.5rem'
        viewBtn.style.cursor = 'pointer'
        viewBtn.style.fontSize = '0.875rem'
        viewBtn.onclick = () => {
          const completed = this.uploadHistory.filter((u: any) => u.success).length
          const failed = this.uploadHistory.filter((u: any) => !u.success).length
          const overviewModal = new OverviewModal()
          overviewModal.show(completed, failed, this.uploadHistory)
        }
        list.appendChild(viewBtn)
      }

      this.container.appendChild(list)
    }
  }

  addUpload(id: string | number, filename: string): void {
    const uploadEl = document.createElement('div')
    uploadEl.id = `upload-${id}`
    uploadEl.style.backgroundColor = '#1a1a1a'
    uploadEl.style.border = '1px solid #2d2d2d'
    uploadEl.style.borderRadius = '0'
    uploadEl.style.borderBottom = '1px solid #2d2d2d'
    uploadEl.style.padding = '1rem'
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
    statusEl.textContent = '0% • 0 MB/s • calculating...'
    statusEl.style.fontSize = '0.75rem'
    statusEl.style.color = '#a0a0a0'
    statusEl.style.marginTop = '0.5rem'

    uploadEl.appendChild(nameEl)
    uploadEl.appendChild(progressContainer)
    uploadEl.appendChild(statusEl)

    this.uploads.set(id, { element: uploadEl, progress: 0, completed: false, startTime: Date.now() })
    this.render()
  }

  updateProgress(id: string | number, progress: number, chunksCurrent?: number, chunksTotal?: number, speed?: number): void {
    const progressBar = document.getElementById(`progress-${id}`)
    if (progressBar) {
      progressBar.style.width = `${progress}%`
    }

    const statusEl = document.getElementById(`status-${id}`)
    if (statusEl) {
      const chunks = chunksTotal ? `${chunksCurrent}/${chunksTotal} chunks` : 'calculating...'
      const speedText = speed ? `${speed.toFixed(1)} MB/s` : '0 MB/s'
      const eta = this.calculateETA(progress, speed)
      statusEl.textContent = `${progress}% • ${speedText} • ${eta}`
    }

    if (this.uploads.has(id)) {
      const upload = this.uploads.get(id)
      upload.progress = progress
    }
  }

  private calculateETA(progress: number, speed?: number): string {
    if (!speed || speed === 0 || progress === 100) return '0s'
    const remaining = 100 - progress
    const seconds = (remaining / 100) * (100 / speed) * 60
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}m ${secs}s`
  }

  complete(id: string | number, success: boolean = true, size?: string, error?: string): void {
    const upload = this.uploads.get(id)
    if (!upload) return

    const statusEl = document.getElementById(`status-${id}`)
    const progressBar = document.getElementById(`progress-${id}`)
    const duration = ((Date.now() - upload.startTime) / 1000).toFixed(1)

    if (statusEl) {
      if (success) {
        statusEl.textContent = `✓ Complete • ${duration}s • ${size || '0 B'}`
        statusEl.style.color = '#10b981'
      } else {
        statusEl.textContent = `✗ Failed • ${error || 'Unknown error'}`
        statusEl.style.color = '#ef4444'
      }
    }

    if (progressBar) {
      progressBar.style.backgroundColor = success ? '#10b981' : '#ef4444'
      progressBar.style.width = '100%'
    }

    upload.completed = true

    const filename = upload.element.querySelector('div')?.textContent || 'Unknown'
    this.uploadHistory.push({
      filename,
      success,
      duration: `${duration}s`,
      size: size || '0 B',
      error: error
    })

    if (this.uploads.size === this.uploadHistory.length) {
      this.render()
    }
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

export { notificationManager, uploadTracker, NotificationManager, ErrorModal, OverviewModal, UploadTracker }
