import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '0qjyokhp',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: process.env.NEXT_UPEK_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const imgUrl = (source) => builder.image(source);