import React from "react";
import HeaderOutlet from "../../../features/Header";
import EditContent from "../../../features/Sizes/EditContent";

function EditSize() {
  return (
    <div className="mx-4">
      <HeaderOutlet>Edit Size</HeaderOutlet>
      <EditContent />
    </div>
  );
}

export default EditSize;
