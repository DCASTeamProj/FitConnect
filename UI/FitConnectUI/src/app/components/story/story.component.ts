import { Component } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
  stories = [
    { image: 'assets/images/DPHeadshot.jpg', name: 'DP' },
    { image: 'assets/images/mike.jpg', name: 'Mike' },
    { image: 'assets/images/jim.jpg', name: 'Jim' },
    { image: 'assets/images/lama.jpg', name: 'Lama' }
  ];
}
