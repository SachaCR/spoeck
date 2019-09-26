# Spoeck

Specification pattern library

# Create a specification :

```typescript
import { createSpec } from 'spoeck';

const dragon = {
  color: 'blue',
  element: 'ice',
  age: 1000,
};

const dragonIsBlue = createSpec({
  desc: 'Blue',
  isSatisfiedBy: <T>(entity: T): boolean => entity.color === 'blue',
});

dragonIsBlue.isSatisfiedBy(dragon); // => true
```

# Combining specifications with AND operator :

```typescript
import { createSpec } from 'spoeck';

const dragon = {
  color: 'blue',
  element: 'ice',
  age: 1000,
};

const dragonIsBlue = createSpec({
  desc: 'Blue',
  isSatisfiedBy: <T>(entity: T): boolean => entity.color === 'blue',
});

const dragonIsIce = createSpec({
  desc: 'Ice',
  isSatisfiedBy: <T>(entity: T): boolean => entity.element === 'ice',
});

const dragonIsBlueANDIce = dragonIsBlue.and(dragonIsIce);

dragonIsBlueANDIce.isSatisfiedBy(dragon); // => true
```

# Combining specifications with OR operator :

```typescript
import { createSpec } from 'spoeck';

const dragon = {
  color: 'blue',
  element: 'ice',
  age: 1000,
};

const dragonIsBlue = createSpec({
  desc: 'Blue',
  isSatisfiedBy: <T>(entity: T): boolean => entity.color === 'blue',
});

const dragonIsIce = createSpec({
  desc: 'Ice',
  isSatisfiedBy: <T>(entity: T): boolean => entity.element === 'ice',
});

const dragonIsBlueORIce = dragonIsBlue.or(dragonIsIce);

dragonIsBlueORIce.isSatisfiedBy(dragon); // => true
```

# Combining specifications with XOR operator :

```typescript
import { createSpec } from 'spoeck';

const dragon = {
  color: 'blue',
  element: 'ice',
  age: 1000,
};

const dragonIsBlue = createSpec({
  desc: 'Blue',
  isSatisfiedBy: <T>(entity: T): boolean => entity.color === 'blue',
});

const dragonIsIce = createSpec({
  desc: 'Ice',
  isSatisfiedBy: <T>(entity: T): boolean => entity.element === 'ice',
});

const dragonIsBlueXORIce = dragonIsBlue.xor(dragonIsIce);

dragonIsBlueXORIce.isSatisfiedBy(dragon); // => false
```

# NOT operator :

```typescript
import { createSpec } from 'spoeck';

const dragon = {
  color: 'blue',
  element: 'ice',
  age: 1000,
};

const dragonIsBlue = createSpec({
  desc: 'Blue',
  isSatisfiedBy: <T>(entity: T): boolean => entity.color === 'blue',
});

const dragonIsIce = createSpec({
  desc: 'Ice',
  isSatisfiedBy: <T>(entity: T): boolean => entity.element === 'ice',
});

const dragonIsBlueAndNotIce = dragonIsBlue.and(dragonIsIce.not());

dragonIsBlueAndNotIce.isSatisfiedBy(dragon); // => false
```
