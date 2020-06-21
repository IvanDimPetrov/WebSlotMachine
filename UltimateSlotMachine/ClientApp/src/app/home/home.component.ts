import { Component, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { NgForm } from '@angular/forms';

const initialPaylines = [['#', '#', '#'], ['#', '#', '#'], ['#', '#', '#'], ['#', '#', '#']];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  private baseUrl;

  private deposit: number = 0;
  private paylines: any[] = initialPaylines;
  private winningAmount: number = 0;

  private isActive: boolean = false;
  private initialLoad: boolean = true;
  private errorMessage: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  Submit(form: NgForm) {

    if (form.valid === false || this.isActive) {
      return;
    }

    this.http.post(this.baseUrl + "api/BedeGame/StartGame", form.value).subscribe((data: any) => {

      this.SetupState(data)
      this.isActive = true;

    }, (err) => {
        this.errorMessage = "Please provide correct amounts";
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000)
    })

    form.reset();
  }

  SpinAgain() {
    this.http.get(this.baseUrl + "api/BedeGame/SpinAgain").subscribe((data: any) => {

      this.SetupState(data)

      if (!this.CheckIsActive()) {
        this.isActive = false;
        this.paylines = initialPaylines;
        this.initialLoad = false;
      }

    })
  }

  private SetupState(data) {
    this.deposit = data.deposit;
    this.winningAmount = data.winniningAmount;
    this.paylines = this.ProcessPayLines(data.payLines);
  }

  private CheckIsActive() {
    return this.deposit > 0 ? true : false;
  }

  private ProcessPayLines(paylines: string[]) {
    const procesedPaylines = [];

    for(let payline of paylines) {
      let splitedPayline = payline.split('|');
      procesedPaylines.push(splitedPayline);
    }

    return procesedPaylines;
  }
}
