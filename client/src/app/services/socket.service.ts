import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'; 
import { Movie } from '../interfaces/movie';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	constructor(private socket: Socket) { }

	// emit event
	fetchMovies() {
		this.socket.emit('fetchMovies');
	}

	addMovie(movie: Movie) {
		this.socket.emit('addMovie', movie);
	}
	
	updateMovie(movie: Movie) {
		this.socket.emit('updateMovie', movie);
	}

	deleteMovie(id: Number) {
		this.socket.emit('deleteMovie', id);
	}

	// listen event
	OnFetchMovies() {
		return this.socket.fromEvent('fetchMovies');
	}
}