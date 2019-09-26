import { createSpec } from '../..';

describe('Given a blue ice dragon of 1000 years', () => {
  const dragon = {
    color: 'blue',
    element: 'ice',
    age: 1000,
  };

  describe('Given specifications: dragonIsBlue, dragonIsRed, dragonIsIce, dragonIsOld (> 2000), dragonIsYoung (<=2000)', () => {
    const dragonIsBlue = createSpec({
      desc: 'Blue',
      isSatisfiedBy: (entity: any) => entity.color === 'blue',
    });

    const dragonIsRed = createSpec({
      desc: 'Red',
      isSatisfiedBy: (entity: any) => entity.color === 'red',
    });

    const dragonIsIce = createSpec({
      desc: 'Ice',
      isSatisfiedBy: (entity: any) => entity.element === 'ice',
    });

    const dragonIsOld = createSpec({
      desc: 'Old',
      isSatisfiedBy: (entity: any) => entity.age > 2000,
    });

    const dragonIsYoung = dragonIsOld.not();

    describe('dragonIsBlue.isSatisfiedBy(dragon)', () => {
      it('should return true', () => {
        expect(dragonIsBlue.isSatisfiedBy(dragon)).toStrictEqual(true);
      });
    });

    describe('dragonIsRed.isSatisfiedBy(dragon)', () => {
      it('should return false', () => {
        expect(dragonIsRed.isSatisfiedBy(dragon)).toStrictEqual(false);
      });
    });

    describe('When specification combination is: dragonIsBlue AND dragonIsIce', () => {
      it('should return true', () => {
        expect(
          dragonIsBlue.and(dragonIsIce).isSatisfiedBy(dragon),
        ).toStrictEqual(true);
      });
    });

    describe('Given a combined specification of dragonIsBlue AND NOT dragonIsIce', () => {
      it('should return false', () => {
        expect(
          dragonIsBlue.and(dragonIsIce.not()).isSatisfiedBy(dragon),
        ).toStrictEqual(false);
      });
    });

    describe('Given a combined specification of dragonIsBlue AND dragonIsIce OR dragonIsOld', () => {
      it('should return true', () => {
        expect(
          dragonIsBlue
            .and(dragonIsIce)
            .or(dragonIsOld)
            .isSatisfiedBy(dragon),
        ).toStrictEqual(true);
      });
    });

    describe('Given a combined specification of dragonIsRed AND dragonIsIce OR dragonIsOld', () => {
      it('should return false', () => {
        expect(
          dragonIsRed
            .and(dragonIsIce)
            .or(dragonIsOld)
            .isSatisfiedBy(dragon),
        ).toStrictEqual(false);
      });
    });

    describe('Given a combined specification of dragonIsRed AND dragonIsIce OR dragonIsYoung', () => {
      it('should return true', () => {
        expect(
          dragonIsRed
            .and(dragonIsIce)
            .or(dragonIsYoung)
            .isSatisfiedBy(dragon),
        ).toStrictEqual(true);

        expect(
          dragonIsRed.and(dragonIsIce).or(dragonIsYoung).desc,
        ).toStrictEqual('Red AND (Ice) OR (NOT (Old))');
      });
    });

    describe('Given a combined specification of dragonIsBlue AND dragonIsIce AND dragonIsOld', () => {
      it('should return false', () => {
        const dragonIsBlueIceOld = dragonIsBlue
          .and(dragonIsIce)
          .and(dragonIsOld);

        expect(dragonIsBlueIceOld.isSatisfiedBy(dragon)).toStrictEqual(false);
      });
    });

    describe('Given a combined specification of dragonIsBlue AND dragonIsIce AND dragonIsYoung', () => {
      it('should return true', () => {
        const dragonIsBlueIceYoung = dragonIsBlue
          .and(dragonIsIce)
          .and(dragonIsYoung);

        expect(dragonIsBlueIceYoung.isSatisfiedBy(dragon)).toStrictEqual(true);
      });
    });

    describe('Given a combined specification of dragonIsBlue XOR dragonIsIce', () => {
      it('should return false', () => {
        const dragonIsBlueXORIce = dragonIsBlue.xor(dragonIsIce);
        expect(dragonIsBlueXORIce.isSatisfiedBy(dragon)).toStrictEqual(false);
      });
    });

    describe('Given a combined specification of dragonIsRed XOR dragonIsIce', () => {
      it('should return true', () => {
        const dragonIsRedXORIce = dragonIsRed.xor(dragonIsIce);
        expect(dragonIsRedXORIce.isSatisfiedBy(dragon)).toStrictEqual(true);
      });
    });
  });
});
