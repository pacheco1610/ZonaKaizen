export function numeroRandom (){
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min)
    return(rand );
} 