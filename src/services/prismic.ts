import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';

const apiEndpoint = process.env.PRISMIC_END_POINT as string;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN as string;
/**
 * The project's Prismic repository name.
 */
// export const repositoryName: string = prismic.getRepositoryName(apiEndpoint);

type Route = {
  type: string;
  path: string;
};

// Update the routes array to match your project's route structure
const routes: Route[] = [
  {
    type: 'homepage',
    path: '/',
  },
  {
    type: 'page',
    path: '/:uid',
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */
export const createClient = (
  config: prismicNext.CreateClientConfig = {},
): prismic.Client => {
  const client = prismic.createClient(apiEndpoint, {
    accessToken: accessToken,
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
