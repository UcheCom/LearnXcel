import { HttpHeaders } from "@angular/common/http";

export const environment = {
  LEARNXCEL_API_URL: 'http://{HOST}:{PORT}/{ROUTE_BASE}',
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('learnxcel_access_tk'),
  }),
};
