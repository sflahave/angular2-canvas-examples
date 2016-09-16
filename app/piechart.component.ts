import { Component, ElementRef, Input, ViewChild  } from '@angular/core';

@Component({
    selector: 'piechart',
    template: `
      <div [style.width]="width">
        <canvas #canvas></canvas>
      </div>
  `
})
export class PiechartComponent {
    @ViewChild('canvas') canvasRef:ElementRef;
    private canvas: any;
    @Input() data: number[];
    @Input() width: number;
    @Input() height: number;
    @Input() colors: string[];
    @Input() title: string;

    constructor() {
        console.log("PiechartComponent constructor: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors, ' this.canvas: ', this.canvas);
    }

    ngOnInit() {
        console.log("PiechartComponent ngOnInit: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors, ' this.canvas: ', this.canvas);
    }

    ngAfterViewInit() {
        console.log("PiechartComponent ngAfterViewInit: width: ", this.width, ", height: ", this.height, ", colors: ", this.colors, ' this.canvas: ', this.canvas);
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.draw();
    }

    draw() {
        if (this.canvas.getContext) {
           let c = this.canvas.getContext('2d');

            c.fillStyle = "#fefefe";
            c.fillRect(0,0,this.width,this.height);

            let total = this.data.reduce( (prevValue, currentDatapoint) => {
                return currentDatapoint['value'] + prevValue;
            }, 0);

            const center: [number, number] = [this.width/2, this.height/2];

            //draw pie data
            var prevAngle = 0;
            for(let i = 0; i < this.data.length; i++) {
                //fraction that this pieslice represents
                let fraction = this.data[i]['value']/total;
                //calc starting angle
                let angle = prevAngle + fraction*Math.PI*2;
                //draw the pie slice
                //fill with a radial gradient
                let grad = c.createRadialGradient(center[0], center[1], 10, center[0], center[1], 100);
                grad.addColorStop(0,'white');
                grad.addColorStop(1,this.colors[i % this.colors.length]);
                c.fillStyle=grad;
                //create a path
                c.beginPath();
                c.moveTo(center[0], center[1]);
                c.arc(center[0], center[1], 100, prevAngle, angle, false);
                c.lineTo(center[0], center[1]);
                //fill it
                c.fill();
                //stroke it
                c.strokeStyle = "black";
                c.stroke();
                //update for next time through the loop
                prevAngle = angle;
            }

            //draw centered text
            c.fillStyle = "black";
            c.font = "24pt sans-serif";
            const text = this.title;
            const metrics = c.measureText(text);
            c.fillText(text, 250-metrics.width/2, 400);
        }
    }
}