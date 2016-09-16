import { Component, Directive, ElementRef, AfterViewInit, Input, Renderer, ContentChild, ViewChildren, ViewChild  } from '@angular/core';

@Component({
    selector: 'smiley',
    template: '<canvas #canvas></canvas>'
})
export class SmileyDirective {
    @ViewChild('canvas') canvasRef:ElementRef;
    private canvas: any;
    @Input('size') size: number;
    @Input('color') color: string;

    constructor(private el: ElementRef, private renderer: Renderer) {
        // console.log("SmileyDirective constructor: size: ", this.size, ", color: ", this.color, ', this.canvas: ', this.canvas);
    }

    ngOnInit() {
        // console.log("SmileyDirective ngOnInit: size: ", this.size, ", color: ", this.color, ', this.canvas: ', this.canvas);
    }

    ngAfterViewInit() {
        // console.log("SmileyDirective ngAfterViewInit: size: ", this.size, ", color: ", this.color, ', this.canvas: ', this.canvas);
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.draw();
    }

    draw() {
        if (this.canvas.getContext) {
            let canvas = this.canvas;
            if (canvas.getContext){
                var ctx = canvas.getContext('2d');
                // ctx.fillStyle='white';
                // ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.beginPath();
                ctx.arc(canvas.width*.5,canvas.height*.5,canvas.width*.4,0,Math.PI*2,true); // Outer circle
                ctx.moveTo(canvas.width*0.80,canvas.height*.45);
                ctx.arc(canvas.width*.5, canvas.height*.45, canvas.width*.30, 0, Math.PI, false);  // Mouth (clockwise)
                ctx.moveTo(canvas.width*.35+canvas.width*0.05, canvas.height*.40);
                ctx.arc(canvas.width*.35,canvas.height*.40, canvas.width*0.05,0,Math.PI*2,true);  // Left eye
                ctx.moveTo(canvas.width*.65+canvas.width*0.05,canvas.height*.40);
                ctx.arc(canvas.width*.65,canvas.height*.40, canvas.width*0.05,0,Math.PI*2,true);  // Right eye
                ctx.strokeStyle = this.color;
                ctx.stroke();
            }
        }
    }
}