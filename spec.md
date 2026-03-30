# Blindfold Cinema

## Current State
New project. Empty backend and frontend scaffolding only.

## Requested Changes (Diff)

### Add
- Hero section with bold tagline and cinematic background
- Content library/gallery with category filtering (Audio Books, Stories, Movies)
- Search bar for filtering content
- Media upload section for creators to submit content (title, description, category, file)
- Individual content detail pages with audio/video playback
- Sample content entries to showcase layout
- Footer with Blindfold Cinema branding and Archit Tola credit

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: Store content metadata (id, title, description, category, creator, fileKey, thumbnailKey, createdAt). CRUD operations for content. Blob storage for media files and thumbnails.
2. Frontend: Dark cinematic theme. Hero section. Browse/gallery view with category tabs and search. Upload form. Content detail modal/page with playback. Footer.
3. Components: blob-storage for media files, authorization for creator uploads.
