export const AuctionStates = {
  canceled: 3,
  ended: 2,
  running: 1,
  started: 0,
};
export function getStateString(state) {
  console.log(state);
  for (let key in AuctionStates) {
    if (AuctionStates[key] === state) {
      return key;
    }
  }
  return "Unknown";
}
