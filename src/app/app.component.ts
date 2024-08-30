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
    
    console.log(event.key);

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
            this.getObjectOfBarcode(ident, this.strEnteredText);
            this.strEnteredText = "";
          }

        }
      }
    }
  }

  getObjectOfBarcode(ident: string, barcode: string) {

    console.log("full string for ident " + ident + " was found: " + barcode);

  }

  sendUdiCode() {
    console.log("dispatching event");

    this.sendChar('U', 'KeyU');
    this.sendChar('D', 'KeyD');
    this.sendChar('I', 'KeyI');
    this.sendChar(';', ';');

    this.sendChar('0', '0');
    this.sendChar('4', '4');
    this.sendChar('0', '0');
    this.sendChar('5', '5');
    this.sendChar('2', '2');
    this.sendChar('9', '9');
    this.sendChar('1', '1');
    this.sendChar('9', '9');
    this.sendChar('0', '0');
    this.sendChar('4', '4');
    this.sendChar('3', '3');
    this.sendChar('9', '9');
    this.sendChar('1', '1');
    this.sendChar('9', '9');
    this.sendChar(';', ';');

    this.sendChar('2', '2');
    this.sendChar('0', '0');
    this.sendChar('2', '2');
    this.sendChar('3', '3');
    this.sendChar('0', '0');
    this.sendChar('2', '2');
    this.sendChar('2', '2');
    this.sendChar('5', '5');
    this.sendChar(';', ';');

    this.sendChar('2', '2');
    this.sendChar('4', '4');
    this.sendChar('.', '.');
    this.sendChar('0', '0');
    this.sendChar('2', '2');
    this.sendChar('.', '.');
    this.sendChar('2', '2');
    this.sendChar('0', '0');
    this.sendChar('2', '2');
    this.sendChar('8', '8');
    this.sendChar(';', ';');

    this.sendChar(';', ';');

    this.sendChar('U', 'KeyU');
    this.sendChar('D', 'KeyD');
    this.sendChar('I', 'KeyI');
    this.sendChar(';', ';');

    //UDI;04052919043919;20230225;24.02.2028;;UDI;

  }

  sendChar(key:string, code:string) {
    event = new KeyboardEvent('keypress', {key: key, code: code, which: 1, keyCode: 1});
    document.dispatchEvent(event);
  }
}
 

