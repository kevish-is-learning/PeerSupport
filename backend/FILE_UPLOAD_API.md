# File Upload API Documentation

This document describes the file upload endpoints for avatars and resumes in the PeerSupport application.

## Overview

The application now supports local file uploads for:
- **User Profile Pictures (Avatars)**: For all users
- **Resumes**: For mentors and mentees

All uploaded files are stored locally in the `backend/uploads/` directory and served as static files via the `/uploads/` route.

## Upload Endpoints

### 1. Avatar Upload

**Endpoint**: `POST /api/users/avatar`

**Authentication**: Required (JWT)

**Content-Type**: `multipart/form-data`

**Request Body**:
- `avatar` (file): Image file (JPEG, PNG, GIF, WebP)
- Max file size: 5MB

**Response**:
```json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "data": {
    "profilePicture": "/uploads/avatars/avatar-{userId}-{timestamp}.jpg"
  }
}
```

**Example (curl)**:
```bash
curl -X POST http://localhost:8080/api/users/avatar \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "avatar=@/path/to/image.jpg"
```

### 2. Delete Avatar

**Endpoint**: `DELETE /api/users/avatar`

**Authentication**: Required (JWT)

**Response**:
```json
{
  "success": true,
  "message": "Avatar deleted successfully",
  "data": null
}
```

### 3. Upload Resume (Mentor)

**Endpoint**: `POST /api/mentor/resumes/upload`

**Authentication**: Required (JWT, MENTOR role)

**Content-Type**: `multipart/form-data`

**Request Body**:
- `resume` (file): Resume file (PDF, DOC, DOCX)
- `name` (text): Resume name/description
- Max file size: 10MB

**Response**:
```json
{
  "success": true,
  "message": "Resume uploaded successfully",
  "data": {
    "id": "resume-id",
    "name": "My Resume",
    "fileUrl": "/uploads/resumes/resume-{userId}-{timestamp}.pdf",
    "createdAt": "2026-03-10T12:00:00.000Z"
  }
}
```

**Example (curl)**:
```bash
curl -X POST http://localhost:8080/api/mentor/resumes/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "resume=@/path/to/resume.pdf" \
  -F "name=My Professional Resume"
```

### 4. Upload Resume (Mentee)

**Endpoint**: `POST /api/mentee/resumes/upload`

**Authentication**: Required (JWT, MENTEE role)

**Content-Type**: `multipart/form-data`

**Request Body**: Same as mentor resume upload

**Response**: Same as mentor resume upload

### 5. Get Resumes (Mentor)

**Endpoint**: `GET /api/mentor/resumes`

**Authentication**: Required (JWT, MENTOR role)

**Response**:
```json
{
  "success": true,
  "message": "Resumes retrieved successfully",
  "data": [
    {
      "id": "resume-id",
      "name": "My Resume",
      "fileUrl": "/uploads/resumes/resume-{userId}-{timestamp}.pdf",
      "createdAt": "2026-03-10T12:00:00.000Z"
    }
  ]
}
```

### 6. Get Resumes (Mentee)

**Endpoint**: `GET /api/mentee/resumes`

**Authentication**: Required (JWT, MENTEE role)

**Response**: Same as mentor get resumes

### 7. Delete Resume (Mentor)

**Endpoint**: `DELETE /api/mentor/resumes/:resumeId`

**Authentication**: Required (JWT, MENTOR role)

**Response**:
```json
{
  "success": true,
  "message": "Resume deleted successfully",
  "data": null
}
```

### 8. Delete Resume (Mentee)

**Endpoint**: `DELETE /api/mentee/resumes/:resumeId`

**Authentication**: Required (JWT, MENTEE role)

**Response**: Same as mentor delete resume

## File Validation

### Avatar Files
- **Allowed formats**: JPEG, JPG, PNG, GIF, WebP
- **Max size**: 5MB
- **Storage location**: `backend/uploads/avatars/`

### Resume Files
- **Allowed formats**: PDF, DOC, DOCX
- **Max size**: 10MB
- **Storage location**: `backend/uploads/resumes/`

## Error Responses

### File Too Large
```json
{
  "success": false,
  "message": "File size too large",
  "error": "File too large"
}
```

### Invalid File Type (Avatar)
```json
{
  "success": false,
  "message": "Only image files (JPEG, PNG, GIF, WebP) are allowed for avatars"
}
```

### Invalid File Type (Resume)
```json
{
  "success": false,
  "message": "Only PDF and DOC/DOCX files are allowed for resumes"
}
```

### No File Uploaded
```json
{
  "success": false,
  "message": "No file uploaded"
}
```

## Frontend Integration

### JavaScript/Fetch Example

```javascript
// Upload Avatar
async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch('http://localhost:8080/api/users/avatar', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  return await response.json();
}

// Upload Resume
async function uploadResume(file, name, role) {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('name', name);

  const endpoint = role === 'MENTOR' 
    ? 'http://localhost:8080/api/mentor/resumes/upload'
    : 'http://localhost:8080/api/mentee/resumes/upload';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  return await response.json();
}
```

### React Example

```jsx
import { useState } from 'react';

function AvatarUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('http://localhost:8080/api/users/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        console.log('Avatar uploaded:', data.data.profilePicture);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Avatar</button>
    </div>
  );
}
```

## Notes

1. **File Storage**: All files are stored locally in the `backend/uploads/` directory
2. **File Deletion**: When replacing an avatar or deleting a resume, the old file is automatically removed from disk
3. **Static File Serving**: Uploaded files are accessible via `/uploads/{avatars|resumes}/{filename}`
4. **Security**: Files are validated for type and size before storage
5. **Git Ignore**: The `uploads/` directory is excluded from version control

## Directory Structure

```
backend/
├── uploads/           # Created automatically on first upload
│   ├── avatars/      # User profile pictures
│   └── resumes/      # Resume documents
└── src/
    ├── middleware/
    │   └── upload.middleware.js  # Multer configuration
    └── controllers/
        ├── UserController.js     # Avatar upload handlers
        ├── MentorController.js   # Mentor resume handlers
        └── MenteeController.js   # Mentee resume handlers
```

## Testing

You can test the upload endpoints using:
1. **Postman**: Set the request type to `multipart/form-data` and add the file field
2. **curl**: Use the examples provided above
3. **Frontend**: Use the code examples for JavaScript/React integration
