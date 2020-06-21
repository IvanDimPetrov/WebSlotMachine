import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  private imageRepo = {
    "A": "images/Apple.jpg",
    "B": "images/Banana.jpg",
    "P": "images/Pineapple.jpg",
    "*": "images/WildCard.png",
    "#": "images/Blank.jpg"
  }

  @Input() value: string;

  private imageSrc: string;

  constructor() { 
    
  }

  ngOnInit() {
    this.imageSrc = this.imageRepo[this.value];
  }

}
