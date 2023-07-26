
import env from 'dotenv';

export default class conFig {
 port = env.config()?.parsed?.PORT || 3000;

}