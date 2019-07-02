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

const getLabel = (component, label) => {
  if (!isReady()) {
    return label;
  }

  const {currentLocale, translations} = getState().i18n;
  const translation = translations[component] || {};

  return get(translation[currentLocale] || {}, label, label);
};

const getLabelByLocale = (component, label, locale) => {
  if (!isReady() || !component) {
    return label;
  }

  const {translations} = getState().i18n;
  const translation = translations[component.constructor.name] || {};

  return get(translation[locale] || {}, label, label);
};

/*
 * ============================================================================
 * Actions
 * ============================================================================
 */

const ActionType = {
  ChangeLocale: 'Action_i18n_ChangeLocale',
  ChangeComponentTranslation: 'Action_i18n_ChangeComponentTranslation'
};

const changeLocale = (locale) => dispatch({
  type: ActionType.ChangeLocale,
  locale
});

const changeComponentTranslation = (component, translations, locale) => dispatch({
  type: ActionType.ChangeComponentTranslation,
  locale,
  name: component.constructor.name,
  translations
});

/*
 * ============================================================================
 * Reducers
 * ============================================================================
 */

const getInitialState = () => ({
  currentLocale: '',
  getLabel: (item, label) => label,
  translations: {}
});

const i18nReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ActionType.ChangeLocale:
      return {
        ...state,
        getLabel: (item, label) => getLabelByLocale(item, label, action.locale),
        currentLocale: action.locale
      };

    case ActionType.ChangeComponentTranslation:
      return {
        ...state,
        translations: {
          ...state.translations,
          [action.name]: {
            ...state.translations[action.name],
            [action.locale]: action.translations
          }
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
  translate: getLabel,
  getLabel: (state) => state.i18n.getLabel,
  reducers: {
    i18n: i18nReducer
  },
  actions: {
    changeComponentTranslation,
    changeLocale
  }
};

export default i18n;
