import { cityDto, LocationDto } from "@features/reporting/dtos";
import { create } from "zustand";

interface StepOneModel {
  plateNumber: string | null; // Flattened
  plateState: string | null; // Flattened
  vehicleLocation: LocationDto | null;
  image: any | null;
}

interface StepTwoModel {
  description: string | null;
  images: any[] | null; //TODO update
}

interface StepThreeModel {
  adjustedVehicleLocation: LocationDto | null; //adjusted location
}

interface VehicleReportState {
  // current location, obtained from mount. Rerenders won't retry API
  //currentCity: cityDto | null;

  currentStep: number;

  stepOneData: StepOneModel;

  stepTwoData: StepTwoModel;

  //TODO: reconsidering
  stepThreeData: StepThreeModel;
}

enum buttonActions {
  back,
  next,
  submit,
}

interface VehicleReportActions {
  updateFormStep: (button: buttonActions) => void;
  updateStepOneData: (data: Partial<StepOneModel>) => void;
  updateStepTwoData: (data: Partial<StepTwoModel>) => void;
  updateStepThreeData: (data: Partial<StepThreeModel>) => void;
  clearVehicleReportStore: () => void;
}

export const useVehicleReportStore = create<VehicleReportState & VehicleReportActions>((set) => {
  return {
    //currentCity: null,

    currentStep: 1,

    stepOneData: {
      plateNumber: null,
      plateState: null,
      vehicleLocation: null,
      image: null,
    },

    stepTwoData: {
      description: null,
      images: null,
    },

    stepThreeData: {
      adjustedVehicleLocation: null,
    },

    updateFormStep: (button) =>
      set((state) => {
        let newStep = state.currentStep;

        switch (button) {
          case buttonActions.back:
            newStep = Math.max(0, newStep - 1);
            break;

          case buttonActions.next:
            newStep = Math.min(4, newStep + 1);

          default:
            console.log("throw an error");
            return {};
        }

        if (newStep != state.currentStep) {
          return { currentStep: newStep };
        }

        return {};
      }),

    updateStepOneData: (data) =>
      set((state) => ({
        stepOneData: {
          ...state.stepOneData,
          ...data,
        },
      })),

    updateStepTwoData: (data) =>
      set((state) => ({
        stepTwoData: {
          ...state.stepTwoData,
          ...data,
        },
      })),

    updateStepThreeData: (data) =>
      set((state) => ({
        stepThreeData: {
          ...state.stepThreeData,
          ...data,
        },
      })),

    clearVehicleReportStore: () => {
      set({
        //currentCity: null,

        currentStep: 1,

        stepOneData: {
          plateNumber: "",
          plateState: "",
          vehicleLocation: null,
          image: null,
        },

        stepTwoData: {
          description: "",
          images: null,
        },

        stepThreeData: {
          adjustedVehicleLocation: null,
        },
      });
    },
  };
});
