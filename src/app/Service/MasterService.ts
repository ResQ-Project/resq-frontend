import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Patient } from "../Model/Patient";
import { Resource } from "../Model/Resource";
import { Staff } from "../Model/Staff";

@Injectable({
    providedIn: 'root'
})

export class MasterService{

    constructor(private http:HttpClient){}

    GetPatient():Observable<Patient[]>{
        return this.http.get<Patient[]>("http://localhost:8082/api/v1/patient");
    }

    GetResource():Observable<Resource[]>{
        return this.http.get<Resource[]>("http://localhost:8082/api/v1/resource");
    }

    GetStaff():Observable<Staff[]>{
        return this.http.get<Staff[]>("http://localhost:8082/api/v1/resource");
    }



}