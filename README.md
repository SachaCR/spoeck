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
  desc: 'Dragon is blue',
  name: 'dragonIsBlue',
  isSatisfiedBy: <T>(entity: T) => ({ value: entity.color === 'blue' }),
});

const result = dragonIsBlue.isSatisfiedBy(dragon);

const result.value // --> true
```

# Result format :

The specification `isSatisifiedBy` function will always return an object with these properties.
- `name`: is the name of the specification.
- `desc`: is the description of the specification.
- `value`: is the boolean that indicate if the specification is respected.
- `details`: Is the list of all sub specifications results.

```typescript
// With a simple rule :
const result ={
  name: 'dragonIsBlue',
  desc: 'Dragon is blue',
  value: true,
  details: [
    { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
  ],
};

// With a composite rule :
 const dragonIsBlueIceYoung = dragonIsBlue
  .and(dragonIsIce, 'dragonIsBlueIce')
  .and(dragonIsYoung, 'dragonIsBlueIceYoung');

const compositeRuleResult = {
  name: 'dragonIsBlueIceYoung',
  desc: 'Dragon is blue AND (Dragon is ice) AND (NOT (Dragon is old))',
  value: false,
  details: [
    { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
    { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
    { name: 'Dragon is young', desc: 'NOT (Dragon is old)', value: false },
  ],
}
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
  name: 'dragonIsBlue',
  desc: 'Dragon is blue',
  isSatisfiedBy: <T>(entity: T) => ({ value: entity.color === 'blue' }),
});

const dragonIsIce = createSpec({
  name: 'dragonIsIce',
  desc: 'Dragon is ice',
  isSatisfiedBy: <T>(entity: T) => ({ value: entity.element === 'ice' }),
});

const dragonIsBlueANDIce = dragonIsBlue.and(dragonIsIce, 'dragonIsBlueANDIce');

const result = dragonIsBlueANDIce.isSatisfiedBy(dragon);

result.value; // => true
```

# Combining specifications with OR operator :

```typescript
const dragonIsBlueORIce = dragonIsBlue.or(dragonIsIce, 'dragonIsBlueORIce');

const result = dragonIsBlueORIce.isSatisfiedBy(dragon);

result.value; // => true
```

# Combining specifications with XOR operator :

```typescript
const dragonIsBlueXORIce = dragonIsBlue.xor(dragonIsIce, 'dragonIsBlueXORIce');

const result = dragonIsBlueXORIce.isSatisfiedBy(dragon);

result.value; // => false
```

# NOT operator :

```typescript
const dragonIsBlueAndNotIce = dragonIsBlue.and(dragonIsIce.not('dragonIsNotIce'), 'dragonIsBlueAndNotIce');

const result = dragonIsBlueAndNotIce.isSatisfiedBy(dragon);

result.value; // => false
```
