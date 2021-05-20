
/* INFINITY SET */

class InfinitySet<T> {

  /* VARIABLES */

  private current: Set<T>;
  private pool: Set<T>[];

  /* CONSTRUCTOR */

  constructor (values?: Iterable<T> | null) {

    this.clear ();

    if (values != null && Symbol.iterator in values) {

      for (const value of values) {

        this.add(value)

      }

    }

  }

  /* GETTERS */

  get size (): number {

    return this.pool.reduce ( ( sum, set ) => sum + set.size, 0 );

  }

  /* API */

  add ( value: T ): this {

    if ( this.has ( value ) ) return this;

    this.current.add ( value );

    if ( this.current.size === 16777215 ) {

      this.current = new Set<T> ();
      this.pool.push ( this.current );

    }

    return this;

  }

  clear (): undefined {

    this.current = new Set<T> ();
    this.pool = [this.current];

    return;

  }

  has ( value: T ): boolean {

    return this.pool.some ( set => set.has ( value ) );

  }

  delete ( value: T ): boolean {

    return this.pool.some ( set => set.delete ( value ) );

  }

  /* ITERATION API */

  * [Symbol.iterator] (): IterableIterator<T> {

    for ( const set of this.pool ) {

      yield * set[Symbol.iterator]();

    }

  }

  * keys (): IterableIterator<T> {

    for ( const set of this.pool ) {

      yield * set.keys ();

    }

  }

  * values (): IterableIterator<T> {

    for ( const set of this.pool ) {

      yield * set.values ();

    }

  }

  * entries (): IterableIterator<[T, T]> {

    for ( const set of this.pool ) {

      yield * set.entries ();

    }

  }

  forEach ( callback: ( value: T, key: T, set: InfinitySet<T> ) => void, thisArg?: any ): undefined {

    for ( const value of this ) {

      callback.call ( thisArg, value, value, this );

    }

    return;

  }

};

/* EXPORT */

export default InfinitySet;
