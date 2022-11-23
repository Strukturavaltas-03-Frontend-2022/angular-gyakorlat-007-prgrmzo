import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss'],
})
export class EventEditorComponent implements OnInit {
  event: Event = new Event();

  constructor(
    private eventService: EventService,
    private ar: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((params) =>
      this.eventService.get(params['id']).subscribe((event) => {
        this.event = event || new Event();
      })
    );
  }

  onUpdate(eventForm: NgForm): void {
    this.eventService.update(eventForm.value).subscribe((event) => {
      this.router.navigate(['/']);
    });
  }
}
