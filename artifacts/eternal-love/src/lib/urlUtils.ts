export function normalizeImageUrl(url: string): string {
  // Direct image URL (already good)
  if (/\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url)) return url;

  // Google Drive (new format for direct access)
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;

  // Google Photos (often embeds in Google Drive links)
  const googlePhotosMatch = url.match(/photos\.app\.goo\.gl\/([a-zA-Z0-9_-]+)/);
  if (googlePhotosMatch) return `https://lh3.googleusercontent.com/d/${googlePhotosMatch[1]}`;

  // Google User Content (already direct)
  if (url.includes("lh3.googleusercontent.com")) return url;

  // Dropbox
  const dropboxMatch = url.match(/www\.dropbox\.com\/s\/[^/]+\/([^?]+)\?dl=0/);
  if (dropboxMatch) return url.replace("?dl=0", "?raw=1");

  // Imgur (direct image or album cover)
  const imgurMatch = url.match(/imgur\.com\/(?:gallery\/)?([a-zA-Z0-9]+)/);
  if (imgurMatch) return `https://i.imgur.com/${imgurMatch[1]}.jpeg`; // Default to JPEG, often works

  // Pinterest (attempt to get a larger image from the URL)
  const pinterestMatch = url.match(/pinterest\.com\/pin\/(\d+)/);
  if (pinterestMatch) return `https://i.pinimg.com/originals/${pinterestMatch[1]}.jpg`;

  // Instagram (attempt to get a larger image from the URL)
  const instagramMatch = url.match(/instagram\.com\/p\/([^/]+)/);
  if (instagramMatch) return `https://www.instagram.com/p/${instagramMatch[1]}/media/?size=l`;

  // Facebook (attempt to get a larger image from the URL)
  const facebookMatch = url.match(/facebook\.com\/photo\/\?fbid=(\d+)/);
  if (facebookMatch) return `https://graph.facebook.com/${facebookMatch[1]}/picture?type=large`;

  // Default: return original URL if no specific transformation is found
  return url;
}
