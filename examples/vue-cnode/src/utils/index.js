import moment from "moment";
import { levelMap, scaleMap } from "@/configs";
import { projectType as projectTypeMap } from "@/configs/industry";

export const dateFormat = (date) => {
  if (date === undefined) {
    return "";
  }
  return moment(date * 1000).format("YYYY-MM-DD HH:mm:ss");
}
