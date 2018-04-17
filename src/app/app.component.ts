import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppService } from './app.service';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  title = 'app';
  dados_busca: any[];
  dados_especificos: any[];
  count_busca: number;

  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  constructor(private appservice: AppService) {

   // this.buscarTudo();
   this.teste();
  // console.log(this.dados_especificos);
  }



  iniciarBuscaPorPokemonsEspecificos() {
    this.dados_busca.forEach(item => {
      this.buscarPokemonEspecifico(item['url']);
    });
  }


  teste() {
    this.appservice.buscaListaCompleta().subscribe(data => {
     this.appservice.buscarPokemonEspecifico(data['results']['url']).subscribe(sub => {
       this.dados_especificos.push(sub);
     })
    });
  }


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
  }


}
