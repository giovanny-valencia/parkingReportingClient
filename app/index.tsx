import { Redirect } from "expo-router";

export default function AppStart() {
  const appStartPath = "./screens/homePage/loginPage";

  return <Redirect href={appStartPath} />;
}
