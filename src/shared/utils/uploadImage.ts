import { API_BASE_URL } from "@/shared/config/apiBaseUrl"
import { throwApiError } from "@/shared/utils/apiError"

export type Image = string;

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) await throwApiError(res, 'Не удалось загрузить изображение');
  const data = await res.json();
  return data.url;
};