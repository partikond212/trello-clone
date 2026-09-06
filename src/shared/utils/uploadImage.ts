export type Image = string;

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('http://localhost:5000/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Ошибка загрузки');
  const data = await res.json();
  return data.url;
};