import { defineSpecification } from '../defineSpecification';

type Dragon = {
  color: string;
  element: string;
  age: number;
};

describe('isSatifiedBy()', () => {
  describe('Given specifications: dragonIsBlue', () => {
    const dragonIsBlue = defineSpecification({
      name: 'dragonIsBlue',
      desc: 'Dragon is blue',
      isSatisfiedBy: (dragon: Dragon) => dragon.color === 'blue',
    });

    describe('calling isSatifiedBy() on a blue dragon', () => {
      const dragon = {
        color: 'blue',
        element: 'ice',
        age: 1000,
      };

      it('should return true with details', () => {
        const result = dragonIsBlue.isSatisfiedBy(dragon);

        expect(result).toStrictEqual({
          name: 'dragonIsBlue',
          desc: 'Dragon is blue',
          value: true,
          details: [
            { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
          ],
        });
      });
    });

    describe('calling isSatifiedBy() on a red dragon', () => {
      const dragon = {
        color: 'red',
        element: 'fire',
        age: 1000,
      };

      it('should return false wtih details', () => {
        const result = dragonIsBlue.isSatisfiedBy(dragon);

        expect(result).toStrictEqual({
          name: 'dragonIsBlue',
          desc: 'Dragon is blue',
          value: false,
          details: [
            { name: 'dragonIsBlue', desc: 'Dragon is blue', value: false },
          ],
        });
      });
    });
  });
});
