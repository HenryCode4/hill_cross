import { z } from "zod";

 export const formSchema = z.object({
    username: z.string().trim().min(1, {
      message: "Email is required",
    }),
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
  });


 export const schoolFormSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Name is required",
    }),
    description: z.string().trim().min(1, {
      message: "Description is required",
    }),
  });

 export const qualificationFormSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Name is required",
    }),
    description: z.string().trim().min(1, {
      message: "Description is required",
    }),
    duration: z.string().trim().min(1, {
      message: "Duration is required",
    }),
  });

 export const standardFormSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Name is required",
    })
  });

 export const moduleFormSchema = z.object({
    name: z.string().trim().min(1, {
      message: "Name is required",
    }),
    default_semester: z.boolean({message: "Default semester is required"}),
    semester_id: z.string().trim().min(1, {
      message: "Semester is required",
    }),
    standard_id: z.string().trim().min(1, {
      message: "Standard is required",
    }),
    qualifications: z.array(z.string().trim().min(1, {message: "Qualification is required"}))
  });

  export const sessionFormSchema = z.object({
    name: z.string().min(1, "Session name is required"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required")
  });

  export const updateSessionFormSchema = z.object({
    name: z.string().min(1, "Session name is required"),
  });

export const calendarFormSchema = z.object({
  name: z.string().min(1, "Session name is required"),
  semester_id: z.string().min(1, "Semester id is required"),
  session_id: z.string().min(1, "Session id is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  course_registration_start_date: z.string().min(1, "Course registration start date is required"),
  course_registration_end_date: z.string().min(1, "Course registration start date is required"),
});

export const updateCalendarFormSchema = z.object({
  name: z.string().min(1, "Session name is required"),
  semester_id: z.string().optional(),
  session_id: z.string().min(1, "Session id is required"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  course_registration_start_date: z.string().optional(),
  course_registration_end_date: z.string().optional(),
});

export const updateAssessmentFormSchema = z.object({
  assessment_type: z.string().min(1, "assessment type is required"),
  available_at: z.string().min(1, "available date is required"),
  submission_date: z.string().min(1, "submission date is required"),
  total_score: z.number().min(1, "total score is required"),
});

export const updateAssignmentFormSchema = z.object({
  available_at: z.string().min(1, "available date is required"),
  submission_date: z.string().min(1, "submission date is required"),
  total_mark: z.number().min(1, "total score is required"),
});

export const updateExaminationFormSchema = z.object({
  examination_type: z.string().min(1, "examination type is required"),
  available_at: z.string().min(1, "available date is required"),
  submission_date: z.string().min(1, "submission date is required"),
  total_score: z.number().min(1, "total score is required"),
});

export const teacherFormSchema = z.object({
  name: z.string().min(1, "name is required"),
    email: z.string().min(1, "email is required"),
    password: z.string().min(1, "password is required"),
    staff_id: z.string().min(1, "staff id is required"),
    phone_number: z.string().min(1, "phone number is required")
})

export const smsNotificationFormSchema = z.object({
  message_recipient: z.string().min(1, "message recipient is required"),
  delivery_method: z.string().min(1, "delivery method is required"),
  message_subject: z.string().min(1, "message subject is required"),
  message: z.string().min(1, "message is required"),
  expected_date_delivery: z.string().min(1, "expected date delivery is required"),
  delivery_time: z.string().min(1, "delivery time is required"),
  // type: z.string().min(1, "type is required")
});

export type SmsNotificationRequestType = z.infer<typeof smsNotificationFormSchema>;


export const allocateModuleFormSchema = z.object({
  teacher_id: z.string().min(1, "teacher_id is required"),
  academic_calender_id: z.string().min(1, "academic_calender_id is required"),
  modules: z.array(z.string().trim().min(1, {message: "Modules are required"}))
})

export const allocateStudentModuleFormSchema = z.object({
  student_id: z.string().min(1, "student_id is required"),
  academic_calender_id: z.string().min(1, "academic_calender_id is required"),
  modules: z.array(z.string().trim().min(1, {message: "Modules are required"}))
})

export type StudentRequestType = z.infer<typeof allocateStudentModuleFormSchema>;

export const personalDetailsSchema = z.object({
  title: z.string().optional(),
  gender: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  other_name: z.string().nullable().optional(),
  dob: z.string().optional(),
  selectNationality: z.string().optional(),
  home_language: z.string().optional(),
  race: z.string().optional(),
  disability: z.string().optional(),
  maiden_name: z.string().nullable().optional(),
  passport_number: z.string()
    .regex(/^[A-Z0-9]+$/, "Passport number must contain only uppercase letters and numbers")
    .optional(),
  country_id: z.string().uuid("Invalid country ID format").optional()
});

export const contactDetailsSchema = z.object({
  house_number: z.string().optional(),
  street: z.string().optional(),
  area: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  state_id: z.string().uuid().optional(),
  country_id: z.string().uuid().optional(),
  phone_number: z.string().optional(),
});

const institutionObject = z.object({
  institution: z.string().optional(),
  qualification: z.string().optional()
});

export const educationHistorySchema = z.object({
  school_name: z.string().optional(),
  matriculation_year: z.string().optional(),
  has_studied_beyond_matric: z.string().optional(),
  // institution_object: z.array(institutionObject).optional()
});

export const qualificationSchema = z.object({
  school_id: z.string().uuid().optional(),
  qualification_id: z.string().uuid().optional(),
  study_mode: z.string().optional(),
  academic_session_id: z.string().uuid().optional()
});

// const documentObject = z.object({
//   type: z.string(),
//   url: z.string().url()
// });

// export const documentSchema = z.object({
//   documents: z.array(documentObject).optional()
// });


export const presignedUrlSchema = z.object({
  file_name: z.string(),
  file_type: z.string(),
  folder: z.literal('student-documents'),
  file_extension: z.string()
});

export type PresignedUrlRequest = z.infer<typeof presignedUrlSchema>;

// Document schema for form submission
export const documentSchema = z.object({
  documents: z.array(
    z.object({
      type: z.enum(['student_address', 'student_result', 'student_id']),
      url: z.string().url()
    })
  ).min(1, "At least one document must be uploaded")
});

export type DocumentUpload = z.infer<typeof documentSchema>;

// const documentSchema = z.object({
//   student_address: z.string().url("Please upload a valid address document"),
//   student_id: z.string().url("Please upload a valid ID document"),
//   student_result: z.string().url("Please upload a valid result document")
// });

export const paymentFormSchema = z.object({
  student_id: z.string().min(1, "Student ID is required"),
  amount_paid: z.string().min(1, "Amount paid is required"),
  total_amount_payable: z.string().min(1, "total amount payable is required"),
  payment_date: z.string().min(1, "payment date is required"),
  payment_mode: z.string().min(1, "payment mode is required"),
  fee_category: z.string().min(1, "fee category is required"),
  no_of_month_owed: z.string().min(1, "no of month owed is required"),
});

export type paymentFormType = z.infer<typeof paymentFormSchema>;


export const getStatementFormSchema = z.object({
  student_id: z.string().min(1, "Student ID is required"),
  start_date: z.string().min(1, "start date is required"),
  end_date: z.string().min(1, "end date is required"),
});

export type getStatementFormType = z.infer<typeof getStatementFormSchema>;

export const createNotificationFormSchema = z.object({
  title: z.string().min(1, "title is required"),
  body: z.string().min(1, "body is required"),
});

export type createNotificationFormType = z.infer<typeof createNotificationFormSchema>;

export const academicStaffSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "First Name is required"),
  staff_id: z.string().min(1, "Staff ID is required"),
  email: z.string().email("Invalid email format"),
  phone_number: z.string().min(1, "Phone number is required"),
  dob: z.string(),
  gender: z.string().min(1, "Gender is required"),
  mode: z.string().min(1, "Mode is required"),
  position: z.string().min(1, "Position is required"),
  password: z.string().min(1, "password is required"),
  re_password: z.string().min(1, "confirm password is required"),
  qualification: z.string().min(1, "qualification is required"),
  address: z.string().min(1, "address is required"),
  role: z.string().min(1, "role is required"),
});

export type createAcademicFormType = z.infer<typeof academicStaffSchema>;

export const adminSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "First Name is required"),
  email: z.string().email("Invalid email format"),
  staff_id: z.string().min(1, "Staff id is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  qualification: z.string().min(1, "qualification is required"),
  password: z.string().min(1, "password is required"),
  re_password: z.string().min(1, "confirm password is required"),
});

export const semesterSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export type createSemesterFormType = z.infer<typeof semesterSchema>;