"use client";

import React from "react";
import type { PenaltyWarningProps } from "../types/dashboard.types";

const PenaltyWarning: React.FC<PenaltyWarningProps> = ({ t }) => {
  return (
    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
      <p className="text-yellow-300 text-sm" role="alert">
        ⚠️{" "}
        {t("leavePenalty", {
          defaultValue:
            "Warning: Leaving a game incurs a 10% penalty of the bet amount.",
        })}
      </p>
    </div>
  );
};

export default React.memo(PenaltyWarning);