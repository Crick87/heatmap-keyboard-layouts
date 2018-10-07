import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Input text
  text = '';
  // Normalized text
  altText = '';
  // Chars, l=letter, t=times, p=percent
  chars = [{l: 'a', t: 0, p: 0}, {l: 'b', t: 0, p: 0}, {l: 'c', t: 0, p: 0},
           {l: 'd', t: 0, p: 0}, {l: 'e', t: 0, p: 0}, {l: 'f', t: 0, p: 0},
           {l: 'g', t: 0, p: 0}, {l: 'h', t: 0, p: 0}, {l: 'i', t: 0, p: 0},
           {l: 'j', t: 0, p: 0}, {l: 'k', t: 0, p: 0}, {l: 'l', t: 0, p: 0},
           {l: 'm', t: 0, p: 0}, {l: 'n', t: 0, p: 0}, {l: 'ñ', t: 0, p: 0},
           {l: 'o', t: 0, p: 0}, {l: 'p', t: 0, p: 0}, {l: 'q', t: 0, p: 0},
           {l: 'r', t: 0, p: 0}, {l: 's', t: 0, p: 0}, {l: 'u', t: 0, p: 0},
           {l: 'v', t: 0, p: 0}, {l: 'w', t: 0, p: 0}, {l: 'x', t: 0, p: 0},
           {l: 'y', t: 0, p: 0}, {l: 'z', t: 0, p: 0}];

  calcMap() {
    this.altText = this.normalize(this.text);
    this.count();
    this.calcPercent();
    console.log(this.chars);
  }

  normalize(s) {
    let r = s.toLowerCase();
                r = r.replace(new RegExp(/\s/g), '');
                r = r.replace(new RegExp(/[àáâãäå]/g), 'a');
                r = r.replace(new RegExp(/[èéêë]/g), 'e');
                r = r.replace(new RegExp(/[ìíîï]/g), 'i');
                r = r.replace(new RegExp(/[òóôõö]/g), 'o');
                r = r.replace(new RegExp(/[ùúûü]/g), 'u');
    return r;
  }

  howManyTimes(char, string) {
    let times = 0;
    for (let i = 0; i < string.length; i++) {
      if (string[i] === char) {
        times ++;
      }
    }
    return times;
  }

  count() {
    this.chars.forEach(char => {
      char.t = this.howManyTimes(char.l, this.altText);
    });
  }

  calcPercent() {
    let max = 0;
    this.chars.forEach(char => {
      if (char.t > max) {
        max = char.t;
      }
    });
    this.chars.forEach(char => {
      char.p = char.t * 100 / max;
    });
  }

}
