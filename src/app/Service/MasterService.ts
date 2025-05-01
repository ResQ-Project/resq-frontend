import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Patient } from "../Model/Patient";
import { Resource } from "../Model/Resource";
import { Staff } from "../Model/Staff";
import {DropdownOption} from "../Model/DropDownOption";

@Injectable({
    providedIn: 'root'
})

export class MasterService{

    constructor(private http:HttpClient){}

    private baseUrl = 'http://localhost:3000'; // Base URL for your API


    GetPatient():Observable<Patient[]>{
        return this.http.get<Patient[]>(`${this.baseUrl}/patient`);//patient data to table
    }

    GetResource():Observable<Resource[]>{
        return this.http.get<Resource[]>(`${this.baseUrl}/resources`);//Resource data to table
    }

    GetStaff():Observable<Staff[]>{
        return this.http.get<Staff[]>(`${this.baseUrl}/staff`);//Staff data to table
    }

    getDropdownOptions(endpoint: string): Observable<DropdownOption[]> {
        return this.http.get<DropdownOption[]>(`${this.baseUrl}/Doctors`); //dropdown options for assigned doctor
      }

      addPatient(patient: Patient): Observable<Patient> {
        return this.http.post<Patient>(`${this.baseUrl}/patient`, patient);
      }

}