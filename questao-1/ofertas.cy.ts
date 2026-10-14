type Produto = { nome: string; preco: number };

describe("Questão 1 - Robô de ofertas da SauceDemo", () => {
  it("faz login, mapeia a vitrine e lista produtos abaixo de $20.00", () => {
    // 1) Login
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");

    // 2) Mapeia TODOS os itens da página inicial (nome e preço)
    cy.get('[data-test="inventory-item"]').then(($itens) => {
      const todos: Produto[] = $itens.toArray().map((item) => {
        const nome = Cypress.$(item)
          .find('[data-test="inventory-item-name"]')
          .text()
          .trim();
        const preco = parseFloat(
          Cypress.$(item)
            .find('[data-test="inventory-item-price"]')
            .text()
            .replace("$", "")
        );
        return { nome, preco };
      });

      // 3) Filtra apenas os que custam menos de $20.00
      const ofertas = todos.filter((p) => p.preco < 20.0);

      // 4) Exibe no console (terminal)
      cy.task("log", `\nProdutos mapeados: ${todos.length}`);
      cy.task("log", "Ofertas abaixo de $20.00:");
      ofertas.forEach((p) =>
        cy.task("log", `  - ${p.nome}: $${p.preco.toFixed(2)}`)
      );

      // 5) Salva também em arquivo
      cy.writeFile("questao-1/ofertas.json", ofertas);

      // Validações
      expect(todos.length).to.be.greaterThan(0);
      expect(ofertas.length).to.be.greaterThan(0);
      ofertas.forEach((p) => expect(p.preco).to.be.lessThan(20));
    });
  });
});
