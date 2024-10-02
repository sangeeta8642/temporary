import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  fetch,
  accessKey: process.env.UNSPLASH_ACCESS_KEY!

  //to fetch the images from the unplash we have to add an access key into the .env file 
});