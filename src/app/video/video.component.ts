import { Component, OnInit } from '@angular/core';
import { ExerciseLogService } from '../core/services/exercise-log/exercise-log.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  id = '60YEfkhmOOM';
  startTime: number;

  constructor(
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
      // console.log('経過時間');
      const exerciseTime = (new Date().getTime() - this.startTime) / 1000;
      console.log(exerciseTime);
      this.exerciseLogService.createExerciseLog(exerciseTime);
      this.startTime = new Date().getTime();
    }
  }


}
