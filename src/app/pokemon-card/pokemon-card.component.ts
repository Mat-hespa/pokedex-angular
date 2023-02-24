import { getPokemonImage, getPokemonNumber, Pokemon } from 'src/_model/Pokemon';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input()
  public pokemon: Pokemon = { image: '', number: 0, name: '', types: [] };

  getPokemonNumber = getPokemonNumber;
  getPokemonImage = getPokemonImage;
}
