export const optimizeImage = (url: string | undefined | null, width: number = 96): string | undefined => {
  if (!url) return undefined;
  if (url.includes('/storage/v1/object/public/')) {
    return url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/') + ?width= + width + &quality=80&format=webp;
  }
  return url;
};