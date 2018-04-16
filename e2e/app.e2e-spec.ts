import { BuscaPokemonsPage } from './app.po';

describe('busca-pokemons App', () => {
  let page: BuscaPokemonsPage;

  beforeEach(() => {
    page = new BuscaPokemonsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
