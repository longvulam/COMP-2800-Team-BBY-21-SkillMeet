import { CircularProgress } from "@material-ui/core"

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