export const callFunctionWithDelay = (
  time: number = 500,
  callback: () => void
) => {
  setTimeout(() => {
    callback();
  }, time);
};
