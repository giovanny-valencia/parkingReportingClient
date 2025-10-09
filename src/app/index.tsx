import { Redirect } from "expo-router";
import { ROUTES } from "@common/constants/routes";

export default function AppIndex() {
  return <Redirect href={ROUTES.LOGIN} />; //BUG: Removed the `(auth)` prefix. Error fixed?
}
