import { defineSpecification } from '../defineSpecification';

type Dragon = {
  color: string;
  element: string;
  age: number;
};

describe('OR operator', () => {
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

    describe('Using OR operator on dragonIsBlue and dragonIsIce', () => {

      const dragonIsBlueORIce = dragonIsBlue.or(dragonIsIce, 'dragonIsBlueORIce');

      it('should return a new specification dragon is blue and ice', () => {
        expect(dragonIsBlueORIce.name).toStrictEqual('dragonIsBlueORIce');
        expect(dragonIsBlueORIce.desc).toStrictEqual('Dragon is blue OR (Dragon is ice)');
        expect(dragonIsBlueORIce.and).toBeDefined();
        expect(dragonIsBlueORIce.or).toBeDefined();
        expect(dragonIsBlueORIce.xor).toBeDefined();
        expect(dragonIsBlueORIce.not).toBeDefined();
        expect(dragonIsBlueORIce.isSatisfiedBy).toBeDefined();
      });

      describe('calling dragonIsBlueORIce.isSatifiedBy() on a blue fire dragon', () => {
        const dragon = {
          color: 'blue',
          element: 'fire',
          age: 1000,
        };

        it('should return true wtih details', () => {
          const result = dragonIsBlueORIce.isSatisfiedBy(dragon);

          expect(result).toStrictEqual({
            name: 'dragonIsBlueORIce',
            desc: 'Dragon is blue OR (Dragon is ice)',
            value: true,
            details: [
              { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
              { name: 'dragonIsIce', desc: 'Dragon is ice', value: false },
            ],
          });
        });
      });

      describe('calling dragonIsBlueORIce.isSatifiedBy() on a green ice dragon', () => {
        const dragon = {
          color: 'green',
          element: 'ice',
          age: 1000,
        };

        it('should return true wtih details', () => {
          const result = dragonIsBlueORIce.isSatisfiedBy(dragon);

          expect(result).toStrictEqual({
            name: 'dragonIsBlueORIce',
            desc: 'Dragon is blue OR (Dragon is ice)',
            value: true,
            details: [
              { name: 'dragonIsBlue', desc: 'Dragon is blue', value: false },
              { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
            ],
          });
        });
      });

      describe('calling dragonIsBlueORIce.isSatifiedBy() on a red fire dragon', () => {
        const dragon = {
          color: 'red',
          element: 'fire',
          age: 1000,
        };

        it('should return false wtih details', () => {
          const result = dragonIsBlueORIce.isSatisfiedBy(dragon);

          expect(result).toStrictEqual({
            name: 'dragonIsBlueORIce',
            desc: 'Dragon is blue OR (Dragon is ice)',
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
