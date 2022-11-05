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
    description: "Create new page",
    prompts: [
      {
        type: "input",
        name: "featureName",
        message: "Feature name",
      },
      {
        type: "input",
        name: "pageName",
        message: "Screen name",
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

  plop.setGenerator("Component", {
    description: "Create new component",
    prompts: [
      {
        type: "list",
        name: "componentType",
        message: "Component type",
        choices: () =>
          readdirSync(`${plop.getPlopfilePath()}/src/components`, {
            withFileTypes: true,
          })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name),
      },
      {
        type: "input",
        name: "componentName",
        message: "Component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{componentType}}/{{pascalCase componentName}}/index.tsx",
        templateFile: "templates/component/index.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/components/{{componentType}}/{{pascalCase componentName}}/index.test.tsx",
        templateFile: "templates/component/test.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/components/{{componentType}}/{{pascalCase componentName}}/styles.ts",
        templateFile: "templates/component/styles.hbs",
        skipIfExists: true,
      },
    ],
  });
};
