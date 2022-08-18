import {IconProps} from "./Icon.types";

function ArrowIcon({className}: IconProps) {
    return (
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"
             className={className}>
            <path d="M1.41 0.790039L6 5.38004L10.59 0.790039L12 2.21004L6 8.21004L0 2.21004L1.41 0.790039Z"
            />
        </svg>

    )
}

export default ArrowIcon