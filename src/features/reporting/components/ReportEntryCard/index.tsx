import { data } from "./data";
import { ServiceAction } from "@features/reporting/constants";
import Card from "./Card";

interface Props {
  type: ServiceAction;
  isServiceSupported: boolean;
}

export default function ReportEntryCard({ type, isServiceSupported }: Props) {
  const { Icon, title, handleRoute } = data(type);

  if (!Icon) {
    return null;
  }

  return (
    <Card
      title={title}
      isServiceSupported={isServiceSupported}
      Icon={Icon}
      handleRoute={handleRoute}
    />
  );
}
