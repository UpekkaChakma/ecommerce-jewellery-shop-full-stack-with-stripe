import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import product from './JewelleryCollection';
import banner from './banner';
import jewellery from './JewelleryCollection';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([jewellery, banner]),
})
