import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/comman/header/header.component';
import { ListComponent } from './components/pages/movies/list/list.component';
import { FormComponent } from './components/pages/movies/form/form.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ModalModule } from 'ngx-bootstrap/modal';   

const config: SocketIoConfig = {
	url: 'http://localhost:3001',
	options: {
		transports: ['websocket']
	}
}

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ListComponent,
		FormComponent
	],
	imports: [
		BrowserModule,
		SocketIoModule.forRoot(config),
		ModalModule.forRoot(),  
		FormsModule,
		ReactiveFormsModule 
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
