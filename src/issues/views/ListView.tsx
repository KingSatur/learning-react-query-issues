import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";
import { LoadingIcon } from "../../shared";
import { State } from "../interface";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<State>();

  const {
    issuesQuery: { isLoading, data, isFetching },
    page,
    nextPage,
    previousPage,
  } = useIssues({
    state: selectedState,
    labels: selectedLabels,
  });

  const onChangeLabel = (labelName: string) => {
    if (selectedLabels.includes(labelName)) {
      setSelectedLabels(selectedLabels.filter((label) => label !== labelName));
    } else {
      setSelectedLabels([...selectedLabels, labelName]);
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={data!}
            state={selectedState}
            onStateChanged={(newState) => setSelectedState(newState)}
          />
        )}
        <div className="d-flex mt-2 justify-content-between align-items-center">
          <button
            disabled={isFetching}
            onClick={previousPage}
            className="btn btn-outline-primary"
          >
            Prev
          </button>
          <span>{page}</span>
          <button
            disabled={isFetching}
            onClick={nextPage}
            className="btn btn-outline-primary"
          >
            Next
          </button>
        </div>
      </div>
      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onChangeLabel(labelName)}
        />
      </div>
    </div>
  );
};
