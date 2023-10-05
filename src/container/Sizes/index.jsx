import React from "react";
import HeaderOutlet from "../../features/Header";
import SizeContent from "../../features/Sizes/SizeContent";

function Sizes() {
  return (
    <div className="mx-4">
      <HeaderOutlet>Data Size</HeaderOutlet>
      <section>
        <SizeContent />
      </section>
    </div>
  );
}

export default Sizes;
