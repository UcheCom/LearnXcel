import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet],
  // providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppComponent {
  title = 'learnXcel';
}
