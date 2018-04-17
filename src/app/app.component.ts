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
  dados_especificos: any[] = [];
  count_busca: number;
  previous_busca: string;
  next_busca: string;
  atual: any[] = null;

  txtNome = '';
  txtHabilidade = '';
  txtType = '';
  status_api = 'Funcionando';

  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }


  toggleModal(dado: any[]): void {
    this.atual = dado;
    $(this.myModal.nativeElement).modal('show');
  }

  dismissModal() {

    $(this.myModal.nativeElement).modal('hide');
    this.atual = null;

  }

  constructor(private appservice: AppService) {


    this.buscarTodos();

  }

  filtrar() {
    this.dados_especificos = [];
    this.next_busca = null;
    if (this.txtNome) {

      console.log(this.txtNome);
      this.buscarFiltrandoNome();
    } else if (this.txtHabilidade) {
      this.buscarFiltrandoHabilidade();
      console.log(this.txtHabilidade);
    } else if (this.txtType) {
      this.buscarFiltrandoType();
      console.log(this.txtType);
    } else {
      console.log(' do inicio');
      this.buscarTodos();
    }
  }

  buscarFiltrandoType() {

    this.appservice.buscaFiltroType(this.txtType).subscribe(async data => {
      console.log(data);


      data['pokemon'].forEach(item => {
        // console.log(item['url']);
        this.appservice.buscarPokemonEspecifico(item['pokemon']['url']).subscribe(sub => {
          // console.log(sub);
          this.dados_especificos.push({
            'sprites': sub['sprites'] as any[],
            'forms': sub['forms'] as any[],
            'abilities': sub['abilities'] as any[],
            'types': sub['types'] as any[],
            'moves': sub['moves'] as any[],
            'name': sub['name'].charAt(0).toUpperCase() + sub['name'].slice(1) as string
          });

          // console.log(this.dados_especificos);

        }, err => { this.status_api = 'Não Funcionando'; })
      });
    }, err => { this.status_api = 'Não Funcionando'; });


  }


  buscarFiltrandoHabilidade() {

    this.appservice.buscaFiltroHabilidade(this.txtHabilidade).subscribe(async data => {
      console.log(data);

      data['pokemon'].forEach(item => {
        // console.log(item['url']);
        this.appservice.buscarPokemonEspecifico(item['pokemon']['url']).subscribe(sub => {
          // console.log(sub);
          this.dados_especificos.push({
            'sprites': sub['sprites'] as any[],
            'forms': sub['forms'] as any[],
            'abilities': sub['abilities'] as any[],
            'types': sub['types'] as any[],
            'moves': sub['moves'] as any[],
            'name': sub['name'].charAt(0).toUpperCase() + sub['name'].slice(1) as string
          });

          // console.log(this.dados_especificos);

        }, err => { this.status_api = 'Não Funcionando'; })
      });
    }, err => { this.status_api = 'Não Funcionando'; });


  }

  buscarFiltrandoNome() {

    this.appservice.buscaFiltroNome(this.txtNome).subscribe(sub => {
      console.log(sub);
      this.dados_especificos.push({
        'sprites': sub['sprites'] as any[],
        'forms': sub['forms'] as any[],
        'abilities': sub['abilities'] as any[],
        'types': sub['types'] as any[],
        'moves': sub['moves'] as any[],
        'name': sub['name'].charAt(0).toUpperCase() + sub['name'].slice(1) as string
      });
    }, err => { this.status_api = 'Não Funcionando'; })


  }




  buscarNext() {

    this.appservice.buscarPokemonEspecifico(this.next_busca).subscribe(async data => {
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
            'abilities': sub['abilities'] as any[],
            'types': sub['types'] as any[],
            'moves': sub['moves'] as any[],
            'name': sub['name'].charAt(0).toUpperCase() + sub['name'].slice(1) as string
          });

          // console.log(this.dados_especificos);

        })
      }, err => { this.status_api = 'Não Funcionando'; });
    }, err => { this.status_api = 'Não Funcionando'; });
  }


  buscarTodos() {

    this.appservice.buscaListaCompleta().subscribe(data => {
      this.count_busca = data['count'];
      this.previous_busca = data['previous'];
      this.next_busca = data['next'];
      // console.log('data aqui:' + data);


      data['results'].forEach(item => {
        // console.log(item['url']);
        this.appservice.buscarPokemonEspecifico(item['url']).subscribe(sub => {
          console.log(sub);


          this.dados_especificos.push({
            'sprites': sub['sprites'] as any[],
            'abilities': sub['abilities'] as any[],
            'forms': sub['forms'] as any[],
            'types': sub['types'] as any[],
            'moves': sub['moves'] as any[],
            'name': sub['name'].charAt(0).toUpperCase() + sub['name'].slice(1) as string
          });



        })
      }, err => {
        this.status_api = 'Não Funcionando';
      });
    }, err => {
      this.status_api = 'Não Funcionando';
    });


  }




}
