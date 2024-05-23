import { Component } from '@angular/core';

// Custom elements imports
import { StaticRoutes } from '../../core/routes/static.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  staticRoutes: StaticRoutes = new StaticRoutes()
}
