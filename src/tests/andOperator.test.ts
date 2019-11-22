import { defineSpecification } from '../defineSpecification';

type Dragon = {
  color: string;
  element: string;
  age: number;
};

describe('AND operator', () => {
  describe('Given specifications: dragonIsBlue and dragonIsIce', () => {
    const dragonIsBlue = defineSpecification({
      name: 'dragonIsBlue',
      desc: 'Dragon is blue',
      isSatisfiedBy: (dragon: Dragon) => dragon.color === 'blue',
    });

    const dragonIsIce = defineSpecification({
      name: 'dragonIsIce',
      desc: 'Dragon is ice',
      isSatisfiedBy: (dragon: Dragon) => dragon.element === 'ice',
    });

    describe('Using AND operator on dragonIsBlue and dragonIsIce', () => {

      const dragonIsBlueANDIce = dragonIsBlue.and(dragonIsIce, 'dragonIsBlueANDIce');

      it('should return a new specification dragon is blue and ice', () => {
        expect(dragonIsBlueANDIce.name).toStrictEqual('dragonIsBlueANDIce');
        expect(dragonIsBlueANDIce.desc).toStrictEqual('Dragon is blue AND (Dragon is ice)');
        expect(dragonIsBlueANDIce.and).toBeDefined();
        expect(dragonIsBlueANDIce.or).toBeDefined();
        expect(dragonIsBlueANDIce.xor).toBeDefined();
        expect(dragonIsBlueANDIce.not).toBeDefined();
        expect(dragonIsBlueANDIce.isSatisfiedBy).toBeDefined();
      });

      describe('calling dragonIsBlueANDIce.isSatifiedBy() on a blue ice dragon', () => {
        const dragon = {
          color: 'blue',
          element: 'ice',
          age: 1000,
        };

        it('should return true wtih details', () => {
          const result = dragonIsBlueANDIce.isSatisfiedBy(dragon);

          expect(result).toStrictEqual({
            name: 'dragonIsBlueANDIce',
            desc: 'Dragon is blue AND (Dragon is ice)',
            value: true,
            details: [
              { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
              { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
            ],
          });
        });
      });

      describe('calling dragonIsBlueANDIce.isSatifiedBy() on a blue fire dragon', () => {
        const dragon = {
          color: 'blue',
          element: 'fire',
          age: 1000,
        };

        it('should return false wtih details', () => {
          const result = dragonIsBlueANDIce.isSatisfiedBy(dragon);

          expect(result).toStrictEqual({
            name: 'dragonIsBlueANDIce',
            desc: 'Dragon is blue AND (Dragon is ice)',
            value: false,
            details: [
              { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
              { name: 'dragonIsIce', desc: 'Dragon is ice', value: false },
            ],
          });
        });
      });
    });
  });
});
