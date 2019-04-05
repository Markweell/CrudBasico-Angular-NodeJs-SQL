import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from 'src/app/models/Game';
import {GamesService} from 'src/app/services/games.service'
import {Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ca-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  game: Game = {
    title : '',
    description : '',
    image :''
  };
  params: any;
  edit: Boolean = false;
  constructor( private gameService: GamesService, private route: Router,private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.activedRoute.snapshot.params;
    if (this.params.id) {
      this.gameService.getGame(this.params.id).subscribe(res => {
        this.game.title = res['title'];
        this.game.description = res['description'];
        this.game.image = res['image'];
        this.edit = true;
      },
      err => console.error(err)
      )
    }
  }
  saveNewGame(){
    this.gameService.saveGame(this.game).subscribe(res=>{console.log(res)},err=>console.error(err))
    this.route.navigate(['/games']);
  }
  updateGame(){
    this.gameService.updateGame(this.params.id, this.game).subscribe(
      res=> {
        this.route.navigate(['/games']);
      },
      err => console.error(err)
    );

  }
}
