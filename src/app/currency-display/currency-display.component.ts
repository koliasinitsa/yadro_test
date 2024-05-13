import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-display',
  templateUrl: './currency-display.component.html',
  styleUrls: ['./currency-display.component.css']
})
export class CurrencyDisplayComponent implements OnInit {
  displayedCurrencies: any[] = [];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    // Подписываемся на обновления списка отслеживаемых валют
    this.currencyService.trackedCurrencies$
      .subscribe(currencies => {
        this.displayedCurrencies = currencies;
        // Загружаем данные о курсах валют при изменении списка отслеживаемых валют
        this.getCurrencyRates();
      });

    // Загружаем начальные данные о курсах валют
    this.getCurrencyRates();
  }

  getCurrencyRates(): void {
    this.currencyService.getCurrencyRates()
      .subscribe(data => {
        this.displayedCurrencies = data;
      });
  }
}
