import { HttpHeaders } from "@angular/common/http";

export class Env {
  production?: boolean = false;
  LEARNXCEL_API_URL: string = 'http://localhost:8084/api/v1';
  headers: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('learnxcel_access_tk'),
  });

}