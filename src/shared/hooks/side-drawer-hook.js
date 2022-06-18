import { useCallback, useState, useEffect } from 'react'

export const useSideDrawer = (smallScreenButton, bigScreenButton) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    // watch window resizing to determine which type of New Page Button will be rendered
    const watchWidth = () => {
      setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
      window.addEventListener("resize", watchWidth)
      return () => {
        window.removeEventListener('resize', watchWidth)
      }
    }, [])
    
    // determine which button will be rendered depending on screen size
     const newPageButton = useCallback(() => {
        if (windowWidth > 768) {
            return smallScreenButton
        } else {
            return bigScreenButton
        }}, [bigScreenButton, smallScreenButton, windowWidth])
        
    // change drawerIsOpen state
    const openDrawerHandler = useCallback(() => {
        setDrawerIsOpen(true)
    }, [])
    const closeDrawerHandler = useCallback(() => {
        setDrawerIsOpen(false)
    }, [])



    return [drawerIsOpen, newPageButton, openDrawerHandler, closeDrawerHandler]
}