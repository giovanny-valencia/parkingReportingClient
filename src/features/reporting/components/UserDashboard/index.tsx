import { View } from "react-native";
import CurrentLocation from "../CurrentLocation";
import ReportEntryCard from "../ReportEntryCard";
import { LocationStatusProps } from "@features/reporting/dtos";
import { ServiceAction, SupportAction } from "@features/reporting/constants";
import SupportEntry from "../SupportEntryCard";

interface Props {
  locationStatus: LocationStatusProps;
}

export default function UserDashboard({ locationStatus }: Props) {
  return (
    <View>
      <View>
        <CurrentLocation locationStatus={locationStatus} />
      </View>

      <View>
        <ReportEntryCard
          title="Create Vehicle Report"
          isServiceSupported={true}
          handleRoute={() => {
            console.log("click CVR!");
          }}
        />
      </View>

      <View>
        <ReportEntryCard
          title="Create City Infrastructure Report"
          isServiceSupported={false}
          handleRoute={() => {
            console.log("Clicked infra report!");
          }}
        />
      </View>

      <View>
        <SupportEntry supportType={SupportAction.GuideAndFAQ} />

        <SupportEntry supportType={SupportAction.Account} />
      </View>
    </View>
  );
}
