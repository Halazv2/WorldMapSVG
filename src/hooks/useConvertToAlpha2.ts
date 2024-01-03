import { countryList } from "@/lib/ISO_ALPHA_2";
import type { ICountryList } from "@/types";

const checkIfAlpha2 = async (country: string): Promise<string> => {
  const alpha2 = await countryList[country];
  return alpha2;
};

export const useConvertToAlpha2 = async (countries: ICountryList) => {
  const convertedCountries: any = {};
  const nonAlpha2Countries: any = {};

  for (const country of Object.keys(countries)) {
    const alpha2 = await checkIfAlpha2(country);

    alpha2 ? (convertedCountries[alpha2] = countries[country]) : (nonAlpha2Countries[country] = countries[country]);
  }
  
  const data = { ...convertedCountries, ...nonAlpha2Countries };
  return data;
};
