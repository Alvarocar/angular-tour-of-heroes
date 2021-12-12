import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes'; 
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private readonly heroesUrl = 'api/heroes'
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private messageService: MessageService, private httpC: HttpClient) { }
  
  getHeroes(): Observable<Hero[]> {
    return this.httpC.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError<Hero[]>('getHeroes', [])),
      tap(_ => this.log('fetched heroes'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  /**
   * returns the first elements of the HEROES array
   */
  getTopHeroes(): Observable<Hero[]> {
    return this.httpC.get<Hero[]>(this.heroesUrl)
    .pipe(
      map(heroes => heroes.slice(1, 5)),
      catchError(this.handleError<Hero[]>('getTopHeroes', []))
    )
  }
  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(hero => hero.id === id)!
    return this.httpC.get<Hero>(`${this.heroesUrl}/${id}`)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }
  updateHero(hero: Hero): Observable<any> {
    return this.httpC.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap(_ => this.log(`update hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }
}
