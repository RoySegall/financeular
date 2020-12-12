import React from "react";

export default ({data}) => <div className="table-wrapper">
    <table className="table">
        <thead>
            <tr className="headers">
            {Object.keys(data[0]).map((item, key) => <td className="capitalize" key={key}>{item.split('_').join(' ')}</td>)}
            </tr>
        </thead>

        <tbody>
            {data.map((item, key) =>
                <tr key={key}>
                    {Object.values(item).map((column, columnKey) => <td key={columnKey}>{column}</td>)}
                </tr>
            )}
        </tbody>
    </table>

</div>
