import { connect } from "frontity";
import React from "react";
import { SearchIcon } from "./icons";
import { LabeledIcon, SearchToggle, ToggleWrapper } from "./nav-toggle";

const MobileSearchButton = ({ state, actions }) => {
  // Get the state of the search modal
  const { isSearchModalOpen } = state.theme;
  const { toggleSearchModal } = actions.theme;

  return (
    <ToggleWrapper>
      <SearchToggle
        isMobile
        aria-expanded={isSearchModalOpen}
        onClick={toggleSearchModal}
        aria-label="Click to open search bar..."
      >
        <LabeledIcon icon={SearchIcon} label="Search" />
      </SearchToggle>
    </ToggleWrapper>
  );
};

export default connect(MobileSearchButton);
