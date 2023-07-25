import React from "react";

export interface AccessibilityProps {
  SIGN_LANGUAGE_INTERPRETER: boolean;
  STAIR_FREE_PATH: boolean;
  SERVICE_ANIMAL: boolean;
  IN_ROOM_ACCESSIBLE: boolean;
  ROLL_IN_SHOWER: boolean;
  ACCESSIBLE_BATHROOM: boolean;
  ELEVATOR: boolean;
  ACCESSIBLE_PARKING: boolean;
}

interface AccesiblityProps {
  accessibility: AccessibilityProps;
  handleAccessibilitiesChange: (accessibilities: AccessibilityProps) => void;
}

export const Accesiblity: React.FC<AccesiblityProps> = ({
  accessibility,
  handleAccessibilitiesChange,
}) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, checked } = event.target;
    handleAccessibilitiesChange({
      ...accessibility,
      [name]: checked,
    });
  };

  return (
    <div>
      <h1>Accessibility</h1>
      <label>
        SIGN_LANGUAGE_INTERPRETER
        <input
          type="checkbox"
          name="SIGN_LANGUAGE_INTERPRETER"
          checked={accessibility.SIGN_LANGUAGE_INTERPRETER}
          onChange={handleCheckboxChange}
        />
      </label>
      {/* Add more checkboxes for other accessibility options */}
    </div>
  );
};
