/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = function (plop) {
  plop.setGenerator('templates', {
    description: 'Cria um novo componente',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nome do componente:',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Tipo de componente:',
        choices: ['container', 'section'],
      },
      {
        type: 'input',
        name: 'endpoint',
        message: 'onde o template será armazenado?:',
      },
    ],
    actions: function (data) {
      const basePath = `src/templates/{{endpoint}}/{{kebabCase name}}`;

      let actions = [];

      if (data.type === 'container' || data.type === 'section') {
        actions = [
          {
            type: 'add',
            path: `${basePath}/index.tsx`,
            templateFile: `plop-templates/templates/${data.type}/${data.type}.tsx.hbs`,
          },
          {
            type: 'add',
            path: `${basePath}/{{kebabCase name}}.module.css`,
            templateFile: `plop-templates/templates/${data.type}/${data.type}.module.css.hbs`,
          },
        ];
      }

      return actions;
    },
  });

  const _ = require('lodash');

  plop.setGenerator('ApiHook', {
    description: 'Cria um novo API GET para requisições HTTP',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nome do ApiHook:',
      },
      {
        type: 'list',
        name: 'method',
        message: 'Método HTTP:',
        choices: ['GET', 'POST', 'PUT', 'DELETE'],
      },
      {
        type: 'confirm',
        name: 'hasParams',
        message: 'Esse hook terá parâmetros?',
        default: false,
      },
      {
        type: 'input',
        name: 'params',
        message: 'Especifique os parâmetros (ex: page, limit, filter):',
        when: (answers) => answers.hasParams,
      },
      {
        type: 'input',
        name: 'types',
        message:
          'Especifique os tipos para os parâmetros (ex: number, number, string):',
        when: (answers) => answers.hasParams,
      },
      {
        type: 'input',
        name: 'endpoint',
        message: 'Informe o endpoint da API:',
      },
      {
        type: 'input',
        name: 'route',
        message: 'Informe onde na API o GET será armazenado:',
      },
      {
        type: 'confirm',
        name: 'createHook',
        message: 'Deseja criar um hook?',
        default: false,
      },
    ],
    actions: function (data) {
      const paramList = data.hasParams
        ? data.params.split(',').map((param) => param.trim())
        : [];
      const typeList = data.hasParams
        ? data.types.split(',').map((type) => type.trim())
        : [];
      const paramInterfaceName = `I${plop.getHelper('pascalCase')(
        data.name,
      )}Params`;

      const kebabRoute = _.kebabCase(data.route);
      const kebabName = _.kebabCase(data.name);

      const actions = [
        {
          type: 'add',
          path: `src/app/api/${kebabRoute}/${kebabName}.ts`,
          templateFile: 'plop-templates/ApiHook.ts.hbs',
          data: {
            paramInterfaceName,
            paramList,
            typeList,
          },
        },
      ];

      if (data.createHook) {
        actions.push({
          type: 'add',
          path: `src/hooks/${kebabRoute}/${kebabName}.ts`,
          templateFile: 'plop-templates/Hook.ts.hbs',
          data: {
            paramInterfaceName,
            paramList,
            typeList,
            api: `@/app/api/${kebabRoute}/${kebabName}`,
          },
        });
      }

      return actions;
    },
  });

  plop.setGenerator('Provider', {
    description: 'Cria um novo Provider',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nome do Provider:',
      },
      {
        type: 'confirm',
        name: 'hasParams',
        message: 'Esse Provider terá parâmetros?',
        default: false,
      },
      {
        type: 'input',
        name: 'params',
        message: 'Especifique os parâmetros (ex: page, limit, filter):',
        when: (answers) => answers.hasParams,
      },
      {
        type: 'input',
        name: 'types',
        message:
          'Especifique os tipos para os parâmetros (ex: number, number, string):',
        when: (answers) => answers.hasParams,
      },
    ],
    actions: function (data) {
      const paramList = data.hasParams
        ? data.params.split(',').map((param) => param.trim())
        : [];
      const typeList = data.hasParams
        ? data.types.split(',').map((type) => type.trim())
        : [];
      const paramInterfaceName = `I${plop.getHelper('pascalCase')(
        data.name,
      )}Params`;

      return [
        {
          type: 'add',
          path: `src/providers/{{camelCase name}}.tsx`,
          templateFile: 'plop-templates/Provider.tsx.hbs',
          data: {
            paramInterfaceName,
            paramList,
            typeList,
          },
        },
      ];
    },
  });
  plop.setGenerator('Middleware', {
    description: 'Cria um novo middleware',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nome do middleware:',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Tipo de middleware:',
        choices: ['Auth'],
      },
    ],
    actions: function (data) {
      const basePath = 'src/middlewares/{{kebabCase name}}';

      let actions = [];

      if (data.type === 'Auth') {
        actions = [
          {
            type: 'add',
            path: `${basePath}/index.tsx`,
            templateFile: 'plop-templates/Middleware.ts.hbs',
          },
        ];
      }

      return actions;
    },
  });
};
