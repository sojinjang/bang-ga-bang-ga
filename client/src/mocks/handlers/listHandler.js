import { rest } from 'msw';
import { ApiUrl } from '../../constants/ApiUrl';
import { MatchingPosts } from '../data/list/MatchingPosts';

export const listHandler = [
  rest.get(process.env.REACT_APP_SERVER_URL + ApiUrl.MATCHING_POSTS, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MatchingPosts));
  }),
];
