import { andOperation } from './src/andOperation';
import { orOperation } from './src/orOperation';
import { xorOperation } from './src/xorOperation';
import { notOperation } from './src/notOperation';

export interface SpecificationData {
  desc: string;
  name: string;
  isSatisfiedBy: <T>(entity: T) => SpecificationResult;
}

export interface SpecificationResult {
  value: boolean;
  name?: string;
  desc?: string;
  details?: Array<{
    value: boolean;
    desc: string;
    name: string;
  }>;
}

export interface Specification {
  desc: string;
  name: string;
  isSatisfiedBy: <T>(entity: T) => SpecificationResult;
  and: (spec: Specification, name: string) => Specification;
  or: (spec: Specification, name: string) => Specification;
  xor: (spec: Specification, name: string) => Specification;
  not: (name: string) => Specification;
}

export function createSpec(specData: SpecificationData): Specification {
  const specification: Specification = {
    desc: specData.desc,
    name: specData.name,
    isSatisfiedBy: <T>(entity: T): SpecificationResult => {
      const result = specData.isSatisfiedBy(entity);

      if (!result.details) {
        return {
          name: specData.name,
          desc: specData.desc,
          value: result.value,
          details: [
            {
              name: specData.name,
              desc: specData.desc,
              value: result.value,
            },
          ],
        };
      }

      return {
        name: result.name || specData.name,
        desc: result.desc || specData.desc,
        value: result.value,
        details: result.details,
      };
    },
    and: (spec: Specification, name: string): Specification => {
      return createSpec(andOperation(specification, spec, name));
    },
    or: (spec: Specification, name: string): Specification => {
      return createSpec(orOperation(specification, spec, name));
    },
    xor: (spec: Specification, name: string): Specification => {
      return createSpec(xorOperation(specification, spec, name));
    },
    not: (name: string): Specification => {
      return createSpec(notOperation(specification, name));
    },
  };

  return specification;
}
