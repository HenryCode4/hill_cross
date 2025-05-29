import API from "./axios-client";

export const getStudentPayment = async (page?: string) => {
    const endpoint = `get-all-student-payment?status=pending&page=${page}`
    // const endpoint = page
    //   ? `/students?page=${page}`
    //   : '/students?request_type=all';
  
    // const config = {
    //   timeout: 120000,
    //   params: {
    //     ...(filters?.qualification && { qualification: filters.qualification }),
    //     ...(filters?.request_type && { request_type: filters.request_type }),
    //     ...(filters?.search && { search: filters.search }),
    //     ...(filters?.admission_status && { admission_status: filters.admission_status }),
    //     ...(filters?.status && { status: filters.status }),
    //     ...(filters?.financial_status && { financial_status: filters.financial_status }),
    //     ...(filters?.school && { school: filters.school }),
    //     ...(filters?.registration_status && { registration_status: filters.registration_status })
    //   }
    // };
  
    const data = await API.get(endpoint);
    return data;
  }

export const getApprovedStudentPayment = async (page?: string) => {
    const endpoint = `get-all-student-payment?status=approved`
    const data = await API.get(endpoint);
    return data;
  }

export const getSingleStudentPayment = async (id:string) => {
    const endpoint = `/students/${id}/show`
    const data = await API.get(endpoint);
    return data;
}

export const getAllStudents = async () => {
    const endpoint = `/students`
    const data = await API.get(endpoint);
    return data;
}

export const uploadPayment = async ({data}:{data:any}) => {
    const endpoint = `/admin/students/add-payment/${data.id}`
    await API.post(endpoint,{...data,fee_category: data.fee_category.split("(")[0].trim(),statement_of_account_url:data.file_url});
}

export const approvePayment = async (id:string) => {
    const endpoint = `/admin/approve-payment/${id}`
    await API.post(endpoint);
}

export const getOutstandingStudentPayment = async (id:string) => {
  const endpoint = `/admin/students/${id}/check-outstanding-balance`
  const data = await API.get(endpoint);
  return data
}

export const getPaymentFees = async () => {
  const endpoint = `/admin/payment-fees`
  const data = await API.get(endpoint);
  return data
}

export const getBookTracking = async () => {
  const endpoint = `/admin/students/book-tracking`
  const data = await API.get(endpoint);
  return data
}

export const editStudentPayment = async (data: any) =>{
  await API.patch(`/admin/students/edit-payment/${data.id}`,{...data,statement_of_account_url:data.file_url});
}

export const updateStudentDocs = async (data: any) =>{
  console.log({data}),data.id;
  await API.patch(`/admin/students/update-student-documents/${data.id}`,{...data,statement_of_account_url:data.file_url});
}

export const updateStudentDetails = async (values: any) =>{
  const {last_name,firstName,phoneNumber, ...data} = values;
  await API.patch(`/admin/students/update-student-details/${data.id}`,{...data, name: `${firstName} ${last_name}`,phone_number: phoneNumber});
}

export const updateStudentQualification = async (values: any) =>{
  await API.patch(`/admin/students/update-admission-details/${values.id}`,{...values});
}

export const updateBookProcess = async (values: any) =>{
  console.log({values});
  const {id, bookStatus} = values
  await API.patch(`/admin/students/update-book-tracking-status/${id}`,{status:bookStatus});
}