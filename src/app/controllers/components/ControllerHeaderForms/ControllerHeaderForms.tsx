import { useCallback } from "react";

import type { ValueOf } from "@canonical/react-components";

import AddController from "./AddController";
import ControllerActionFormWrapper from "./ControllerActionFormWrapper";

import type { ControllerActionHeaderViews } from "app/controllers/constants";
import { ControllerHeaderViews } from "app/controllers/constants";
import type {
  ControllerSidePanelContent,
  ControllerSetSidePanelContent,
} from "app/controllers/types";
import type { Controller } from "app/store/controller/types";

type Props = {
  controllers: Controller[];
  sidePanelContent: ControllerSidePanelContent;
  setSidePanelContent: ControllerSetSidePanelContent;
  viewingDetails?: boolean;
};

const ControllerHeaderForms = ({
  controllers,
  sidePanelContent,
  setSidePanelContent,
  viewingDetails = false,
}: Props): JSX.Element | null => {
  const clearSidePanelContent = useCallback(
    () => setSidePanelContent(null),
    [setSidePanelContent]
  );

  switch (sidePanelContent.view) {
    case ControllerHeaderViews.ADD_CONTROLLER:
      return <AddController clearSidePanelContent={clearSidePanelContent} />;
    default:
      // We need to explicitly cast sidePanelContent.view here - TypeScript doesn't
      // seem to be able to infer remaining object tuple values as with string
      // values.
      // https://github.com/canonical/maas-ui/issues/3040
      const { view } = sidePanelContent as {
        view: ValueOf<typeof ControllerActionHeaderViews>;
      };
      const [, action] = view;
      return (
        <ControllerActionFormWrapper
          action={action}
          clearSidePanelContent={clearSidePanelContent}
          controllers={controllers}
          viewingDetails={viewingDetails}
        />
      );
  }
};

export default ControllerHeaderForms;
