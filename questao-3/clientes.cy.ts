type Cliente = { primeiroNome: string; ultimoNome: string; site: string };

describe("Questão 3 - Tabela de clientes com dívida", () => {
  it("lista clientes da Table 1 com Due superior a $50.00", () => {
    cy.visit("https://the-internet.herokuapp.com/tables");

    cy.get("#table1").then(($tabela) => {
      // Descobre a posição de cada coluna pelo nome do cabeçalho
      const colunas = $tabela
        .find("thead th")
        .toArray()
        .map((th) => Cypress.$(th).text().trim());

      const iUltimo = colunas.indexOf("Last Name");
      const iPrimeiro = colunas.indexOf("First Name");
      const iDue = colunas.indexOf("Due");
      const iSite = colunas.indexOf("Web Site");

      const devedores: Cliente[] = [];

      // Percorre todas as linhas da tabela
      $tabela
        .find("tbody tr")
        .toArray()
        .forEach((linha) => {
          const celulas = Cypress.$(linha).find("td");

          const due = parseFloat(
            celulas.eq(iDue).text().replace("$", "").replace(",", "")
          );

          if (due > 50.0) {
            devedores.push({
              primeiroNome: celulas.eq(iPrimeiro).text().trim(),
              ultimoNome: celulas.eq(iUltimo).text().trim(),
              site: celulas.eq(iSite).text().trim(),
            });
          }
        });

      // Exibe no console (terminal)
      cy.task("log", "\nClientes com dívida superior a $50.00:");
      devedores.forEach((c) =>
        cy.task(
          "log",
          `  - ${c.primeiroNome} ${c.ultimoNome} | ${c.site}`
        )
      );

      expect(devedores.length).to.be.greaterThan(0);
    });
  });
});