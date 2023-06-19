export class PercentageCalculator {

  getTruePercentaje(array: boolean[]): number {
    const trueCount = array.reduce((acc, bool) => {
      //    
      return bool ? acc + 1 : acc;
    }, 0);
    console.log('estoy disparando la fucnion');

    const totalCount = array.length;
    console.log('cuenta', trueCount);
    const truePercentage = (trueCount / totalCount) * 100;
    const roundedPercentage = Math.round(truePercentage);
    return roundedPercentage;
  }
};
