import { useRef, useState, ChangeEvent } from 'react';
import { usePresignedUrl } from '@/hooks/usePresignedUrl';
import { Loader } from 'lucide-react';

interface FileInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  accept?: string;
  disabled?: boolean;
}

const FileInput = ({
  value,
  onChange,
  placeholder = 'Select a file',
  className = '',
  accept = '.pdf,.jpg,.jpeg,.png',
  disabled = false
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  
  // Use our presigned URL hook
  const { getPresignedUrl, isLoading } = usePresignedUrl({
    onSuccess: (url) => {
      onChange(url);
    }
  });
  
  const handleClick = () => {
    if (fileInputRef.current && !disabled && !isLoading) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Update file name for display
      setFileName(file.name);
      
      // Get presigned URL
      await getPresignedUrl(file);
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || isLoading}
      />
      
      <div 
        className={`flex items-center border rounded-md px-3 py-2 ${disabled ? 'bg-gray-100' : 'bg-white'} cursor-pointer`}
        onClick={handleClick}
      >
        <div className="flex-1 truncate">
          {value ? (
            <div className="text-sm font-medium">
              {fileName || 'File selected'}
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              {placeholder}
            </div>
          )}
        </div>
        
        {isLoading && (
          <Loader className="h-4 w-4 animate-spin text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default FileInput;