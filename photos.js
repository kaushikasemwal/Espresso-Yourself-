// Photo Upload and Management System
class PhotoManager {
  constructor() {
    this.photos = this.loadPhotos();
    this.initializePhotoGallery();
  }

  loadPhotos() {
    const saved = sessionStorage.getItem('cafePhotos');
    return saved ? JSON.parse(saved) : [];
  }

  savePhotos() {
    sessionStorage.setItem('cafePhotos', JSON.stringify(this.photos));
  }

  addPhoto(cafeId, cafeName, photoData, caption = '') {
    const photo = {
      id: 'photo_' + Date.now(),
      cafeId: cafeId,
      cafeName: cafeName,
      photoData: photoData,
      caption: caption,
      timestamp: new Date().toISOString(),
      likes: 0
    };

    this.photos.unshift(photo);
    this.savePhotos();
    this.updatePhotoCount();
    this.initializePhotoGallery();
    
    // Update passport stats
    if (window.passport) {
      window.passport.passport.total_photos = (window.passport.passport.total_photos || 0) + 1;
      window.passport.passport.total_points += 5;
      window.passport.savePassport();
    }

    return photo;
  }

  removePhoto(photoId) {
    this.photos = this.photos.filter(p => p.id !== photoId);
    this.savePhotos();
    this.updatePhotoCount();
    this.initializePhotoGallery();
  }

  updatePhotoCount() {
    const totalPhotos = this.photos.length;
    const photoCountEls = document.querySelectorAll('.photo-count');
    photoCountEls.forEach(el => {
      el.textContent = totalPhotos;
    });
  }

  initializePhotoGallery() {
    const gallery = document.getElementById('photoGallery');
    if (!gallery) return;

    if (this.photos.length === 0) {
      gallery.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📸</div>
          <h3>No Photos Yet</h3>
          <p>Start capturing your coffee moments!</p>
        </div>
      `;
      return;
    }

    gallery.innerHTML = this.photos.map(photo => `
      <div class="photo-card" data-photo-id="${photo.id}">
        <div class="photo-image">
          <img src="${photo.photoData}" alt="${photo.cafeName}">
        </div>
        <div class="photo-info">
          <div class="photo-cafe-name">${photo.cafeName}</div>
          ${photo.caption ? `<div class="photo-caption">${photo.caption}</div>` : ''}
          <div class="photo-meta">
            <span class="photo-date">${this.formatDate(photo.timestamp)}</span>
            <button class="photo-like-btn" onclick="photoManager.likePhoto('${photo.id}')">
              ❤️ ${photo.likes}
            </button>
          </div>
          <button class="photo-delete-btn" onclick="photoManager.confirmDeletePhoto('${photo.id}')">
            🗑️ Delete
          </button>
        </div>
      </div>
    `).join('');
  }

  likePhoto(photoId) {
    const photo = this.photos.find(p => p.id === photoId);
    if (photo) {
      photo.likes++;
      this.savePhotos();
      this.initializePhotoGallery();
    }
  }

  confirmDeletePhoto(photoId) {
    if (confirm('Are you sure you want to delete this photo?')) {
      this.removePhoto(photoId);
    }
  }

  formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  openPhotoUpload(cafeId, cafeName) {
    const modal = document.getElementById('photoUploadModal');
    if (!modal) {
      this.createPhotoUploadModal();
    }
    
    document.getElementById('uploadCafeName').textContent = cafeName;
    document.getElementById('uploadCafeId').value = cafeId;
    document.getElementById('photoUploadModal').classList.add('active');
  }

  createPhotoUploadModal() {
    const modal = document.createElement('div');
    modal.id = 'photoUploadModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="modal-close" onclick="photoManager.closePhotoUpload()">&times;</span>
        <h2>📸 Upload Photo</h2>
        <p>Add a photo from your visit to <strong id="uploadCafeName"></strong></p>
        <input type="hidden" id="uploadCafeId">
        
        <div class="upload-area" id="uploadArea">
          <input type="file" id="photoInput" accept="image/*" style="display: none;">
          <div class="upload-placeholder" onclick="document.getElementById('photoInput').click()">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📷</div>
            <p>Click to select a photo</p>
            <p style="font-size: 0.85rem; color: var(--medium-brown); margin-top: 0.5rem;">
              or drag and drop
            </p>
          </div>
          <div id="imagePreview" class="image-preview hidden"></div>
        </div>
        
        <textarea id="photoCaption" placeholder="Add a caption (optional)" rows="3"></textarea>
        
        <div class="modal-actions">
          <button class="btn" onclick="photoManager.closePhotoUpload()">Cancel</button>
          <button class="btn btn-accent" onclick="photoManager.uploadPhoto()">Upload Photo</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Setup file input handler
    document.getElementById('photoInput').addEventListener('change', (e) => {
      this.handleFileSelect(e);
    });

    // Setup drag and drop
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.processFile(files[0]);
      }
    });
  }

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  processFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = document.getElementById('imagePreview');
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
      preview.classList.remove('hidden');
      document.querySelector('.upload-placeholder').style.display = 'none';
      this.currentPhotoData = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  uploadPhoto() {
    if (!this.currentPhotoData) {
      alert('Please select a photo first');
      return;
    }

    const cafeId = document.getElementById('uploadCafeId').value;
    const cafeName = document.getElementById('uploadCafeName').textContent;
    const caption = document.getElementById('photoCaption').value;

    this.addPhoto(cafeId, cafeName, this.currentPhotoData, caption);
    this.closePhotoUpload();
    
    alert('📸 Photo uploaded successfully!');
  }

  closePhotoUpload() {
    const modal = document.getElementById('photoUploadModal');
    if (modal) {
      modal.classList.remove('active');
      document.getElementById('photoCaption').value = '';
      document.getElementById('imagePreview').classList.add('hidden');
      document.getElementById('imagePreview').innerHTML = '';
      document.querySelector('.upload-placeholder').style.display = 'flex';
      this.currentPhotoData = null;
    }
  }
}

// Initialize photo manager
let photoManager;
document.addEventListener('DOMContentLoaded', () => {
  photoManager = new PhotoManager();
});