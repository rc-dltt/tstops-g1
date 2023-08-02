import { horses, races } from "./db";

export const buildContext = async (req) => {
  const dataSources = {
    races,
    horses,
  };

  return {
    dataSources,
  };
};
