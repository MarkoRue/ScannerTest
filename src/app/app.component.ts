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
    
    //UDI;04052919043919;20230225;24.02.2028;;UDI;
    this.sendUdiTestString("UDI;04052919043919;20230225;24.02.2028;;UDI;");

  }

  sendChar(char: string) {
    if (this.isLetter(char)) {
      // Letter
      this.sendKey(char, 'key' + char);
    } else {
      // not a Letter
      this.sendKey(char, char);
    }
  }

  isLetter(str: string) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  sendKey(key:string, code:string) {
    event = new KeyboardEvent('keypress', {key: key, code: code, which: 1, keyCode: 1});
    document.dispatchEvent(event);
  }

  sendUdiTestString(myString: string) {
    type CharIterator = (str: string) => void;

    const iterateOverCharacters: CharIterator = (str) => {
        for (let i = 0; i < str.length; i++) {
            const char: string = str[i];
            this.sendChar(char);
            console.log(char);
        }
    };

    iterateOverCharacters(myString);
  }
}


