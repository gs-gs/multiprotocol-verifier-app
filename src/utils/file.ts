export const urltoFile = (
  url: string,
  filename: string,
  mimeType: string,
): Promise<File> =>
  fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
