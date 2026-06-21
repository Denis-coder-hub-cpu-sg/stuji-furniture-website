import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig);

if (typeof window !== 'undefined') {
  import('./react-components/register-widgets');
}