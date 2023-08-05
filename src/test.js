const { meow, bark, moo, manyMoos, bark2, trumpet, cluck, snort } = require("../dist/index.js");

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
  moo("Your console.log() message here");
  await sleep(500);
  bark("Your console.log() message here");
  await sleep(500);
  bark2("Your console.log() message here", "(with more params too!)", { name: "pepe" });
  await sleep(500);
  trumpet("Your console.log() message here");
  await sleep(500);
  meow("Your console.log() message here");
  await sleep(500);
  cluck("Your console.log() message here");
  await sleep(500);
  snort("Your console.log() message here");
  await sleep(500);
  manyMoos("Your console.log() message here");
};

main();
