export interface NewSchoolType {
    name: string;
    description: string;
}

export interface NewQualificationType {
    name: string;
    description: string;
    duration: string;
}

export interface NewStandardType {
    name: string;
}

export interface NewModuleType {
    name: string;
    default_semester: boolean;
    semester_id: string;
    standard_id: string;
    qualifications: string[];
}
export interface updateModuleType {
    name?: string;
    default_semester?: boolean;
    semester_id?: string;
    standard_id?: string;
    qualifications?: string[];
}

export interface NewSessionType {
    name: string;
    start_date: string;
    end_date: string;
}

export interface UpdateSessionType {
    name: string;
}

export interface NewCalendarType {
    name: string;
    semester_id: string;
    start_date: string;
    end_date: string;
    course_registration_start_date: string;
    course_registration_end_date: string;
}

export interface UpdateAssessmentType {
    assessment_type: string;
    available_at: string;
    submission_date: string;
    total_score: number;
}

export interface UpdateAssignmentType {
    available_at: string;
    submission_date: string;
    total_mark: number;
}

export interface UpdateExaminationType {
    examination_type: string;
    available_at: string;
    submission_date: string;
    total_score: number;
}

