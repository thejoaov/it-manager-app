/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable global-require */
// eslint-disable-next-line func-names
const { readdirSync } = require("fs");

module.exports = function (plop) {
  /**
   * Generate a feature Page
   */
  plop.setGenerator("Page", {
    description: "Cria uma nova tela para uma feature existente",
    prompts: [
      {
        type: "input",
        name: "featureName",
        message: "Insira o nome da feature",
      },
      {
        type: "input",
        name: "pageName",
        message: "Insira o nome da tela",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/pages/{{pascalCase featureName}}/{{pascalCase pageName}}/index.tsx",
        templateFile: "templates/page/index.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/pages/{{pascalCase featureName}}/{{pascalCase pageName}}/index.test.tsx",
        templateFile: "templates/page/test.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/routes/index.tsx",
        pattern: `// Import screens`,
        template: `import {{pascalCase pageName}} from '@pages/{{pascalCase featureName}}/{{pascalCase pageName}}'`,
      },
      {
        type: "append",
        path: "src/routes/index.tsx",
        pattern: `{/* App Routes */}`,
        template: `      <AppStack.Screen name="{{pascalCase pageName}}" component={ {{pascalCase pageName}} } />`,
      },
      {
        type: "append",
        path: "src/routes/types.ts",
        pattern: `export type AppStackParamList = {`,
        template: `  {{pascalCase pageName}}: undefined;`,
      },
    ],
  });
};
