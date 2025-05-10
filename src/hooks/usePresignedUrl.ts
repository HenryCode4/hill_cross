import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { PresignedUrlRequest } from "@/lib/schema";
import { toast } from "@/hooks/use-toast";
import API from "@/lib/axios-client";

interface UsePresignedUrlProps {
  onSuccess?: (url: string, file: File) => void;
  onError?: (error: Error) => void;
}

export const usePresignedUrl = ({
  onSuccess,
  onError,
}: UsePresignedUrlProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Mutation for getting presigned URL
  const presignedUrlMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await API.post(`/uploads/presigned-url`, data);
      return response.data;
    },
  });

  const getPresignedUrl = async (file: File): Promise<string | null> => {
    try {
      setIsLoading(true);
      
      const presignedUrlRequest: any = {
        file_name: file.name,
        file_type: "file",
        folder: "student-documents",
        file_extension: file.type
      };
  
      // Get presigned URL
      const presignedUrl = await presignedUrlMutation.mutateAsync(presignedUrlRequest);
      
      
      // Since response is a string (the full presigned URL), use it directly
      if (typeof presignedUrl !== 'string') {
        throw new Error('Expected string URL but got: ' + typeof presignedUrl);
      }
      
      // Upload the file using the presigned URL
      try {
        const uploadResponse = await fetch(presignedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type
          }
        });
        
        if (!uploadResponse.ok) {
          throw new Error(`Upload failed with status: ${uploadResponse.status}`);
        }
        
      } catch (uploadError) {
        console.error('Error during upload:', uploadError);
        throw uploadError;
      }
      
      // For accessing the file later, remove query params from the URL
      const accessUrl = presignedUrl.split('?')[0];
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(accessUrl, file);
      }
      
      return accessUrl;
    } catch (error) {
      // Handle errors...
      const err = error instanceof Error ? error : new Error('Failed to upload file');
      
      if (onError) {
        onError(err);
      } else {
        toast({
          title: "Error",
          description: "Failed to process file upload",
          variant: "destructive",
        });
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getPresignedUrl,
    isLoading,
  };
};
