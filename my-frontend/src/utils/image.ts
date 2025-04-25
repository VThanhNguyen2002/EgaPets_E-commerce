export const dataURLtoBase64 = (dataURL: string): string =>
    dataURL.replace(/^data:image\/\w+;base64,/, '');
  