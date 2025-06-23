
import Link from 'next/link'
import InputPage from '../../student-mgt/_component/input'
import SelectPage from '../../student-mgt/_component/select'
import useQualificationData from '@/hooks/useQualification'
import { useState } from 'react'
import SelectPage2 from '../../student-mgt/_component/select2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStudentQualification } from '@/lib/api2'
import { toast } from '@/hooks/use-toast'

const ConfirmAdmission = ({payment,save}:{payment:any,save: any}) => {
    const {email,study_mode} = payment?.data.data.qualification;
    const {name,id} = payment.data.data.qualification.qualification;
    const {name:faculty} = payment.data.data.qualification.qualification.school;

    const [schoolData, setSchoolData] = useState({faculty:faculty || "",course: name || "",qualification_id:id || "",mode_of_study:study_mode||"",level:"",email:email || ""})
    const studentType = ['Full-Time','Part-Time']

    const {data,isLoading} = useQualificationData();
    const {student_id } = payment?.data.data;


    const coursesData = () => {
        return data?.data.data
            .filter((item: any) => item.school.name.toLowerCase() === schoolData.faculty.toLowerCase())
            .map((item: any) => {
                return {label:item.name,key:item.id}
        });
    };

    const facultyData: () => {label:string,key:string}[] = () => {
        const facultyObj:any = {};
        data?.data.data.map((item: { school: { name: string | number; id: any } }) => {
            if(!facultyObj[item.school.name]){
                facultyObj[item.school.name] = item.school.id;
            }
        });
        return Object.keys(facultyObj).map(item => {
            return {label:item,key:facultyObj[item]}
        })
        
    }

    const changeInput = (e:any) => {
        const {name,value} = e.target;
        setSchoolData({...schoolData,[name]: value})
    }

    
       const { mutate, isPending } = useMutation({
            mutationFn: updateStudentQualification,
          });

      const queryClient = useQueryClient()
      
      const onSubmit = (e:any) => {
        e.preventDefault();
        
        mutate({id:payment.data.data.id,...schoolData}, {
            onSuccess: (response:any) => {
            queryClient.invalidateQueries({ queryKey: [`getSingleStudentPayment`, student_id] });
            toast({
                title: "Success",
                description: "Student Qualification Uploaded successfully",
                variant: "default",
            });
            save("Portal Creation")
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
    
    
    if(isLoading){
        return (<>Loading</>)
    }
    
  return (
    <>
        <div className='w-[50%] grid gap-4'>
            <p className="text-[#9D1217] font-semibold">Confirmation of Admission</p>
            <SelectPage2
                data={facultyData()}
                title={"Faculty"}
                placeholder="Select Faculty"
                value={schoolData.faculty}
                onChange={(val) => setSchoolData(prev => ({ ...prev, faculty: val.label,course: "" }))}
            />
            <SelectPage2
                data={coursesData()}
                // data={coursesData()}
                title={"Course"}
                placeholder="Select Course"
                value={schoolData.course}
                onChange={(val) => setSchoolData(prev => ({ ...prev, course: val.label, qualification_id:val.key }))}
            />
            <SelectPage
                data={studentType}
                title={"Mode of study"}
                placeholder="Select Study"
                value={schoolData.mode_of_study}
                onChange={(val) => setSchoolData(prev => ({ ...prev, mode_of_study: val }))}
            />
            <InputPage
                required='*'
                title="Level"
                placeholder="Enter Level"
                value={schoolData.level}
                name="level"
                onChange={changeInput}
            />
            <InputPage
                required='*'
                title="Email"
                placeholder="Enter Email"
                value={schoolData.email}
                name='email'
                onChange={changeInput}
            />
        </div>
         <div className='flex justify-between'>
            <button className="h-[48px] w-[161px] rounded-[8px] border border-[#ED1000]  text-[16px] font-[500] text-[#ED1000]"
            onClick={() => save("Submission of Document")}>
                Back
            </button>
            <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]  text-[16px] font-[500] text-white"
            onClick={onSubmit} disabled={isPending}>
                {isPending ? 'Loading...' : 'Save And Continue'}
            </button>
        </div>
    </>
  )
}

export default ConfirmAdmission