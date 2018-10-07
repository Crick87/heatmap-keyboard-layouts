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
           {l: 'r', t: 0, p: 0}, {l: 's', t: 0, p: 0}, {l: 't', t: 0, p: 0},
           {l: 'u', t: 0, p: 0}, {l: 'v', t: 0, p: 0}, {l: 'w', t: 0, p: 0},
           {l: 'x', t: 0, p: 0}, {l: 'y', t: 0, p: 0}, {l: 'z', t: 0, p: 0},
           {l: ',', t: 0, p: 0}, {l: '.', t: 0, p: 0}, {l: '-', t: 0, p: 0}];

  keyboards = [
    {
      name: 'qwerty',
      keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G',
            'H', 'J', 'K', 'L', 'Ñ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '-']
    },
    {
      name: 'dvorak',
      keys: ['.', ',', 'Ñ', 'P', 'Y', 'F', 'G', 'C', 'H', 'L', 'A', 'O', 'E', 'U', 'I',
            'D', 'R', 'T', 'N', 'S', '-', 'Q', 'J', 'K', 'X', 'B', 'M', 'W', 'V', 'Z']
    },
    {
      name: 'colemak',
      keys: ['Q', 'W', 'F', 'P', 'G', 'J', 'L', 'U', 'Y', 'Ñ', 'A', 'R', 'S', 'T', 'D',
             'H', 'N', 'E', 'I', 'O', 'Z', 'X', 'C', 'V', 'B', 'K', 'M', ',', '.', '-']
    }
  ];

  calcMap() {
    this.altText = this.normalize(this.text);
    this.count();
    this.calcPercent();
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

  getColor( letter ) {
    const pos = this.chars.map(function(e) { return e.l; }).indexOf(letter.toLowerCase());
    const percent = this.chars[pos].p;
    return this.shadeColor('#f44336', (100 - (percent || 0)) / 100 );
  }

  shadeColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }

}
