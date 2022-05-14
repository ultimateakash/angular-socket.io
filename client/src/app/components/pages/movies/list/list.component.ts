import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SocketService } from 'src/app/services/socket.service';
import { FormComponent } from '../form/form.component';
import { Movie } from 'src/app/interfaces/movie';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	movies: Movie[] = [];

	constructor(
		private socketService: SocketService,
		private modalService: BsModalService
	) { }

	ngOnInit(): void {
		this.socketService.fetchMovies();
		this.socketService.onFetchMovies().subscribe((data: any) => this.movies = data)
	}

	handleModal(movie?: Movie) {
		this.modalService.show(FormComponent, { initialState: { movie } });
	}

	handleDelete(movie: Movie) {
        if(movie.id) {
            this.socketService.deleteMovie(movie.id);
        }
	}
}
