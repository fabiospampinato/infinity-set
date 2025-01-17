
/* IMPORT */

import {describe} from 'fava';
import InfinitySet from '../../dist/index.js';

/* MAIN */

describe ( 'InfinitySet', it => {

  it ( 'does not throw with 20M items', t => {

    const set = new InfinitySet ();

    for ( let i = 0, l = 20_000_000; i < l; i++ ) {
      set.add ( i );
    }

    for ( let i = 0, l = 20_000_000; i < l; i++ ) {
      t.true ( set.has ( i ) );
    }

  });

});
