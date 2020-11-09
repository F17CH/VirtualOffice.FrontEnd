import * as React from "react";

function SvgMax(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="35" height="25" version="1.1" viewBox="0 0 9.2604 6.6146" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="2.7202" y="1.3972" width="3.8201" height="3.8201" fill-opacity="0" stroke={props.stroke} stroke-width=".26458" />
        </svg >
    );
}

export default SvgMax;