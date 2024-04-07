export const getImageUrl = (name, ext) => {
  return new URL(`/assets/${name}.${ext}`, import.meta.url).href;
};
