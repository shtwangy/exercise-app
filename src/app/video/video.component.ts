import { Component, OnInit } from '@angular/core';
import { ExerciseLogService } from '../core/services/exercise-log/exercise-log.service';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  id = '60YEfkhmOOM';
  startTime: number;

  constructor(
    private authService: AuthService,
    private exerciseLogService: ExerciseLogService
  ) { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  onReady(event: YT.PlayerEvent): void {
    this.startTime = new Date().getTime();
  }

  onStateChange(event: YT.OnStateChangeEvent): void {
    if (event.data === YT.PlayerState.PLAYING ) {
      this.startTime = new Date().getTime();
    }
    if (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) {
      const exerciseTime = (new Date().getTime() - this.startTime) / 1000;
      console.log(exerciseTime);
      this.exerciseLogService.updateExerciseLog(this.authService.currentUser.uid, exerciseTime).subscribe(
        res => console.log(res)
      );
      this.startTime = new Date().getTime();
    }
  }


}
