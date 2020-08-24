import React from "react";
export default ({children, align}) => {

    if (!align) {
        align = 'center';
    }

    return <h1 className={`text-5xl pt-4 text-${align} font-rubik`}>{children}</h1>;
}
