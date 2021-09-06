import { describe, it } from 'mocha';
import { assert } from 'chai';
import { get } from '../../src/utils';


describe('Check utils', () => {
  it ('Correct get value from object', () => {
    const obj = {test: 'value'};

    assert(get(obj, 'test'), 'value');
  });
});
