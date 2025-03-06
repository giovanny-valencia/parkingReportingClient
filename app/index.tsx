import { Redirect } from "expo-router";

export default function AppStart() {
  const appStartPath = "/screens/homePage/login";

  return <Redirect href={appStartPath} />;
}
