import { defineSpecification } from '../..';

describe('Given a blue ice dragon of 1000 years', () => {
  const dragon = {
    color: 'blue',
    element: 'ice',
    age: 1000,
  };

  type Dragon = {
    color: string;
    element: string;
    age: number;
  }

  describe('Given specifications: dragonIsBlue, dragonIsRed, dragonIsIce, dragonIsOld (> 2000), dragonIsYoung (<=2000)', () => {
    const dragonIsBlue = defineSpecification({
      desc: 'Dragon is blue',
      name: 'dragonIsBlue',
      isSatisfiedBy: (entity: Dragon) => entity.color === 'blue'
    });

    const dragonIsRed = defineSpecification({
      desc: 'Dragon is red',
      name: 'dragonIsRed',
      isSatisfiedBy: (entity: Dragon) => entity.color === 'red'
    });

    const dragonIsIce = defineSpecification({
      desc: 'Dragon is ice',
      name: 'dragonIsIce',
      isSatisfiedBy: (entity: Dragon) => entity.element === 'ice'
    });

    const dragonIsOld = defineSpecification({
      desc: 'Dragon is old',
      name: 'dragonIsOld',
      isSatisfiedBy: (entity: Dragon) => entity.age > 2000
    });

    const dragonIsYoung = dragonIsOld.not('Dragon is young');

    describe('dragonIsBlue.isSatisfiedBy(dragon)', () => {
      it('should return true', () => {
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

    describe('dragonIsRed.isSatisfiedBy(dragon)', () => {
      it('should return false', () => {
        const result = dragonIsRed.isSatisfiedBy(dragon);

        expect(result.value).toStrictEqual(false);
        expect(result.name).toStrictEqual('dragonIsRed');
        expect(result.details).toStrictEqual([
          { value: false, desc: 'Dragon is red', name: 'dragonIsRed' },
        ]);
      });
    });

    describe('When specification combination is: dragonIsBlue AND dragonIsIce', () => {
      it('should return true', () => {
        const result = dragonIsBlue
          .and(dragonIsIce, 'dragonIsBlueAndIce')
          .isSatisfiedBy(dragon);

        expect(result.value).toStrictEqual(true);
        expect(result.name).toStrictEqual('dragonIsBlueAndIce');
        expect(result.details).toStrictEqual([
          { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
          { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
        ]);
      });
    });

    describe('Given a combined specification of dragonIsBlue AND NOT dragonIsIce', () => {
      it('should return false', () => {
        const dragongIsAndNotIce = dragonIsBlue.and(
          dragonIsIce.not('dragonIsNotIce'),
          'dragongIsAndNotIce',
        );

        expect(dragongIsAndNotIce.desc).toStrictEqual(
          'Dragon is blue AND (NOT (Dragon is ice))',
        );

        const result = dragongIsAndNotIce.isSatisfiedBy(dragon);

        expect(result.value).toStrictEqual(false);
        expect(result.name).toStrictEqual('dragongIsAndNotIce');
        expect(result.details).toStrictEqual([
          { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
          { name: 'dragonIsNotIce', desc: 'NOT (Dragon is ice)', value: false },
        ]);
      });
    });

    describe('Given a combined specification of dragonIsBlue AND dragonIsIce OR dragonIsOld', () => {
      it('should return true', () => {
        const result = dragonIsBlue
          .and(dragonIsIce, 'dragonIsBlueAndIce')
          .or(dragonIsOld, 'dragonisBlueAndIceOrOld')
          .isSatisfiedBy(dragon);

        expect(result.value).toStrictEqual(true);
        expect(result.details).toStrictEqual([
          { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
          { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
          { name: 'dragonIsOld', desc: 'Dragon is old', value: false },
        ]);
      });
    });

    describe('Given a combined specification of dragonIsRed AND dragonIsIce OR dragonIsOld', () => {
      it('should return false', () => {
        const result = dragonIsRed
          .and(dragonIsIce, 'dragonIsRedAndIce')
          .or(dragonIsOld, 'dragonisRedAndIceOrOld')
          .isSatisfiedBy(dragon);

        expect(result.value).toStrictEqual(false);
        expect(result.details).toStrictEqual([
          { name: 'dragonIsRed', desc: 'Dragon is red', value: false },
          { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
          { name: 'dragonIsOld', desc: 'Dragon is old', value: false },
        ]);
      });
    });

    describe('Given a combined specification of dragonIsRed AND dragonIsIce OR dragonIsYoung', () => {
      it('should return true', () => {
        const result = dragonIsRed
          .and(dragonIsIce, 'dragingIsRedAndIce')
          .or(dragonIsYoung, 'dragingIsRedAndIceOrYoung')
          .isSatisfiedBy(dragon);

        expect(result.value).toStrictEqual(true);
        expect(result.details).toStrictEqual([
          { name: 'dragonIsRed', desc: 'Dragon is red', value: false },
          { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
          { name: 'Dragon is young', desc: 'NOT (Dragon is old)', value: true },
        ]);
      });
    });

    describe('Given a combined specification of dragonIsBlue AND dragonIsIce AND dragonIsOld', () => {
      it('should return false', () => {
        const dragonIsBlueIceOld = dragonIsBlue
          .and(dragonIsIce, 'dragonIsBlueIce')
          .and(dragonIsOld, 'dragonIsBlueIceOld');

        const result = dragonIsBlueIceOld.isSatisfiedBy(dragon);

        expect(result.value).toStrictEqual(false);
        expect(result.details).toStrictEqual([
          { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
          { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
          { name: 'dragonIsOld', desc: 'Dragon is old', value: false },
        ]);
      });
    });

    describe('Given a combined specification of dragonIsBlue AND dragonIsIce AND dragonIsYoung', () => {
      it('should return true', () => {
        const dragonIsBlueIceYoung = dragonIsBlue
          .and(dragonIsIce, 'dragonIsBlueIce')
          .and(dragonIsYoung, 'dragonIsBlueIceYoung');

        const result = dragonIsBlueIceYoung.isSatisfiedBy(dragon);

        expect(result).toStrictEqual({
          name: 'dragonIsBlueIceYoung',
          desc: 'Dragon is blue AND (Dragon is ice) AND (NOT (Dragon is old))',
          value: true,
          details: [
            { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
            { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
            {
              name: 'Dragon is young',
              desc: 'NOT (Dragon is old)',
              value: true,
            },
          ],
        });
      });
    });

    describe('Given a combined specification of dragonIsBlue XOR dragonIsIce', () => {
      it('should return false', () => {
        const dragonIsBlueXORIce = dragonIsBlue.xor(
          dragonIsIce,
          'dragonIsBlueXORIce',
        );
        const result = dragonIsBlueXORIce.isSatisfiedBy(dragon);

        expect(result.value).toStrictEqual(false);
        expect(result.details).toStrictEqual([
          { name: 'dragonIsBlue', desc: 'Dragon is blue', value: true },
          { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
        ]);
      });
    });

    describe('Given a combined specification of dragonIsRed XOR dragonIsIce', () => {
      it('should return true', () => {
        const dragonIsRedXORIce = dragonIsRed.xor(
          dragonIsIce,
          'dragonIsRedXORIce',
        );
        const result = dragonIsRedXORIce.isSatisfiedBy(dragon);

        expect(result.value).toStrictEqual(true);
        expect(result.details).toStrictEqual([
          { name: 'dragonIsRed', desc: 'Dragon is red', value: false },
          { name: 'dragonIsIce', desc: 'Dragon is ice', value: true },
        ]);
      });
    });
  });
});
