import { andOperation } from './andOperation';
import { orOperation } from './orOperation';
import { xorOperation } from './xorOperation';
import { notOperation } from './notOperation';

export interface SpecificationData {
  desc: string;
  name: string;
  isSatisfiedBy: (
    entity: any,
  ) => SpecificationResult;
}

export interface SpecificationResult {
  value: boolean;
  name: string;
  desc: string;
  details: Array<{
    value: boolean;
    desc: string;
    name: string;
  }>;
}

export interface Specification {
  desc: string;
  name: string;
  isSatisfiedBy: (entity: any) => SpecificationResult;
  and: (spec: Specification, name: string) => Specification;
  or: (spec: Specification, name: string) => Specification;
  xor: (spec: Specification, name: string) => Specification;
  not: (name: string) => Specification;
}

export function buildSpec(specData: SpecificationData): Specification {
  const specification: Specification = {
    desc: specData.desc,
    name: specData.name,
    isSatisfiedBy: (entity: any): SpecificationResult => {
      const result = specData.isSatisfiedBy(entity);

      return {
        name: specData.name,
        desc: specData.desc,
        value: result.value,
        details: result.details,
      };
    },
    and: (spec: Specification, name: string): Specification => {
      return buildSpec(andOperation(specification, spec, name));
    },
    or: (spec: Specification, name: string): Specification => {
      return buildSpec(orOperation(specification, spec, name));
    },
    xor: (spec: Specification, name: string): Specification => {
      return buildSpec(xorOperation(specification, spec, name));
    },
    not: (name: string): Specification => {
      return buildSpec(notOperation(specification, name));
    },
  };

  return specification;
}
