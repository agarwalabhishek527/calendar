import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { AppComponent } from "@components";

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById("root")!); // 'root' element

root.render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>
);
