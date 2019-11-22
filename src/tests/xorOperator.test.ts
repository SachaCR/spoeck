import { defineSpecification } from '../defineSpecification';

type Dragon = {
  color: string;
  element: string;
  age: number;
};

describe('XOR operator', () => {
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

    describe('Using XOR operator on dragonIsBlue and dragonIsIce', () => {

      const dragonIsBlueXORIce = dragonIsBlue.xor(dragonIsIce, 'dragonIsBlueXORIce');

      it('should return a new specification dragon is blue and ice', () => {
        expect(dragonIsBlueXORIce.name).toStrictEqual('dragonIsBlueXORIce');
        expect(dragonIsBlueXORIce.desc).toStrictEqual('Dragon is blue XOR (Dragon is ice)');
        expect(dragonIsBlueXORIce.and).toBeDefined();
        expect(dragonIsBlueXORIce.or).toBeDefined();
        expect(dragonIsBlueXORIce.xor).toBeDefined();
        expect(dragonIsBlueXORIce.not).toBeDefined();
        expect(dragonIsBlueXORIce.isSatisfiedBy).toBeDefined();
      });

      describe('calling dragonIsBlueXORIce.isSatifiedBy() on a blue fire dragon', () => {
        const dragon = {
          color: 'blue',
          element: 'fire',
          age: 1000,
        };

        it('should return true wtih details', () => {
          const result = dragonIsBlueXORIce.isSatisfiedBy(dragon);

          expect(result).toStrictEqual({
            name: 'dragonIsBlueXORIce',
            desc: 'Dragon is blue XOR (Dragon is ice)',
            value: true,
            details: [
              { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
              { name: 'dragonIsIce', desc: 'Dragon is ice', value: false },
            ],
          });
        });
      });

      describe('calling dragonIsBlueXORIce.isSatifiedBy() on a blue ice dragon', () => {
        const dragon = {
          color: 'blue',
          element: 'ice',
          age: 1000,
        };

        it('should return false wtih details', () => {
          const result = dragonIsBlueXORIce.isSatisfiedBy(dragon);

          expect(result).toStrictEqual({
            name: 'dragonIsBlueXORIce',
            desc: 'Dragon is blue XOR (Dragon is ice)',
            value: false,
            details: [
              { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
              { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
            ],
          });
        });
      });

      describe('calling dragonIsBlueXORIce.isSatifiedBy() on a green ice dragon', () => {
        const dragon = {
          color: 'green',
          element: 'ice',
          age: 1000,
        };

        it('should return true wtih details', () => {
          const result = dragonIsBlueXORIce.isSatisfiedBy(dragon);

          expect(result).toStrictEqual({
            name: 'dragonIsBlueXORIce',
            desc: 'Dragon is blue XOR (Dragon is ice)',
            value: true,
            details: [
              { name: 'dragonIsBlue', desc: 'Dragon is blue', value: false },
              { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
            ],
          });
        });
      });

      describe('calling dragonIsBlueXORIce.isSatifiedBy() on a red fire dragon', () => {
        const dragon = {
          color: 'red',
          element: 'fire',
          age: 1000,
        };

        it('should return false wtih details', () => {
          const result = dragonIsBlueXORIce.isSatisfiedBy(dragon);

          expect(result).toStrictEqual({
            name: 'dragonIsBlueXORIce',
            desc: 'Dragon is blue XOR (Dragon is ice)',
            value: false,
            details: [
              { name: 'dragonIsBlue', desc: 'Dragon is blue', value: false },
              { name: 'dragonIsIce', desc: 'Dragon is ice', value: false },
            ],
          });
        });
      });
    });
  });
});
