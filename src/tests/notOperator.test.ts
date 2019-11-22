import { defineSpecification } from '../defineSpecification';

type Dragon = {
  color: string;
  element: string;
  age: number;
};

describe('NOT operator', () => {
  describe('Given specification: dragonIsBlue', () => {
    const dragonIsBlue = defineSpecification({
      name: 'dragonIsBlue',
      desc: 'Dragon is blue',
      isSatisfiedBy: (dragon: Dragon) => dragon.color === 'blue',
    });

    describe('Using NOT operator on dragonIsBlue', () => {

      const dragonIsNOTBlue = dragonIsBlue.not('dragonIsNOTBlue');

      it('should return a new specification dragon is NOT blue', () => {
        expect(dragonIsNOTBlue.name).toStrictEqual('dragonIsNOTBlue');
        expect(dragonIsNOTBlue.desc).toStrictEqual('NOT (Dragon is blue)');
        expect(dragonIsNOTBlue.and).toBeDefined();
        expect(dragonIsNOTBlue.or).toBeDefined();
        expect(dragonIsNOTBlue.xor).toBeDefined();
        expect(dragonIsNOTBlue.not).toBeDefined();
        expect(dragonIsNOTBlue.isSatisfiedBy).toBeDefined();
      });

      describe('calling dragonIsNOTBlue.isSatifiedBy() on a blue ice dragon', () => {
        const dragon = {
          color: 'blue',
          element: 'ice',
          age: 1000,
        };

        it('should return false wtih details', () => {
          const result = dragonIsNOTBlue.isSatisfiedBy(dragon);

          expect(result).toStrictEqual({
            name: 'dragonIsNOTBlue',
            desc: 'NOT (Dragon is blue)',
            value: false,
            details: [
              { name: 'dragonIsNOTBlue', desc: 'NOT (Dragon is blue)', value: false },
            ],
          });
        });
      });

      describe('calling dragonIsNOTBlue.isSatifiedBy() on a green ice dragon', () => {
        const dragon = {
          color: 'green',
          element: 'ice',
          age: 1000,
        };

        it('should return true wtih details', () => {
          const result = dragonIsNOTBlue.isSatisfiedBy(dragon);

          expect(result).toStrictEqual({
            name: 'dragonIsNOTBlue',
            desc: 'NOT (Dragon is blue)',
            value: true,
            details: [
              { name: 'dragonIsNOTBlue', desc: 'NOT (Dragon is blue)', value: true },
            ],
          });
        });
      });
    });
  });
});
