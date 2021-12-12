import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes'; 
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES)
    this.messageService.add('HeroService: fetched heroes')
    return heroes
  }
  /**
   * returns the first elements of the HEROES array
   */
  getTopHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES.slice(1, 5))
    this.messageService.add('HeroService: fetched top 5 heroes')
    return heroes
  }
  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(hero => hero.id === id)!
    this.messageService.add(`HeroService: fetched hero id=${id}`)
    return of(hero)
  }
}
