import {describe, it} from 'mocha';
import {assert} from 'chai';
import i18n from '@emdc/i18n';


describe('Validate main functions', () => {
  it ('Connect to store', () => {
    assert(!i18n.isReady(), 'Unexpected ready state');

    i18n.connect({
      getState: () => null,
      dispatch: () => null
    });

    assert(i18n.isReady(), 'Can\'t connect to redux store');
  });
});
