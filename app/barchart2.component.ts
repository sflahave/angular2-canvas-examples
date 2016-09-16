import { Component, ElementRef, Input, ViewChild  } from '@angular/core';

@Component({
    selector: 'barchart2',
    styles: [`
        h1.title {
            text-align: center;
            margin:0;
            font-size: 1.6em;
        }
    `],
    template: `
      <div [style.width]="width">
        <canvas #canvas></canvas>
        <h1 class="title">{{title}}</h1>
      </div>
  `
})
export class Barchart2Component {
    @ViewChild('canvas') canvasRef:ElementRef;
    private canvas: any;
    @Input() data: number[];
    @Input() width: number;
    @Input() height: number;
    @Input() colors: string[];
    @Input() title: string;

    constructor() {
        console.log("Barchart2Component constructor: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors, ' this.canvas: ', this.canvas);
    }

    ngOnInit() {
        console.log("Barchart2Component ngOnInit: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors, ' this.canvas: ', this.canvas);
    }

    ngAfterViewInit() {
        console.log("Barchart2Component ngAfterViewInit: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors, ' this.canvas: ', this.canvas);
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.draw();
    }

    draw() {
        if(this.canvas.getContext) {
            const c = this.canvas.getContext('2d');

            //fill in the background
            c.fillStyle = "#fefefe";
            c.fillRect(0,0,this.width,this.height);

            const xOffset = 25;

            //draw data bars
            let values = this.data.map( (dp) => {
                return dp['value'];
            });

            for(let i = 0, l = values.length, j = this.colors.length; i < l; i++) {
                c.fillStyle = this.colors[i % j];
                let dp = values[i];
                c.fillRect(xOffset + i*(this.width)/l+10, this.height-40-dp*5, 50, dp*5);
            }

            //draw axis lines
            c.fillStyle = 'black';
            c.lineWidth = 2.0;
            c.beginPath();
            c.moveTo(xOffset+5, 20);
            c.lineTo(xOffset+5, this.height - 40);
            c.lineTo(this.width, this.height - 40);
            c.stroke();

            //draw text and vertical lines (value label and tick mark down left side
            c.fillStyle = 'black';
            let limit = this.height / 100 + 1;
            for(let i = 0; i < limit; i++) {
                let yTickOffset = (this.height-40) - i*100;
                c.fillText(i*20 + "", 4, yTickOffset);
                c.beginPath();
                c.moveTo(xOffset, yTickOffset);
                c.lineTo(xOffset+5, yTickOffset);
                c.stroke();
            }

            //finally, add labels for the x-axis
            const labels = this.data.map( (dp) => {
                return dp['label'];
            });

            //draw horiz text
            for(let i = 0, l = labels.length; i < l; i++) {
                c.fillText(labels[i], 50 + i*this.width/l, this.height - 25);
            }
        }
    }
}