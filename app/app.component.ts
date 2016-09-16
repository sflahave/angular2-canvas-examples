import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    styles: [`
        piechart {
            display: block;
            clear: both;
            margin-top: 30px;
        }
        
        barchart {
            margin: 30px;
        }
        
        h3 {
            margin-top:20px;
            margin-bottom: 0;
        }
    `],
    template: `
  <h1>Charts of important things</h1>
  <h3>This barchart component uses an attribute directive on a canvas element. Meh.</h3>
  <barchart [data]="salesData" [width]="500" [height]="500" [colors]="['navy']" [title]="'Monthly Sales 2016'"></barchart>
  <hr/>
  <h3>This version of barchart component just uses a Component whose template has a canvas, and uses the ViewRef decorator to get at the canvas:</h3>
  <barchart2 [data]="consistencyData" [width]="700" [height]="700" [colors]="colors2" [title]="'Monthly consistency levels'"></barchart2>
  <hr/>
  <h3>Another type of chart, a pizza pie chart (nyuck, nyuck), also uses the much nicer ViewRef technique:</h3>
  <piechart [data]="pizzaData" [width]="500" [height]="500" [colors]="colors2" [title]="'Pizza Consumption Per-Capita'"></piechart>
  <hr/>
  <h3>And if charts aren't you're thing, here's another example - a "smiley" component that draws a smiley face, given a size and color.</h3>
  <p>Hey you did a great job on that thing, pal! Real proud of ya! <smiley [size]="40" [color]="'green'"> </smiley></p>
`
})
export class AppComponent {
    salesData = [
        { label: 'JAN', value: this.getRandomInt() },
        { label: 'FEB', value: this.getRandomInt() },
        { label: 'MAR', value: this.getRandomInt() },
        { label: 'APR', value: this.getRandomInt() },
        { label: 'JUN', value: this.getRandomInt() },
        { label: 'JUL', value: this.getRandomInt() }
    ] ;

    consistencyData = [
        { label: 'JAN', value: 83 },
        { label: 'FEB', value: 41 },
        { label: 'MAR', value: 10 },
        { label: 'APR', value: 98 },
        { label: 'JUN', value: 50 },
        { label: 'JUL', value: 25 },
        { label: 'AUG', value: 122 },
        { label: 'SEP', value: 36 },
        { label: 'OCT', value: 100 },
    ] ;
    colors2 = [ '#5882FA', 'orange', '#0B3B2E', 'red','#689a68', '#FF00BF', '#008080', '#f16e23'  ];

    pizzaData = [
        { label: 'Pepperoni', value: this.getRandomInt() },
        { label: 'Sausage', value: this.getRandomInt() },
        { label: 'Onions', value:  this.getRandomInt() },
        { label: 'Olives', value:  this.getRandomInt() },
        { label: 'Pineapple', value:  this.getRandomInt() }
    ] ;

    getRandomInt(max = 100) {
        return Math.floor(Math.random()*max);
    }
}