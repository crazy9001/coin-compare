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
    private socket: SocketIOClient.Socket;
    data: any = {};
    constructor(private http: HttpClient) {
        this.socket = io.connect('http://socket.coincap.io');
        this.getAllCoins();
        this.getData();
    }

    ngOnInit(): void {
        this.socket.on('trades', (dataRealtime: any) => {
            this.updateData(dataRealtime);
        });
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
        console.log(data.msg);
    }
}
