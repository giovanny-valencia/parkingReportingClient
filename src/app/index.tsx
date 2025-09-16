import { Redirect } from "expo-router";
import { ROUTES } from "@common/constants/routes";

export default function AppIndex() {
  return <Redirect href={`/(auth)` + ROUTES.LOGIN} />;
}
