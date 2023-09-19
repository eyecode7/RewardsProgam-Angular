import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

 constructor(private _http: HttpClient) {}


 addPurchase(data: any): Observable<any> {
   return this._http.post('http://localhost:8080/purchase/rewards/addPurchase', data);
 }

 getPurchaseList(): Observable<any> {
   return this._http.get('http://localhost:8080/purchase/rewards/getPurchases');
 }

 deletePurchase(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8080/purchase/rewards/deletePurchase/${id}`);
  }

  updatePurchase(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8080/purchase/rewards/updatePurchase/${id}`, data);
  }
}
