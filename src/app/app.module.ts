import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './_components/header/header.component';
import {AdsenseContainerComponent} from './_components/adsense-container/adsense-container.component';
import { NewsTickerComponent } from './_components/news-ticker/news-ticker.component';
import { CoinsTableComponent } from './_components/coins-table/coins-table.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AdsenseContainerComponent,
        NewsTickerComponent,
        CoinsTableComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
