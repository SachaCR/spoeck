import { defineSpecification } from '../defineSpecification';

type Dragon = {
  color: string;
  element: string;
  age: number;
};

describe('defineSpecification()', () => {
  it('should return a specification', () => {
    const specification = defineSpecification({
      name: 'dragonIsBlue',
      desc: 'Dragon is blue',
      isSatisfiedBy: (entity: Dragon) => entity.color === 'blue',
    });

    expect(specification.name).toStrictEqual('dragonIsBlue');
    expect(specification.desc).toStrictEqual('Dragon is blue');
    expect(specification.and).toBeDefined();
    expect(specification.or).toBeDefined();
    expect(specification.xor).toBeDefined();
    expect(specification.not).toBeDefined();
    expect(specification.isSatisfiedBy).toBeDefined();
  });
});
