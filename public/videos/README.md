# Videos Directory

## Launch Video

Place your AMP launch video here as `amp-launch.mp4`.

### Video Requirements:
- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Duration**: 2-5 minutes recommended
- **File Size**: Keep under 50MB for optimal loading
- **Aspect Ratio**: 16:9

### Optimization Tips:
```bash
# Using FFmpeg to optimize video:
ffmpeg -i original.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k amp-launch.mp4
```

### Alternative Hosting:
For better performance, consider hosting the video on:
- YouTube (embed with tracking)
- Vimeo (professional presentation)
- Azure Media Services (full control)
- CDN (fastest loading)

Then update the `videoUrl` prop in the LaunchVideo component to point to the hosted URL.
