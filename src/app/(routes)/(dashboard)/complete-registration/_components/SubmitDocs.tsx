import React, { useEffect, useRef, useState } from 'react'
import SelectPage from '../../student-mgt/_component/select'
import InputPage from '../../student-mgt/_component/input'
import { usePresignedUrl } from '@/hooks/usePresignedUrl';
import { Loader } from 'lucide-react';
import { updateStudentDocs } from '@/lib/api2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { ActiveProps } from '../[id]/page';

interface FileProps {
  file_url: keyof DocsType;
  file_name: keyof DocsType;
  setDocs: React.Dispatch<React.SetStateAction<DocsType>>;
  docs: DocsType;
}

type DocsType = {
  id_url: string;
  id_name: string;
  cert_url: string;
  cert_name: string;
  address_url: string;
  address_name: string;
  sponsor_url: string;
  sponsor_name: string;
};

const FileInput = ({file_url,file_name,setDocs,docs}:{file_url:string,file_name:string,setDocs:any,docs:any}) => {
     const fileInputRef = useRef<HTMLInputElement>(null);
          
        const handleClick = () => {
            if (fileInputRef.current  && !isLoading) {
                fileInputRef.current.click();
            }
        };
    

    const { getPresignedUrl, isLoading } = usePresignedUrl({
            onSuccess: (url,file) => {
              // setDocs({...docs,[file_url]:url,[file_name]:file.name});
              setDocs((prev: any) => ({ ...prev, [file_url]: url, [file_name]: file.name }));
            }
          });

     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]; 
            if (!file) return;
          
            const allowedTypes = [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ];
          
            if (!allowedTypes.includes(file.type)) {
              toast({
                  title: "Error",
                  description: "Only PDF, DOC, and DOCX files are allowed.",
                  variant: "destructive",
              });
              return;
            }
          
            if (file.size > 1024 * 1024) {
              toast({
                  title: "Error",
                  description: "File size must be less than 1MB.",
                  variant: "destructive",
              });
              return;
            }
            await getPresignedUrl(file);
        };


        return (
            <div className='w-[50%]'>
                <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                />
                <div onClick={handleClick} className="w-full border border-[#CEAAAA] flex items-center rounded-md overflow-clip cursor-pointer">
                    <div className="w-fit px-4 py-4 bg-[#F2F2F2] text-[#4F4F4F] mr-2 text-sm">Choose File</div>
                    <div className="flex-1 flex justify-between pr-2 items-center">
                        <p className="text-[#888888] text-sm">{docs[file_name] ? docs[file_name] : 'Upload your proof of payment'}</p>
                        {isLoading && (
                        <Loader className="h-4 w-4 animate-spin text-gray-400" />
                    )}
                    </div>
                </div>
            </div>
        )
}

const SubmitDocs = ({payment,save}:{payment:any,save:  React.Dispatch<React.SetStateAction<ActiveProps>>}) => {

  const [docs,setDocs] = useState<DocsType>({id_url:"",id_name:"",cert_url:"",cert_name:"",address_url:"",address_name:"",sponsor_url:"",sponsor_name:""})

  useEffect(() => {
    payment?.data?.data?.documents.map((data: { file_type: string; file_url: string; }) => {
      setDocs((docs) => ({...docs,[data.file_type]:data.file_url}))
    })
  },[])

    const { mutate, isPending } = useMutation({
      mutationFn: updateStudentDocs,
    });

    const queryClient = useQueryClient();

    const onSubmit = (e:any) => {
      if(!docs.id_url || !docs.cert_url || !docs.address_url || !docs.sponsor_url){
        toast({
            title: "Error",
            description: "Please Upload All Documents.",
            variant: "destructive",
        });
        return
      }
      e.preventDefault();
      
      mutate({id:payment.data.data.id,...docs}, {
          onSuccess: (response:any) => {
          queryClient.invalidateQueries({ queryKey: [`getSingleStudentPayment`, payment?.data?.data?.student_id] });
          toast({
              title: "Success",
              description: "Payment Uploaded successfully",
              variant: "default",
          });
          setDocs({id_url:"",id_name:"",cert_url:"",cert_name:"",address_url:"",address_name:"",sponsor_url:"",sponsor_name:""});
          save("Confirmation of Admission")
          },
          onError: (error) => {
          console.log(error.message);
          toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
          });
          },
      });
    };

  // const updateDocs = () => {
  //   updateStudentDocs
  // }
  return (
    <>
        <div className='grid gap-4'>
            <p className="text-[#9D1217] font-semibold">Submission of Document</p>
            <div className='flex justify-between items-center gap-4'>
                <p className='w-[50%]'>ID copy or Passport copy or Birth certificate</p>
                <FileInput file_url={"id_url"} file_name={"id_name"} docs={docs} setDocs={setDocs} />
            </div>
            <div className='flex justify-between items-center gap-4'>
                <p className='w-[50%]'>Copy of Matric or ABET L4 or Senior School Certificate or N3 certificate or Current Grade 12 result with school stamp.</p>
                <FileInput file_url={"cert_url"} file_name={"cert_name"} docs={docs} setDocs={setDocs}/>
            </div>
            <div className='flex justify-between items-center gap-4'>
                <p className='w-[50%]'>Copy Of Proof Of Address</p>
                <FileInput file_url={"address_url"} file_name={"address_name"} docs={docs} setDocs={setDocs}/>
            </div>
            <div className='flex justify-between items-center gap-4'>
                <p className='w-[50%]'>Copy Of Sponsor ID</p>
                <FileInput file_url={"sponsor_url"} file_name={"sponsor_name"} docs={docs} setDocs={setDocs}/>
            </div>
        </div>
        <div className='flex justify-between'>
          <button className="h-[48px] w-[161px] rounded-[8px] border border-[#ED1000]  text-[16px] font-[500] text-[#ED1000"
            onClick={() => save("Student Details")}>
                Back
          </button>
          <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]  text-[16px] font-[500] text-white"
          onClick={onSubmit}>
            {isPending ? 'Loading ...' : 'Save And Continue'}
          </button>
        </div>
    </>
  )
}

export default SubmitDocs