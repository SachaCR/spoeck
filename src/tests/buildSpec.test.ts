import { buildSpec } from '../buildSpec';

type Dragon = {
  color: string;
  element: string;
  age: number;
};

describe('buildSpec()', () => {
  it('should return a specification', () => {
    const specification = buildSpec({
      name: 'dragonIsBlue',
      desc: 'Dragon is blue',
      isSatisfiedBy: (entity: Dragon) => {
        return {
          name: 'dragonIsBlue',
          value: entity.color === 'blue',
          desc: 'Dragon is blue',
          details: [],
        };
      },
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
