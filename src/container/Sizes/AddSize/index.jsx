import React from "react";
import AddContent from "../../../features/Sizes/AddContent";
import HeaderOutlet from "../../../features/Header";

function AddSize() {
  return (
    <div className="mx-4">
      <HeaderOutlet>Add Size</HeaderOutlet>
      <AddContent />
    </div>
  );
}

export default AddSize;
