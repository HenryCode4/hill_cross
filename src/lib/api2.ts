import API from "./axios-client";

export const getStudentPayment = async (page?: string) => {
    const endpoint = `get-all-student-payment?status=pending`
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

export const getSingleStudentPayment = async (id:string) => {

    const endpoint = `/get-single-student-payment/${id}`
    const data = await API.get(endpoint);
    return data;
}

export const getAllStudents = async () => {
    const endpoint = `/students`
    const data = await API.get(endpoint);
    return data;
}

export const uploadPayment = async () => {
    const endpoint = `/admin/students/update-payment-confirmation`
    const data = await API.get(endpoint);
    return data;
}

export const approvePayment = async () => {
    const endpoint = `/students`
    const data = await API.get(endpoint);
    return data;
}

export const uploadStudentPatment = async (data: any) =>
  await API.post(`/student-payment`, data);

export const editStudentPatment = async (data: any) =>
  await API.post(`/update-payment-confirmation`, data);