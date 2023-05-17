import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Nest Api
 * O Next possui um node rodando implicitamente, com esse recurso é possivel
 * que o Next crie APIs (REST) semelhante as que criamos no Node por exemplo
 * com o Express.
 * Esse é um Exemplo em que criamos uma api de cursos.
 * Para criar uma Api no Next basta adicionar o arquivo dentro da pasta api,
 * que o Next automaticamente comeca a servir esse arquivo como uma rota api
 * Ex: http://localhost:3000/api/course
 *
 * Eu podemos perceber o uso dos tipos NextApiRequest e NextApiResponse,
 * esse tipos são nativos do next, e se explorarmos internamente veremos
 * informacoes que são comuns a requests como :query, body e
 * a responses como statusCode e statusMessage
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default (request: NextApiRequest, response: NextApiResponse) => {
  const courses = [
    { id: 1, name: 'Next.js com Typescript' },
    { id: 2, name: 'React.js com Typescript' },
    { id: 3, name: 'Nest.js com Typescript' },
    { id: 4, name: 'Node.js com Typescript' },
    { id: 5, name: 'Sass' },
    { id: 6, name: 'Webpack Typescript' },
    { id: 7, name: 'Yarn' },
    { id: 8, name: 'Api' },
  ];

  return response.json(courses);
};
