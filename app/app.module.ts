import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';


import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventResolver,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator
} from './events/index'

import { EventsAppComponent } from './events-app.component'

//import { EventsListComponent } from './events/events-list.component'

//import { EventThumbnailComponent } from './events/event-thumbnail.component'

import { NavBarComponent } from './nav/navbar.component'

//import { EventService } from './events/shared/event.service'

import { JQ_TOKEN,
  TOASTR_TOKEN, 
  Toastr,
  CollapsibleWellComponent,SimpleModalComponent,ModalTriggerDirective } from './common/index'
//import { CollapsibleWellComponent } from './common/collapsible-well.component'

import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'

declare let toastr : Toastr
declare let jQuery : Object;

@NgModule({
  imports: [BrowserModule,  RouterModule.forRoot(appRoutes),FormsModule,ReactiveFormsModule,HttpModule],
  declarations: [EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    CreateEventComponent,
    EventDetailsComponent,
    Error404Component,    CreateSessionComponent,
    SessionListComponent,CollapsibleWellComponent,DurationPipe,SimpleModalComponent,ModalTriggerDirective,UpvoteComponent,LocationValidator],
  bootstrap: [EventsAppComponent],
  providers:[EventService, { provide: TOASTR_TOKEN, useValue: toastr },
    VoterService,
    { provide: JQ_TOKEN, useValue: jQuery },
    EventRouteActivator,
    EventListResolver,
    AuthService,
    { 
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState 
    },EventResolver]
})
export class AppModule {}

function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true
}