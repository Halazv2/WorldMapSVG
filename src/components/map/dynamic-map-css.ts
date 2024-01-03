const getColorScaleUnit = (min: number, max: number) => 1 / (max - min);

let min: number, max: number;
const getMaxAndMinCountryDataValues = (countryData: any) => {
  Object.keys(countryData).forEach((key) => {
    if (key === "unknown") return;

    const value = countryData[key];

    if (value < min || min === undefined) min = value;
    if (value > max || max === undefined) max = value;
  });

  return { min, max };
};

export const getBaseCss = ({ defaultCountryFillColor, countryStrokeColor }: any) =>
  `.vue-world-map .land{
    fill:${defaultCountryFillColor};
    stroke:${countryStrokeColor};
  }`;

export const getDynamicMapCss = (countryData: any, chromaScale: any) => {
  const { min, max } = getMaxAndMinCountryDataValues(countryData);
  const colorScaleUnit = getColorScaleUnit(min, max);
  const css = [] as string[];

  Object.keys(countryData).forEach((key) => {
    if (key === "unknown") return;

    const value = countryData[key];
    const scaleValue = colorScaleUnit * (value - min);
    const hex = chromaScale(scaleValue).hex();

    css.push(`.vue-world-map #${key} { fill: ${hex}; }`);
  });

  return css;
};

export const getCombinedCssString = (baseCss: string, dynamicCss: string[]) => {
  dynamicCss.push(baseCss);

  return dynamicCss.join(" ");
};
