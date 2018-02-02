import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import * as io from 'socket.io-client';

@Component({
    selector: 'app-coins-table',
    templateUrl: './coins-table.component.html',
    styleUrls: ['./coins-table.component.css']
})
export class CoinsTableComponent implements OnInit {
    private apiUrl = 'http://coincap.io/front';
    private socketUrl = 'http://socket.coincap.io';
    private eventListen = 'trades';
    private socket: SocketIOClient.Socket;
    data: any = {};
    
    constructor(private http: HttpClient) {
        this.socket = io.connect(this.socketUrl);
        this.socket.on(this.eventListen, (dataRealtime: any) => {
            this.updateData(dataRealtime);
        });
        this.getAllCoins();
        this.getData();
    }

    ngOnInit(): void {
    }

    getData() {
        return this.http.get(this.apiUrl);
    }

    getAllCoins() {
        this.getData().subscribe(data => {
            this.data = data;
        });
    }
    updateData(data) {
        //console.log(data);
        var coin = 'Cryptocurrency-' + data.coin;
        var coin_data = data.msg;
        var _coinTable = $('#coins-list');
        var row = _coinTable.find("tr#" + coin);
        var price = _coinTable.find("tr#" + coin + " .price");
        var change = _coinTable.find("tr#" + coin + " .change");
        var supply = _coinTable.find("tr#" + coin + " .supply");
        var volume = _coinTable.find("tr#" + coin + " .volume");
        var capital = _coinTable.find("tr#" + coin + " .market_capital");
        var _price = this.formatter.format(coin_data.price);
        var _class = coin_data.cap24hrChange >= 0 ? ' animate-green' : ' animate-red';
        if (coin_data.cap24hrChange >= 0.0) {
            $(price).html(_price).data("usd", _price);
            $(row).removeClass().addClass(_class);
        } else {
            $(price).html(_price).data("usd", _price);
            $(row).removeClass().addClass(_class)
        }
        (volume).html(this.formatter.format(coin_data.volume), 0);
        (capital).html(this.formatter.format(coin_data.mktcap), 0);
        (supply).html(this.formatter.format(coin_data.supply));
        (change).html((coin_data.perc));
        (price).html(_price);
        var previous_price = $(price).data('usd');
        //console.log(previous_price);
        
    }

    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
}
