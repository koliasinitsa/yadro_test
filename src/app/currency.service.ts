import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private _apiUrl = 'https://api.apilayer.com/currency_data/live';
  private _apiKey = 'AoeH0HcPj2kZqeJXW9ajNoAFYvF2NH16';
  trackedCurrenciesSubject = new BehaviorSubject<string[]>(['USD', 'EUR', 'GBP', 'BYN',]);
  trackedCurrencies$: Observable<string[]> = this.trackedCurrenciesSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCurrencyRates(): Observable<any[]> {
    const params = new HttpParams()
      .set('source', 'USD')
      .set('currencies', this.trackedCurrenciesSubject.value.join(','))
      .set('apikey', this._apiKey);

    return this.http.get<any>(this._apiUrl, { params })
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error('Failed to fetch currency rates');
          }
          return Object.keys(response.quotes).map(key => ({
            name: key.slice(3),
            rate: response.quotes[key]
          }));
        }),
        catchError(error => {
          console.error('Error fetching currency rates:', error);
          return throwError(error);
        })
      );
  }

  addTrackedCurrency(currency: string) {
    const trackedCurrencies = this.trackedCurrenciesSubject.value;
    if (!trackedCurrencies.includes(currency)) {
      trackedCurrencies.push(currency);
      this.trackedCurrenciesSubject.next(trackedCurrencies);
    }
  }
}
