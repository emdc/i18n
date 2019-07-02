import {get} from 'lodash';

/*
 * ============================================================================
 * Internal fields
 * ============================================================================
 */

let getState = null;
let dispatch = null;

/*
 * ============================================================================
 * Main logic
 * ============================================================================
 */

const connect = (store) => ({getState, dispatch} = store);

const isReady = () => getState !== null && dispatch !== null;

const getTranslatedString = (label) => {
  if (!isReady()) {
    return label;
  }

  const {currentLocale, translations} = getState().i18n;

  return get(translations[currentLocale] || {}, label, label);
};

const getLabel = (label, locale) => {
  if (!isReady()) {
    return label;
  }

  const {translations} = getState().i18n;

  return get(translations[locale] || {}, label, label);
};

/*
 * ============================================================================
 * Actions
 * ============================================================================
 */

const ActionType = {
  ChangeLocale: 'Action_i18n_ChangeLocale',
  ChangeTranslationsByLocale: 'Action_i18n_ChangeTranslationsByLocale'
};

const changeLocale = (locale) => dispatch({
  type: ActionType.ChangeLocale,
  locale
});

const changeTranslationsByLocale = (translations, locale) => dispatch({
  type: ActionType.ChangeTranslationsByLocale,
  locale,
  translations
});

/*
 * ============================================================================
 * Reducers
 * ============================================================================
 */

const getInitialState = () => ({
  currentLocale: '',
  getLabel: (label) => label,
  translations: {}
});

const i18nReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ActionType.ChangeLocale:
      return {
        ...state,
        getLabel: (label) => getLabel(label, action.locale),
        currentLocale: action.locale
      };
    case ActionType.ChangeTranslationsByLocale:
      return {
        ...state,
        translations: {
          ...state.translations,
          [action.locale]: action.translations
        }
      };
    default:
      return state;
  }
};

/*
 * ============================================================================
 * Pack&Export
 * ============================================================================
 */

const i18n = {
  connect,
  isReady,
  translate: getTranslatedString,
  getTranslatorFromState: (state) => state.i18n.getLabel,
  reducers: {
    i18n: i18nReducer
  },
  actions: {
    changeLocale,
    changeTranslationsByLocale
  }
};

export default i18n;
