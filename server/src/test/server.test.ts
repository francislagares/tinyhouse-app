import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { server } from '../app';

const mockedListings = [
  {
    id: '001',
    title: 'Clean and fully furnished apartment. 5 min away from CN Tower',
  },
  {
    id: '002',
    title: 'Luxurious home with private pool',
  },
  {
    id: '003',
    title: 'Single bedroom located in the heart of downtown San Fransisco',
  },
];

const mockedServer = setupServer(
  rest.get('/api', (req, res, ctx) => {
    return res(ctx.json({ listings: mockedListings }));
  }),
);

beforeAll(() => {
  mockedServer.listen();
});
afterAll(() => {
  mockedServer.close();
});

describe('Apollo Server', () => {
  test('display listings of apartments', async () => {
    const { query } = createTestClient(server);

    const { data } = await query({
      query: gql`
        {
          listings {
            id
            title
          }
        }
      `,
    });

    expect(data.listings).toHaveLength(3);
    expect(data.listings[1]).toEqual({
      id: '002',
      title: 'Luxurious home with private pool',
    });
  });
});
