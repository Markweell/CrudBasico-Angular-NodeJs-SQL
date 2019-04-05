import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ca-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: any = [];
  constructor(private gameService: GamesService, private router: Router) {}

  ngOnInit() {
   this.showGames();
  }
  showGames(){
    this.gameService.getGames().subscribe(
      res => {
        this.games = res['games'];
      },
      err => console.error(err)
    );
  }
  deleteGame(id: string) {
    this.gameService.deleteGame(id).subscribe(
      res=> {
        this.showGames();
        console.log(this)
      },
      err => console.error(err)
    );

  }

}
