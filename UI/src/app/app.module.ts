import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { StoryComponent } from './story/story.component';
import { WritePostComponent } from './write-post/write-post.component';
import { PostComponent } from './post/post.component';
import { EventComponent } from './event/event.component';
import { OnlineListComponent } from './online-list/online-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LeftSidebarComponent,
    MainContentComponent,
    RightSidebarComponent,
    StoryComponent,
    WritePostComponent,
    PostComponent,
    EventComponent,
    OnlineListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
