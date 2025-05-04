import API from "./axios-client";
import Cookies from 'js-cookie';
import { AllocateModuleType, NewCalendarType, NewModuleType, NewQualificationType, NewSchoolType, NewSessionType, NewStandardType, TeacherType, UpdateAssessmentType, UpdateAssignmentType, UpdateExaminationType, updateModuleType, UpdateSessionType } from "./interface";
import { StudentFilters } from "@/hooks/useStudent";
import { createAcademicFormType, createNotificationFormType, getStatementFormType, paymentFormType, SmsNotificationRequestType, StudentRequestType } from "./schema";

const token = Cookies.get('accessToken');
console.log(token)
type forgotPasswordType = { email: string };
type resetPasswordType = { password: string; verificationCode: string };

type LoginType = {
  username: string;
  password: string;
};

type registerType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type verifyEmailType = { code: string };
type verifyMFAType = { code: string; secretKey: string };
type mfaLoginType = { code: string; email: string };

type SessionType = {
  _id: string;
  userId: string;
  userAgent: string;
  createdAt: string;
  expiresAt: string;
  isCurrent: boolean;
};

type SessionResponseType = {
  message: string;
  sessions: SessionType[];
};

export type mfaType = {
  message: string;
  secret: string;
  qrImageUrl: string;
};


export const loginMutationFn = async (data: LoginType) =>
  await API.post("/login-admin", data);

export const registerMutationFn = async (data: registerType) =>
  await API.post(`/auth/register`, data);

export const verifyEmailMutationFn = async (data: verifyEmailType) =>
  await API.post(`/auth/verify/email`, data);

export const forgotPasswordMutationFn = async (data: forgotPasswordType) =>
  await API.post(`/auth/password/forgot`, data);

export const resetPasswordMutationFn = async (data: resetPasswordType) =>
  await API.post(`/auth/password/reset`, data);

export const verifyMFALoginMutationFn = async (data: mfaLoginType) =>
  await API.post(`/mfa/verify-login`, data);

export const logoutMutationFn = async () => await API.post(`/auth/logout`);

export const mfaSetupQueryFn = async () => {
  const response = await API.get<mfaType>(`/mfa/setup`);
  return response.data;
};

export const verifyMFAMutationFn = async (data: verifyMFAType) =>
  await API.post(`/mfa/verify`, data);

export const revokeMFAMutationFn = async () => await API.put(`/mfa/revoke`, {});

export const getUserSessionQueryFn = async () => await API.get(`/me`);
export const getDashboardCountDataQueryFn = async () => await API.get(`/admin/dashboard/count-data`);
export const getRecentRegisteredDataQueryFn = async () => await API.get(`/admin/dashboard/latest-students`);

export const getStudentInflowDataQueryFn = async (year?: string) => {
  const endpoint = year 
    ? `/admin/dashboard/students-inflow?year=${year}`
    : '/admin/dashboard/students-inflow';
  return await API.get(endpoint);
};

export const getStudentPaymentInflowDataQueryFn = async (year?: string) => {
  const endpoint = year 
    ? `/admin/payment/students-payments-inflow?year=${year}`
    : '/admin/payment/students-payments-inflow';
  return await API.get(endpoint);
};


export const sessionsQueryFn = async () => {
  const response = await API.get<SessionResponseType>(`/session/all`);
  return response.data;
};

export const sessionDelMutationFn = async (id: string) =>
  await API.delete(`/session/${id}`);

//school
export const getSchoolDataQueryFn = async () => await API.get(`/schools`);

export const newSchoolMutationFn = async (data: NewSchoolType) =>
  await API.post("/schools", data);

export const updateSchoolMutationFn = async (id: string, data: NewSchoolType) =>
  await API.patch(`/schools/${id}`, data);

export const deleteSchoolMutationFn = async (id: string) =>
  await API.delete(`/schools/${id}`);

export const getSchoolByIdMutationFn = async (id: string) =>
  await API.get(`/schools/${id}`);


//qualification
export const getQualificationDataQueryFn = async () => await API.get(`/qualifications?all=true`);

export const newQualificationMutationFn = async (data: NewQualificationType, school: string) =>
  await API.post(`/schools/${school}/qualifications`, data);

export const updateQualificationMutationFn = async (id: string, school: string, data: NewQualificationType) =>
  await API.patch(`/schools/${school}/qualifications/${id}`, data);

export const deleteQualificationMutationFn = async (id: string) =>
  await API.delete(`/qualifications/${id}`);

export const getQualificationByIdMutationFn = async (id: string) =>
  await API.get(`/qualifications/${id}/students`);

//standards
export const getStandardDataQueryFn = async () => await API.get(`/standards`);

export const newStandardMutationFn = async (data: NewStandardType) =>
  await API.post(`/standards`, data);

export const updateStandardMutationFn = async (id: string, data: NewStandardType) =>
  await API.patch(`/standards/${id}`, data);

export const deleteStandardMutationFn = async (id: string) =>
  await API.delete(`/standards/${id}`);


//modules?fetch=all
export const getModuleDataQueryFn = async (page?: string) => {
 const data = await API.get(`/modules?page=${page}&qualification=all`);
 return data
}
 
export const newModuleMutationFn = async (data: NewModuleType) =>
  await API.post(`/modules`, data);

export const updateModuleMutationFn = async (id: string, data: updateModuleType) =>
  await API.post(`/modules/${id}`, data);

export const deleteModuleMutationFn = async (id: string) =>
  await API.delete(`/modules/${id}`);

//academic-sessions
export const getAcademicSessionDataQueryFn = async () => await API.get(`/academic-sessions`);
export const newSessionMutationFn = async (data: NewSessionType) =>
  await API.post(`/academic-sessions`, data);

export const UpdateSessionMutationFn = async (id: string, data: UpdateSessionType) =>
  await API.patch(`/academic-sessions/${id}`, data);

export const deleteSessionMutationFn = async (id: string) =>
  await API.delete(`/academic-sessions/${id}`);

//e-learning/lesson
export const getLessonDataQueryFn = async (page?: string, status?: string, teacher?: string, module?:string) => {
  const data = await API.get(`/lessons?page=${page || "all"}&status=${status || "all"}&teacher=${teacher || "all"}&module=${module || "all"}`);
  return data;
} 



export const endLessonMutationFn = async (lessonId: string) =>
  await API.patch(`/${lessonId}/end`);

//e-learning/assessment
export const getAssessmentDataQueryFn = async (page?: string, status?: string, teacher?: string, module?:string) => {
  const data = await API.get(`/administrators/assessments?page=${page || "all"}&status=${status || "all"}&teacher=${teacher || "all"}&module=${module || "all"}`);
  return data;
} 
export const getAssessmentByIdMutationFn = async (id: string) =>
  await API.get(`/administrators/assessments/${id}/details`);

export const updateAssessmentMutationFn = async (id: string, data: UpdateAssessmentType) =>
  await API.patch(`/administrators/assessments/${id}`, data);

//e-learning/administrators/assignments
export const getAssignmentDataQueryFn = async (page?: string, status?: string, teacher?: string, module?:string) => {
  const data = await API.get(`/administrators/assignments?page=${page || "all"}&status=${status || "all"}&teacher=${teacher || "all"}&module=${module || "all"}`);
  return data
}

export const updateAssignmentMutationFn = async (id: string, data: UpdateAssignmentType) =>
  await API.patch(`/administrators/assignments/${id}`, data);

//e-learning/administrators/examinations
export const getExaminationsDataQueryFn = async (page?: string, status?: string, teacher?: string, module?:string) => {
  const data = await API.get(`/administrators/examinations?page=${page || "all"}&status=${status || "all"}&teacher=${teacher || "all"}&module=${module || "all"}`);
  return data
}

export const updateExaminationMutationFn = async (id: string, data: UpdateExaminationType) =>
  await API.patch(`/administrators/examinations/${id}`, data);

//AcademicCalendar
export const getAcademicCalendarDataQueryFn = async () => await API.get(`/academic-calenders`);

export const newCalendarMutationFn = async (sessionId: string, data: NewCalendarType) =>
  await API.post(`/academic-sessions/${sessionId}/academic-calenders`, data);


//semester
export const getSemesterDataQueryFn = async () => await API.get(`/semesters`);

//allocate module
export const getAllocateModuleDataQueryFn = async (page?: string) => {
  const endpoint = page
  ? `/module-allocations?page=${page}`
  : `/module-allocations?request_type=all`
  const data = await API.get(endpoint, {
    timeout: 120000 // 2 minutes
  });
  return data;
}

export const newAllocateModuleMutationFn = async (data: AllocateModuleType) =>
  await API.post(`/module-allocations`, data);

export const updateAllocatedModuleMutationFn = async (id: string, data: AllocateModuleType) =>
  await API.patch(`/module-allocations/${id}`, data);

//teacher
export const getTeacherDataQueryFn = async (page?: string) => {
  const endpoint = page 
    ? `/teachers?page=${page}&qualification=all`
    : `/teachers?request_type=all`;
  const data = await API.get(endpoint, {
    timeout: 120000 // 2 minutes
  });
  return data;
}

export const newTeacherMutationFn = async (data: TeacherType) =>
  await API.post(`/teachers`, data);

//student
export const getStudentDataQueryFn = async (page?: string, filters?: StudentFilters) => {
  const endpoint = page
    ? `/students?page=${page}`
    : '/students?request_type=all';

  const config = {
    timeout: 120000,
    params: {
      ...(filters?.qualification && { qualification: filters.qualification }),
      ...(filters?.request_type && { request_type: filters.request_type }),
      ...(filters?.search && { search: filters.search }),
      ...(filters?.admission_status && { admission_status: filters.admission_status }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.financial_status && { financial_status: filters.financial_status }),
      ...(filters?.school && { school: filters.school }),
      ...(filters?.registration_status && { registration_status: filters.registration_status })
    }
  };

  const data = await API.get(endpoint, config);
  return data;
}


export const getStudentByIdMutationFn = async (id: string) =>
  await API.get(`/students/${id}/show`);

export const studentPaymentMutationFn = async (data: paymentFormType) =>
  await API.post(`/student-payment`, data);

export const queryStudentActionMutationFn = async (id: string, action: string) =>
  await API.get(`/students/${id}/${action}`);

  
  export const updateStudentMutationFn = async (id: string, queryType: string, data: any) =>
    await API.post(`/admin/students/${id}/${queryType}`, data);


  export const newPresignedUrlMutationFn = async (data: any) =>
    await API.post(`/uploads/presigned-url`, data);

  export const studentPaymentFees = async (latest: boolean) => {
  const endpoint = latest ? `/admin/dashboard/latest-students-payment` 
                          : `/get-all-student-payment`;
      const studentFees =   await API.get(endpoint)
      return studentFees
  }


  export const enrollStudentModule = async (page?: string) => 
    await API.get(`/enrolments?page=${page}`, {
      timeout: 120000 
    })

    export const newAllocateStudentModuleMutationFn = async (data: StudentRequestType) =>
      await API.post(`/enrolments`, data);
    
    export const updateAllocatedStudentModuleMutationFn = async (id: string, data: StudentRequestType) =>
      await API.patch(`/enrolments/${id}`, data);

    // dashboard list 
    export const getDashboardList = async () => 
      await API.get(`/admin/dashboard/list`);

    export const getUnpaidList = async () => 
      await API.get(`/get-unpaid-payment`);


    // sms notification 
    export const getSmsNotification = async (type: string) => 
      await API.get(`/get-student-payment?type=${type}`);


    export const updateSmsNotificationMutationFn = async (id: string, data: SmsNotificationRequestType) =>
      await API.patch(`/update-message/${id}`, data);

    export const createSmsNotificationMutationFn = async (data: SmsNotificationRequestType) =>
      await API.post(`/message-payment`, data);

    export const getStatementsMutationFn = async (data: getStatementFormType) =>
      await API.post(`/get-statements`, data);

    //push notification

    export const getPushNotification = async () => 
      await API.get(`/push-notification`)

    export const resendPushNotification = async (id: string, action: string) => 
      await API.get(`/push-notifications/${id}/${action}`)

    export const createPushNotification = async (data: createNotificationFormType) => 
      await API.post(`/push-notification-post`, data)

    export const updatePushNotification = async (id: string, data: createNotificationFormType) => 
      await API.patch(`/push-notifications/${id}`, data)

    export const deletePushNotification = async (id: string) => 
      await API.delete(`/push-notification-del/${id}`);

    //HR 
    export const getAcademicStaffs = async (action: string, page?: string) => 
      await API.get(`/${action}?page=${page}`);

    export const createAcademicStaff = async (data: any) => 
      await API.post(`/teachers`, data);

    // Role 
    export const getRoles = async () => 
      await API.get(`/roles`);


    // Role 
    export const getPermission = async () => 
      await API.get(`/permissions`);

    export const getActivityLog = async (page: string) => 
      await API.get(`/activity-logs?page=${page}`);
    