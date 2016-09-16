import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {BarchartComponent, BarchartDataDirective} from "./barchart.component";
import {SmileyDirective} from "./smiley.component";
import {PiechartComponent} from "./piechart.component";
import {Barchart2Component} from "./barchart2.component";

@NgModule({
    imports: [ BrowserModule ],
    declarations: [
        AppComponent,
        BarchartComponent,
        BarchartDataDirective,
        Barchart2Component,
        PiechartComponent,
        SmileyDirective
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }