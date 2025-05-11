export interface Patient {
    national_id: string;
    first_name: string;
    last_name: string;
    age: number;
    address: string;
    contact_number: string;
    criticality: string;
    gender: string;
    ward_number: string;
    admission_status: boolean;
    assigned_doctor: string;
    resources: { resourceId: string | number; allocatedUnits: number }[];
}