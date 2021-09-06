import * as React from 'react';

interface ITranslationsContext {
  language: string | null;
}

const TranslationsContext = React.createContext<ITranslationsContext>({
  language: null
});

export { TranslationsContext };

export type { ITranslationsContext };
