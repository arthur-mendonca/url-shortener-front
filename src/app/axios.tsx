import axios from "axios";

interface PostData {
  full: string;
}

export interface ShortUrl {
  short: string;
  clicks: number;
  id: number;
  full: string;
  updatedAt: string;
  createdAt: string;
}

const axiosRequest = async () => {
  return {
    post: async (baseURL: string, data: PostData): Promise<ShortUrl> => {
      const response = await axios.post<ShortUrl>(`${baseURL}/shorturl`, data);
      return response.data;
    },
    getQrCode: async (baseURL: string, shortURL: string) => {
      await axios.get(`${baseURL}/qrcode/${shortURL}`);
    },
  };
};

export default axiosRequest;
