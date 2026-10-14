type Livro = { titulo: string; preco: string };

describe("Questão 2 - Livros da Books to Scrape", () => {
  it("extrai título e preço dos livros das páginas 1 e 2", () => {
    const livros: Livro[] = [];

    // Lê todos os livros da página atual
    const extrairPagina = () => {
      cy.get("article.product_pod").then(($livros) => {
        $livros.toArray().forEach((item) => {
          const titulo = Cypress.$(item).find("h3 a").attr("title") ?? "";
          const preco = Cypress.$(item).find(".price_color").text().trim();
          livros.push({ titulo, preco });
        });
      });
    };

    // Página 1
    cy.visit("http://books.toscrape.com/");
    extrairPagina();

    // Clica em "next" e aguarda a página 2 carregar
    cy.get("li.next a").click();
    cy.url().should("include", "page-2.html");

    // Página 2
    extrairPagina();

    // Resultado final
    cy.then(() => {
      livros.forEach((l) => cy.task("log", `${l.titulo} - ${l.preco}`));
      cy.task("log", `\nTotal de livros extraídos: ${livros.length}`);

      expect(livros).to.have.length(40);
    });
  });
});