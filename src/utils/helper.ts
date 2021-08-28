/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { env } from "process";

if (process.env.NODE_ENV === "production") {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = () => {};
}

export const convertBase64 = (file: any): any => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.result) {
        const base64result = fileReader.result.toString().split(",")[1];
        resolve(base64result);
      }
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const displayBase64 = (base64: string): string => {
  return "data:image/png;base64," + base64;
};
