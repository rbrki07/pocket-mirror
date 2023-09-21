// @ts-check
import { decreaseCurrentZoomLevel, increaseCurrentZoomLevel } from './ZoomUtil'

describe('ZoomUtil tests', () => {
  it('should decrease the zoom level, if zoom level is above min zoom level', () => {
    const currentZoomLevel = 0.02
    const newZoomLevel = decreaseCurrentZoomLevel({ currentZoomLevel })
    expect(newZoomLevel).toBe(0.015)
  })

  it('should not decrease the zoom level, if zoom level is equal to min zoom level', () => {
    const currentZoomLevel = 0.0
    const newZoomLevel = decreaseCurrentZoomLevel({ currentZoomLevel })
    expect(newZoomLevel).toBe(0.0)
  })

  it('should increase the zoom level, if zoom level is below max zoom level', () => {
    const currentZoomLevel = 0.01
    const newZoomLevel = increaseCurrentZoomLevel({ currentZoomLevel })
    expect(newZoomLevel).toBe(0.015)
  })

  it('should not increase the zoom level, if zoom level is equal to max zoom level', () => {
    const currentZoomLevel = 0.025
    const newZoomLevel = increaseCurrentZoomLevel({ currentZoomLevel })
    expect(newZoomLevel).toBe(0.025)
  })
})
