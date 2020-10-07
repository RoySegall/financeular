import React from "react";
import noFiles from "./noFiles.svg"

export default () => <>
  <h2 className="text-center pt-10 pb-10 text-3xl font-thin">No files were found....</h2>
  <img className="no-files" src={noFiles} alt="No files were found" />
  <p className="text-center pt-10 pb-10 text-2xl font-thin">We could not found files. You can upload some files and get
    some interesting insights, maybe... We can't promise any thing.</p>

</>
