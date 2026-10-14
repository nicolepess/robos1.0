import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "*/*.cy.ts",
    supportFile: false,
    setupNodeEvents(on) {
      // Permite exibir mensagens no console (terminal)
      on("task", {
        log(mensagem: string) {
          console.log(mensagem);
          return null;
        },
      });
    },
  },
});
