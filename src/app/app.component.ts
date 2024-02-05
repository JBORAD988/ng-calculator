// import { Component } from '@angular/core';
// import {copyAssets} from "@angular-devkit/build-angular/src/utils/copy-assets";
// import transformJavaScript from "@angular-devkit/build-angular/src/tools/esbuild/javascript-transformer-worker";
// import {astToTypescript} from "@angular/compiler-cli/src/ngtsc/typecheck/src/expression";
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'asmr-ang-calculator';
//
//   calValue: number= 0 ;
//   funcT: any = 'NoFunction';
//   calNumber:string = 'noValue'
//
//   firstNumber: number = 0;
//   secondNumber: number = 0;
//
//
//   onClickValue(val: string, type:any){
//     // console.log("Value:", val);
//     // console.log("Type:", type);
//     if (type == 'number'){
//       this.onNumberClick(val);
//     }
//     else if (type == 'Function'){
//       this.onFunctionClick(val)
//     }
//
//   }
//
//   onNumberClick(val: string){
//     if (this.calNumber != 'noValue'){
//       this.calNumber = this.calNumber + val
//     }
//     else {
//       this.calNumber = val
//     }
//
//     this.calValue = parseFloat(this.calNumber);
//
//   }
//
//   onFunctionClick(val: string){
//     if (this.funcT == 'NoFunction'){
//       this.firstNumber  = this.calValue;
//       this.calValue = 0;
//       this.calNumber = 'noValue'
//       this.funcT = val;
//     }else if(this.funcT != 'NoFunction' ){
//       this.secondNumber = this.calValue
//       this.valueCalculate(val)
//     }
//   }
//
//
//   valueCalculate(val: string){
//     if (this.funcT == 'c') {
//       this.clearAll();
//     }
//     if (this.funcT == '+') {
//       const total = this.firstNumber + this.secondNumber;
//       this.totalAssignValues(total, val);
//       if (val == '='){
//         this.onEqualPress()
//       }
//     }
//     if (this.funcT == '-') {
//       const total = this.firstNumber - this.secondNumber;
//       this.totalAssignValues(total, val);
//       if (val == '='){
//         this.onEqualPress()
//       }
//     }
//     if (this.funcT == '/') {
//       if (this.secondNumber !== 0) {
//         const total = this.firstNumber / this.secondNumber;
//         this.totalAssignValues(total, val);
//         if (val == '='){
//           this.onEqualPress()
//         }
//       } else {
//         // Handle division by zero error, for example:
//         console.error('Cannot divide by zero');
//       }
//     }
//     if (this.funcT == '*') {
//       const total = this.firstNumber * this.secondNumber;
//       this.totalAssignValues(total, val);
//       if (val == '='){
//         this.onEqualPress()
//       }
//     }
//     if (this.funcT == '%') {
//       const total = this.firstNumber % this.secondNumber;
//       this.totalAssignValues(total, val);
//       if (val == '='){
//         this.onEqualPress()
//       }
//     }
//
//
//
//   }
//
//   totalAssignValues(Total: number ,  val: string){
//     this.calValue = Total;
//     this.firstNumber = Total;
//     this.secondNumber = 0;
//     this.calNumber =  'noValue';
//     this.funcT = val;
//   }
//
//   onEqualPress(){
//     this.firstNumber = 0;
//     this.secondNumber = 0;
//     this.funcT = 'NoFunction';
//     this.calNumber = 'noValue';
//   }
//
//   clearAll(){
//     this.firstNumber = 0;
//     this.secondNumber = 0;
//     this.calValue = 0;
//     this.funcT = 'NoFunction';
//     this.calNumber = 'noValue';
//
//   }
//
//
//
//
//
// }





import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calValue: number = 0;
  funcT: string = 'NoFunction';
  calNumber: string = 'noValue';
  firstNumber: number = 0;
  secondNumber: number = 0;



  @HostListener('document:keydown', ['$event'])
  onKeyPressed(event: KeyboardEvent): void {
    const key = event.key;

    if (this.isNumeric(key)) {
      this.onNumberClick(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
      this.onFunctionClick(key);
    } else if (key === 'Enter') {
      this.onClickValue('=', 'Function');
    } else if (key === 'Escape') {
      this.onClickValue('c', 'Function');
    }
  }

  private isNumeric(value: string): boolean {
    return /^[0-9]$/.test(value) || value === '.';
  }


  onClickValue(val: string, type: string): void {
    if (type === 'number') {
      this.onNumberClick(val);
    } else if (type === 'Function') {
      this.onFunctionClick(val);
    }
  }

  onNumberClick(val: string): void {
    this.calNumber = this.calNumber !== 'noValue' ? this.calNumber + val : val;
    this.calValue = parseFloat(this.calNumber);
  }

  onFunctionClick(val: string): void {
    if (this.funcT === 'NoFunction') {
      this.firstNumber = this.calValue;
      this.calValue = 0;
      this.calNumber = 'noValue';
      this.funcT = val;
    } else {
      this.secondNumber = this.calNumber !== 'noValue' ? this.calValue : this.secondNumber;
      this.valueCalculate(val);
    }
  }

  valueCalculate(val: string): void {
    switch (this.funcT) {
      case 'c':
        this.clearAll();
        break;
      case '+':
        this.totalAssignValues(this.firstNumber + this.secondNumber, val);
        break;
      case '-':
        this.totalAssignValues(this.firstNumber - this.secondNumber, val);
        break;
      case '/':
        if (this.secondNumber !== 0) {
          this.totalAssignValues(this.firstNumber / this.secondNumber, val);
        } else {
          console.error('Cannot divide by zero');
        }
        break;
      case '*':
        this.totalAssignValues(this.firstNumber * this.secondNumber, val);
        break;
      case '%':
        this.totalAssignValues(this.firstNumber % this.secondNumber, val);
        break;
      case '=':
        this.onEqualPress();
        break;
    }
  }

  totalAssignValues(Total: number, val: string): void {
    this.calValue = Total;
    this.firstNumber = Total;
    this.secondNumber = 0;
    this.calNumber = 'noValue';
    this.funcT = val === '=' ? 'NoFunction' : val;
  }

  onEqualPress(): void {
    if (this.funcT !== 'NoFunction') {
      this.secondNumber = this.calNumber !== 'noValue' ? this.calValue : this.secondNumber;
      this.valueCalculate('=');
    }
  }

  clearAll(): void {
    this.calValue = 0;
    this.funcT = 'NoFunction';
    this.calNumber = 'noValue';
    this.firstNumber = 0;
    this.secondNumber = 0;
  }


}

