import { stackMiddlewares } from './middlewares/stack-handler';
import { auth } from './middlewares/with-user';

const middlewares = [auth];
export default stackMiddlewares(middlewares);
