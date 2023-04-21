export class ConvertImgToBase64 {
  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.data);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export const convertPrice = (price) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
