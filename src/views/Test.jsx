import React, { useEffect, useRef } from "react";
import Drawer from "@material-ui/core/Drawer";

function Example () {
  const refCount = useRef(null);
  useEffect(() => {
  }, [refCount]);

  return (
    <Drawer open={true}>
      <div ref={refCount} style={{
        overflowY: "auto"
      }}>
        Some Content
      </div>
    </Drawer>
  );
}

export default Example;
