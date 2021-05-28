/**
 * @author Team21 Bcit 
 * @version May 2021
 */

import { CircularProgress } from "@material-ui/core"

/**
 * Functional component built using Material UI CircularProgress component.
 * When rendering this component it will show a centered Loading spinner
 */
export default function LoadingSpinner() {

    /** @type {CSSStyleDeclaration} */
    const wrapper = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    
    return (
        <div style={wrapper}>
            <CircularProgress />
        </div>
    )
}