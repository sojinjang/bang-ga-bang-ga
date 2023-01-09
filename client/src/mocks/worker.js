import { setupWorker } from 'msw';
import { mapHandler } from './handlers/mapHandler';
import { listHandler } from './handlers/listHandler';

export const worker = setupWorker(...mapHandler, ...listHandler);
