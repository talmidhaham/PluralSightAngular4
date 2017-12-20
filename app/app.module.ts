import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent
} from './events/index'

import { EventsAppComponent } from './events-app.component'

//import { EventsListComponent } from './events/events-list.component'

//import { EventThumbnailComponent } from './events/event-thumbnail.component'

import { NavBarComponent } from './nav/navbar.component'

//import { EventService } from './events/shared/event.service'

import { ToastrService } from './common/toastr.service' 

import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'


@NgModule({
  imports: [BrowserModule,  RouterModule.forRoot(appRoutes),FormsModule,ReactiveFormsModule],
  declarations: [EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    CreateEventComponent,
    EventDetailsComponent,
    Error404Component,    CreateSessionComponent,
    SessionListComponent],
  bootstrap: [EventsAppComponent],
  providers:[EventService,ToastrService,EventRouteActivator,EventListResolver,AuthService,
    { 
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState 
    }]
})
export class AppModule {}

function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true
}