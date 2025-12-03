V-Tube PWA package (created for user)
Files created:
- index.html                (updated HTML with manifest + service worker registration)
- manifest.json
- sw.js                     (service worker)
- icons/icon-192.png
- icons/icon-512.png

To test locally:
1. Serve the /mnt/data/vtube_pwa folder over HTTP (browsers won't register service worker from file://).
   Example: python -m http.server 8000 (run from the vtube_pwa directory)
2. Open http://localhost:8000/index.html
3. In DevTools > Application, check Manifest + Service Worker + Icons.

Note: All files reference paths under /vtube_pwa/ which match where these files are saved here.
