import { describe, it } from 'mocha';
import { expect } from 'chai';
import { merge } from '../../src/utils';


describe('Check utils', () => {
  it ('Correct merge objects', () => {
    const obj = {test: 'Value'};

    expect(merge(obj, {prop: 'Val'})).to.deep.equal({
      test: 'Value',
      prop: 'Val'
    });
  });

  it ('.merge should return obj if no sources', () => {
    const obj = {test: 'Value'};

    expect(merge(obj, null)).to.deep.equal({
      test: 'Value'
    });
  });
});
