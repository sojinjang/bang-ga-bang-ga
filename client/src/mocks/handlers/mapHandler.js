import { rest } from 'msw';
import { ApiUrl } from '../../constants/ApiUrl';
import { MapMarker } from '../data/map/MapMarker';
import { MapCafeInfo } from '../data/map/MapCafeInfo';

export const mapHandler = [
  rest.get(process.env.REACT_APP_SERVER_URL + ApiUrl.MAP_MATCHING_POSTS + '/:region', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MapMarker[req.params.region]));
  }),
  rest.get(
    process.env.REACT_APP_SERVER_URL + ApiUrl.MAP_MATCHING_POST_CAFE_INFO + '/:cafeId',
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(MapCafeInfo[req.params.cafeId]));
    },
  ),
];
