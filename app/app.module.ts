import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router'


import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver
} from './events/index'

import { EventsAppComponent } from './events-app.component'

//import { EventsListComponent } from './events/events-list.component'

//import { EventThumbnailComponent } from './events/event-thumbnail.component'

import { NavBarComponent } from './nav/navbar.component'

//import { EventService } from './events/shared/event.service'

import { ToastrService } from './common/toastr.service' 

import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'


@NgModule({
  imports: [BrowserModule,  RouterModule.forRoot(appRoutes)],
  declarations: [EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    CreateEventComponent,
    EventDetailsComponent,
    Error404Component],
  bootstrap: [EventsAppComponent],
  providers:[EventService,ToastrService,EventRouteActivator,EventListResolver,
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