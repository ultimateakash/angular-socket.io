import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { categories } from 'src/app/data';
import { SocketService } from 'src/app/services/socket.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	movie!: any;
	submitted = false;
	categories!: string[];
	moviesForm!: FormGroup;
	ratings = [...Array(10)].map((_, i) => 1 + i);

	constructor(
		private socketService: SocketService,
		public bsModalRef: BsModalRef,
		private fb: FormBuilder
	) {
		Object.assign(this, { categories })
	}

	ngOnInit(): void {
		this.initForm();
		if (this.movie) {
			this.patchForm();
		}
	}

	initForm() {
		this.moviesForm = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(15)]],
			category: ['', Validators.required],
			rating: ['', Validators.required]
		})
	}

	patchForm() {
		this.moviesForm.patchValue({
			name: this.movie.name,
			category: this.movie.category,
			rating: this.movie.rating
		})
	}

	get moviesFormControl() {
		return this.moviesForm.controls;
	}

	onSubmit() {
		this.submitted = true; 
		const payload = this.moviesForm.value;
		if(this.movie && this.movie.id) {
			payload.id = this.movie.id;
			this.socketService.updateMovie(payload);
		} else {
			this.socketService.addMovie(payload);
		}
		this.moviesForm.reset();
		this.submitted = false;
		this.bsModalRef.hide(); 
	}
}
