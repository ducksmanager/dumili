import axios from "axios";

import { KumikoResult } from "~dumili-types/KumikoResult";

type KumikoResultWithNumberPanels = Omit<KumikoResult, "panels"> & {
  panels: [number, number, number, number][];
};
export const runKumiko = async (urls: string[]): Promise<KumikoResult[]> =>
  (await axios.get(`${process.env.KUMIKO_HOST}?i=${urls.join(",")}`)).data.map(
    (result: KumikoResultWithNumberPanels) => ({
      ...result,
      panels: result.panels.map(([x, y, width, height]) => ({
        x,
        y,
        width,
        height,
      })),
    })
  );