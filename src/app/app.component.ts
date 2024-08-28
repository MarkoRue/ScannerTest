import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ScannerTest';

  strEnteredText: string = "";

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    //this.key = event.key;
    this.strEnteredText = this.strEnteredText + event.key;
    
    this.handleScannedValues('UDI;');
    this.handleScannedValues('GTIN;');
    this.handleScannedValues('WBPLO;');
    this.handleScannedValues('WBPLO;');
  }

  handleScannedValues(ident: string) {
    if (this.strEnteredText.includes(ident)) {
      var identStartIndex: number = this.strEnteredText.indexOf(ident);

      console.log("ident: " + ident + "found at start position: " + identStartIndex);

      if (identStartIndex > 0) {
        console.log(this.strEnteredText);

        this.strEnteredText = this.strEnteredText.slice(identStartIndex);

        console.log(this.strEnteredText);
      } else {
        if (identStartIndex == 0) {
          var identEndIndex: number = this.strEnteredText.indexOf(ident, 3);

          if (identEndIndex > 0) {
            console.log("full string for ident " + ident + " was found: " + this.strEnteredText);
          }

        }
      }
    }
  }
}
 

