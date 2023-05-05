export interface Country {
  name: CountryName;
  tld?: string[] | null;
  cca2: string;
  ccn3: string;
  cca3: string;
  currency?: string[] | null;
  callingCode?: string[] | null;
  capital: string;
  altSpellings?: string[] | null;
  relevance: string;
  region: string;
  subregion: string;
  nativeLanguage: string;
  languages?: CountryLanguages[];
  translations: CountryNameTranslations;
  latlng?: number[] | null;
  demonym: string;
  borders?: string[] | null;
  area: number;
}

export interface CountryName {
  common: string;
  official: string;
  native: CountryNativeName;
}

export interface CountryNativeName {
  common: string;
  official: string;
}

export interface CountryLanguages {
  prs: string;
  pus: string;
  tuk: string;
}

export interface CountryNameTranslations {
  cym: string;
  deu: string;
  fra: string;
  hrv: string;
  ita: string;
  jpn: string;
  nld: string;
  por: string;
  rus: string;
  spa: string;
}
