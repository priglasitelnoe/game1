export function structureScore(order:(number|null)[],attempts:number):number|null;
export function classificationScore(mistakes:number):number;
export function awardOnce(scores:(number|null)[],index:number,points:number):(number|null)[];
export function headlineScore(choice:number):number;
export function matchesExactly(selected:number[],expected:number[]):boolean;
