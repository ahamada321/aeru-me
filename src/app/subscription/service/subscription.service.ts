import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubscriptionForm } from "./subscription.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  public sendFormMsg(formData: SubscriptionForm): Observable<any> {
    return this.http.post("/api/v1/contactforms", formData);
  }
}
