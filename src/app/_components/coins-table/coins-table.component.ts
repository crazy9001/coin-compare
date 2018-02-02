import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

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
        var coin: string = 'Cryptocurrency-' + data.coin;
        var coin_data: any = data.msg;
        var _coinTable = $('#coins-list');
        var row = _coinTable.find("tr#" + coin);
        var price = _coinTable.find("tr#" + coin + " .price");
        var change = _coinTable.find("tr#" + coin + " .change");
        var supply = _coinTable.find("tr#" + coin + " .supply");
        var volume = _coinTable.find("tr#" + coin + " .volume");
        var capital = _coinTable.find("tr#" + coin + " .market_capital");
        var _price = formatter.format(coin_data.price);

        (volume).html(formatter.format(coin_data.volume), 0);
        (capital).html(formatter.format(coin_data.mktcap), 0);
        (supply).html(formatter.format(coin_data.supply));
        (price).html(_price);
    }

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
}
