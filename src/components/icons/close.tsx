import * as React from "react";

function SvgClose(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg preserveAspectRatio="xMinYMin slice" version="1.1" viewBox="0 0 9.2604 6.6146" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g id="close" transform="translate(1.3229 5e-5)" stroke={props.stroke} strokeLinecap="round" strokeWidth=".26458">
                <path d="M 1.3805,1.3805 5.234,5.234" />
                <path d="m5.2341 1.3805-3.8535 3.8535" />
            </g>
        </svg >
    );
}

export default SvgClose;