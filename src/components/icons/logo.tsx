import * as React from "react";

function SvgLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg preserveAspectRatio="xMinYMax meet" version="1.1" viewBox="0 0 195 190" xmlns="http://www.w3.org/2000/svg" {...props} >
            <g strokeOpacity="0">
                <ellipse cx="42.5" cy="42.5" rx="22.367" ry="22.367" fill="#f5c300" />
                <ellipse cx="97.5" cy="42.5" rx="22.367" ry="22.367" fill="#4fb258" />
                <ellipse cx="152.5" cy="42.5" rx="22.367" ry="22.367" fill="#4285f4" />
                <rect x="20.136" y="80.136" width="154.73" height="29.728" fill="#8B4513" />
                <ellipse cx="42.5" cy="147.5" rx="22.367" ry="22.367" fill="#4285f4" />
                <ellipse cx="97.5" cy="147.5" rx="22.367" ry="22.367" fill="#4fb258" />
                <ellipse cx="152.5" cy="147.5" rx="22.367" ry="22.367" fill="#f5c300" />
            </g>
        </svg>
    );
}

export default SvgLogo;
