import {describe, it} from 'mocha';
import {assert, expect} from 'chai';
import {get, merge} from '@emdc/i18n/utils';


describe('Check utils', () => {
  it ('Should return null for invalid object', () => {
    expect(get(null, 'test')).to.be.null;
    expect(get(undefined, 'test')).to.be.null;
    expect(get('Str', 'test')).to.be.null;
    expect(get(10, 'test')).to.be.null;
  });

  it ('Should return null for non-string path', () => {
    const obj = {test: 'value'};

    expect(get(obj, null)).to.be.null;
    expect(get(obj, undefined)).to.be.null;
    expect(get(obj, 10)).to.be.null;
    expect(get(obj, {})).to.be.null;
    expect(get(obj, [])).to.be.null;
  });

  it ('Correct get value from object', () => {
    const obj = {test: 'value'};

    assert(get(obj, 'test'), 'value');
  });

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

  it ('.merge should return new obj merged with sources', () => {
    expect(merge(null, {prop: 'Val'})).to.deep.equal({
      prop: 'Val'
    });
  });

  it ('.merge should return obj if object is invalid', () => {
    assert(merge(10, {prop: 'Val'}), 10);
    assert(merge('Some', {prop: 'Val'}), 'Some');
  });
});
