import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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
import { NewUserDialogComponent } from './new-user-dialog/new-user-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';

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
    OnlineListComponent,
    NewUserDialogComponent,
    CommentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
