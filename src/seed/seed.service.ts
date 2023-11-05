import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ){}

  // constructor(

  // ){}
 
  async executeSeed(){

    await this.pokemonModel.deleteMany({}); //delete * from pokemons;

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    //PRIMERA FORMA DE INSERTAR

    // const insertPromisesArray = [];

    // data.results.forEach(async({ name, url  }) => {

    //   const segments = url.split('/');
    //   const no: number = +segments[ segments.length - 2 ];
    //   // const pokemon = await this.pokemonModel.create({name, no});

    //   // console.log({name,no})
    //   insertPromisesArray.push(
    //       this.pokemonModel.create({name, no})
    //   );
    // })

    // await Promise.all( insertPromisesArray )

    // return 'Seed executed';

    //SEGUNDA FORMA DE INSERTAR

    const pokemonToInsert: {name: string, no: number}[] = [];

    data.results.forEach(async({ name, url  }) => {

      const segments = url.split('/');
      const no: number = +segments[ segments.length - 2 ];
      // const pokemon = await this.pokemonModel.create({name, no});

      // console.log({name,no})
      pokemonToInsert.push(
        ({name, no})
      );
    })

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';

  }
}
