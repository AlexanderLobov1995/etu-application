import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class LaboratoryService {
  constructor(private httpClient: HttpClient) {}

  check(header, payload, key): Observable<string> {
    const formData = new FormData();
    formData.append('header', header);
    formData.append('payload', payload);
    formData.append('key', key);
    return this.httpClient.post('https://localhost:8081/auth/jwt-token',formData) as Observable<string>;
  }
}
