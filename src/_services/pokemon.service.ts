import { Pokemon } from 'src/_model/Pokemon';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public pokemons: Pokemon[] = [];
  constructor(private httpClient: HttpClient) {
    var botao = document.getElementById("#botao");
    let number = 15;
    let allPokemonsUrl = `https://pokeapi.co/api/v2/pokemon?limit=${number}`;

    function addNumber(){
      number += 5;
      console.log(number);
    }

    botao?.addEventListener("click", addNumber);


    this.httpClient
      .get<any>(allPokemonsUrl)
      .pipe(
        map((value) => value.results),
        map((value: any) => {
          return from(value).pipe(
            mergeMap((v: any) => this.httpClient.get(v.url))
          );
        }),
        mergeMap((value) => value)
      )
      .subscribe(
        (result: any) =>
          (this.pokemons[result.id] = {
            image: result.sprites.front_default,
            number: result.id,
            name: result.name,
            types: result.types.map(
              (t: { type: { name: any } }) => t.type.name
            ),
          })
      );
  }
}


