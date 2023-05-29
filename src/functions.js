export var fClamp = (num, min, max) => {
    return num <= min 
      ? min 
      : num >= max 
        ? max 
        : num
}

export var fLerp = (start, end, t) => {
    return start * (1 - t) + end * t;
}