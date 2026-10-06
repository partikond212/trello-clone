export const throwApiError = async (res: Response, fallback: string): Promise<never> => {
  let serverMessage: string | undefined;
  try {
    const data = await res.json();
    serverMessage = data?.message ?? data?.error;
  } catch {
    // Тело ответа не JSON или пустое — используем запасной текст
  }
  throw new Error(serverMessage || fallback);
};
