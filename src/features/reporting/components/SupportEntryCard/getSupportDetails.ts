import { SupportAction } from "@features/reporting/constants";
import { User, BookOpen } from "lucide-react-native";

// Maps enum value to a user-friendly label and description
export const getSupportDetails = (type: SupportAction) => {
  switch (type) {
    case SupportAction.Account:
      return {
        label: "My Account & Profile",
        description: "Manage personal details and app settings",
        Icon: User,
        handleRoute: () => {
          console.log("Account route");
        },
      };
    case SupportAction.GuideAndFAQ:
      return {
        label: "Guides & FAQs",
        description: "Browse help articles and tutorials",
        Icon: BookOpen,
        handleRoute: () => {
          console.log("Guides and FAQ route");
        },
      };
    default:
      return {
        label: "Support Action",
        description: "Placeholder description",
        Icon: User,
        handleRoute: () => {
          console.log("Support Action route");
        },
      };
  }
};
