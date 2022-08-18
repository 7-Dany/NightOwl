import {IconProps} from "./Icon.types";

function PlusIcon({className}: IconProps) {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
             className={className}>
            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z"/>
        </svg>

    )
}

export default PlusIcon