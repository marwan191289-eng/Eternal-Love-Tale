export function normalizeImageUrl(url: string): string {
  // Direct image URL (already good)
  if (/\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url)) return url;

  // Google Drive
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;

  // Dropbox
  const dropboxMatch = url.match(/www\.dropbox\.com\/s\/[^/]+\/([^?]+)\?dl=0/);
  if (dropboxMatch) return url.replace("?dl=0", "?raw=1");

  // Imgur (direct image or album cover)
  const imgurMatch = url.match(/imgur\.com\/(?:gallery\/)?([a-zA-Z0-9]+)/);
  if (imgurMatch) return `https://i.imgur.com/${imgurMatch[1]}.jpeg`; // Default to JPEG, often works

  // Pinterest (extract image from pin page)
  const pinterestMatch = url.match(/pinterest\.com\/pin\/(\d+)/);
  if (pinterestMatch) {
    // This is complex and usually requires server-side scraping or API. For client-side, best to ask for direct link.
    // Returning original for now, or could try a generic image proxy if available.
    return url;
  }

  // Instagram (post link, usually needs scraping or API for direct image)
  const instagramMatch = url.match(/instagram\.com\/p\/([^/]+)/);
  if (instagramMatch) {
    // Similar to Pinterest, direct image extraction is hard client-side.
    return url;
  }

  // Facebook (post link, similar issues)
  const facebookMatch = url.match(/facebook\.com\/photo\/\?fbid=(\d+)/);
  if (facebookMatch) {
    // Facebook image URLs are often dynamic and require authentication or specific graph API calls.
    return url;
  }

  // Default: return original URL if no specific transformation is found
  return url;
}
