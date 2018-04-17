import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppService } from './app.service';
import { HttpModule } from '@angular/http';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import * as jQuery from 'jquery';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  @ViewChild('myModal') myModal: ElementRef;

  title = 'app';
  dados_busca: any[];
  dados_especificos: any[] = [];
  count_busca: number;
  previous_busca: string;
  next_busca: string;
  atual: any[] = null;

  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }


  toggleModal(dado: any[]): void {
    this.atual = dado;
    $(this.myModal.nativeElement).modal('show');
  }

  constructor(private appservice: AppService) {

    // this.buscarTudo();
    this.buscarTodos();
    // console.log(this.dados_especificos);
  }


  /*
    iniciarBuscaPorPokemonsEspecificos() {
      this.dados_busca.forEach(item => {
        this.buscarPokemonEspecifico(item['url']);
      });
    }
  */



  buscarTodos() {
    this.appservice.buscaListaCompleta().subscribe(async data => {
      this.count_busca = data['count'];
      this.previous_busca = data['previous'];
      this.next_busca = data['next'];
      console.log(data);

      data['results'].forEach(item => {
        // console.log(item['url']);
        this.appservice.buscarPokemonEspecifico(item['url']).subscribe(sub => {
          // console.log(sub);


          this.dados_especificos.push({
            'sprites': sub['sprites'] as any[],
            'forms': sub['forms'] as any[],
            'types': sub['types'] as any[],
            'moves': sub['moves'] as any[],
            'name': sub['name'].charAt(0).toUpperCase() + sub['name'].slice(1) as string
          });

          // console.log(this.dados_especificos);

        })
      });
    });

    // console.log(this.dados_especificos);
  }

  /*
    buscarTudo() {
      this.appservice.buscaListaCompleta().subscribe(data => {
        this.dados_busca = data['results'];
        this.count_busca = data['count'];
      });
      // await this.iniciarBuscaPorPokemonsEspecificos();
    }
    buscarPokemonEspecifico(url: string) {
      this.appservice.buscarPokemonEspecifico(url).subscribe(data => {
        this.dados_especificos.push(data['aqui']);
      });
    }*/


}
