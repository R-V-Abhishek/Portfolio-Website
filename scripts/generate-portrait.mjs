import fs from "node:fs";
import { createAvatar } from "@dicebear/core";
import * as notionists from "@dicebear/notionists";
// Fixed, locally assembled options selected against the public GitHub photo.
// Notionists by Zoish (CC0); generation code by DiceBear (MIT).
export const options = {
  seed: "R V Abhishek",
  size: 400,
  hair: ["variant07"],
  glasses: ["variant08"],
  glassesProbability: 100,
  body: ["variant13"],
  lips: ["variant03"],
  beardProbability: 0,
  gestureProbability: 0,
  bodyIconProbability: 0,
  backgroundColor: ["eef4ff"],
};
const avatar = createAvatar(notionists, options).toString();
fs.writeFileSync("public/illustrations/portrait.svg", avatar);
console.log(
  "Generated fixed Notionists portrait → public/illustrations/portrait.svg",
);
