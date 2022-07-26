const genUniqueId = (length: number): string => {
  let id = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i: number = 0; i < length; i++) {
    const position = Math.floor(Math.random() * characters.length);
    id += characters.charAt(position);
  }
  return id;
};

export default genUniqueId;
