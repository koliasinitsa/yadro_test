import { Component, Output, EventEmitter } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.css']
})
export class AddCurrencyComponent {
  currenciesToAdd: string[] = ['CNY', 'JPY', 'TRY'];
  selectedCurrency: string = '';
  loading: boolean = false;
  currencyToAdd: string = '';

  constructor(
    private currencyService: CurrencyService
  ) { }
  
  onAddCurrency() {
    if (this.selectedCurrency) {
      this.currencyService.addTrackedCurrency(this.selectedCurrency);
      this.selectedCurrency = '';
    }
  }
}
