import PropTypes from 'prop-types'
import * as React from 'react'

const Container = ({ children, isFinished, animationDuration }) => (
    <div
        style={{
            opacity: isFinished ? 0 : 1,
            pointerEvents: 'none',
            transition: `opacity ${animationDuration}ms linear`,
            position: "absolute",
            zIndex: 1051,
            background: "rgba(0, 0, 0, 0.3)",
            width: "100%",
            height: "100%"
        }}
    >
        {children}
    </div>
)

Container.propTypes = {
    animationDuration: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    isFinished: PropTypes.bool.isRequired
}

export default Container