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

