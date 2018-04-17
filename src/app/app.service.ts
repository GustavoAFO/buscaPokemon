import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppService {


    headers: Headers;
    options: RequestOptions;
    constructor(public http: Http) {

        this.headers = new Headers({
            'Content-Type': 'application/json',
        });
        this.options = new RequestOptions({ headers: this.headers });
    }


    buscaListaCompleta() {
        const url = 'https://pokeapi.co/api/v2/pokemon/';
        return this.http.get(url, this.options).map(res => res.json()).catch(this.handleError);

    }

    buscarPokemonEspecifico(url: string) {
        return this.http.get(url, this.options).map(res => res.json()).catch(this.handleError);

    }

    buscaFiltroNome(nome: string) {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + nome;
        return this.http.get(url, this.options).map(res => res.json()).catch(this.handleError);

    }

    buscaFiltroHabilidade(nome: string) {
        const url = 'https://pokeapi.co/api/v2/ability/' + nome;
        return this.http.get(url, this.options).map(res => res.json()).catch(this.handleError);

    }

    buscaFiltroType(nome: string) {
        const url = 'https://pokeapi.co/api/v2/type/' + nome;
        return this.http.get(url, this.options).map(res => res.json()).catch(this.handleError);

    }

    handleError(error) {
        console.log(error);
        return Observable.throw(error.json().error || 'SERVER ERROR');
    }



}
