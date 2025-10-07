import { ServiceAction } from "@features/reporting/constants";
import { CircleParkingOff, TrafficCone } from "lucide-react-native";

export const data = (type: ServiceAction) => {
  switch (type) {
    case ServiceAction.VehicleReport:
      return {
        Icon: CircleParkingOff,
        title: "Create Vehicle Report",
        //description: "",
        handleRoute: () => console.log("clicked report vehicle"),
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
