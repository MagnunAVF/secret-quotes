import { Component, OnInit } from '@angular/core';
import { QuotesService } from './../../services/quotes.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: [
    './quote.component.scss',
    './../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
  ]
})
export class QuoteComponent implements OnInit {
  quote = 'No quote. Get one!';

  constructor(private quotesService: QuotesService) { }

  ngOnInit() {
  }

  async getQuote() {
    await this.quotesService.getQuote('/quote', {}).toPromise().then(
      (result) => {
        this.quote = result.quote;
      },
      (error) => {
        this.quote = 'Error getting quote';
        console.log(`Error: ${error}`);
      }
    );
  }
}
