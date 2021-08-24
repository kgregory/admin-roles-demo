const delay = (waitTime = 0): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, waitTime));

export default delay;
