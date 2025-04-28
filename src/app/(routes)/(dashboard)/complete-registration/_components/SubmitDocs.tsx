import React from 'react'
import SelectPage from '../../student-mgt/_component/select'
import InputPage from '../../student-mgt/_component/input'

const SubmitDocs = ({save}:{save: () => void}) => {
  const faculties = ["School of Engineering","School of science"]
  const courses = ["Mechanical Engineering","Computer science"]
  const studentType = ['Full-Time','Part-Time']
  return (
    <>
        <div className='w-[50%] grid gap-4'>
            <p className="text-[#9D1217] font-semibold">Confirmation of Admission</p>
            <SelectPage
                data={faculties}
                title={"Faculty"}
                placeholder="Select Faculty"
            />
            <SelectPage
                data={courses}
                title={"Course"}
                placeholder="Select Course"
            />
            <SelectPage
                data={studentType}
                title={"Mode of study"}
                placeholder="Select Study"
            />
            <InputPage
                required='*'
                title="Level"
                placeholder="Enter Level"
            />
            <InputPage
                required='*'
                title="Email"
                placeholder="Enter Email"
            />
        </div>
        <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]  text-[16px] font-[500] text-white"
        onClick={save}>
            Save And Continue
        </button>
    </>
  )
}

export default SubmitDocs