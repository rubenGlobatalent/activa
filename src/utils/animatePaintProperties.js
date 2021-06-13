const DEFAULT_FPS = 60
const DEFAULT_ANIMATION_DURATION = 1 // seconds
const DEFAULT_LAYER_NAME = 'events'

let animationFrameId

export const stopAnimation = () => {
    return new Promise(resolve => {
        cancelAnimationFrame(animationFrameId)
        setTimeout(() => resolve(), 20) // wait for the last frame to avoid race conditions
    })
}

const animatePaintProperties = ({
    map,
    updateFn,
    layerName = DEFAULT_LAYER_NAME,
    fps = DEFAULT_FPS,
    animationDuration = DEFAULT_ANIMATION_DURATION
}) => {
    if (!map || !updateFn) {
        console.error('AnimatePaintProperties Error: Some required arguments are missing')
        return
    }

    cancelAnimationFrame(animationFrameId)

    let multiplier = 0
    const animateMarker = () => {
        const stepMultiplier = animationDuration / fps

        const properties = updateFn(multiplier)
        if (map.getLayer(layerName)) {
            Object.entries(properties).forEach(([key, value]) => {
                map.setPaintProperty(layerName, key, value)
            })
        }
        multiplier = (multiplier + stepMultiplier) % 1

        animationFrameId = requestAnimationFrame(animateMarker)
    }

    // Start the animation.
    animationFrameId = requestAnimationFrame(animateMarker)
}

export default animatePaintProperties
