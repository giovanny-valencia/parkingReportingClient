import { ServiceAction } from "@features/reporting/constants";
import { CircleParkingOff, TrafficCone } from "lucide-react-native";
import { ROUTES } from "@common/constants/routes";
import { router } from "expo-router";

export const data = (type: ServiceAction) => {
  switch (type) {
    case ServiceAction.VehicleReport:
      return {
        Icon: CircleParkingOff,
        title: "Create Vehicle Report",
        //description: "",
        handleRoute: () => {
          console.log("clicked report vehicle");
          router.push(ROUTES.USER_VEHICLE_REPORT);
        },
      };

    case ServiceAction.InfrastructureReport:
      return {
        Icon: TrafficCone,
        title: "Create Infrastructure Report",
        //description: "",
        handleRoute: () => console.log("clicked report infrastructure"),
      };

    default:
      return {};
  }
};
