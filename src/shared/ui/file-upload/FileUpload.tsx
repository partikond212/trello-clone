import { type FC, useRef, useState } from 'react';
import { uploadImage } from '../../utils/uploadImage';
import styles from './FileUpload.module.css'

interface FileUploadProps {
  onSuccess: (url: string) => void;
  label?: string;
}
 const FileUpload: FC<FileUploadProps> = ({ onSuccess, label = 'Выбрать изображение' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    try {
      const url = await uploadImage(file);
      onSuccess(url);
    } catch (error) {
      alert('Ошибка загрузки изображения');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div >
      <button className={styles.fileUploadButton}
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
      >
        {isLoading ? 'Загрузка...' : label}
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};
export default FileUpload