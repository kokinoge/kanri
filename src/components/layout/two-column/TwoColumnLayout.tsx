"use client"

import { ReactNode, useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import styles from "./TwoColumnLayout.module.css"

interface TwoColumnLayoutProps {
  leftColumn: ReactNode
  rightColumn: ReactNode
  leftColumnWidth?: string
  resizable?: boolean
}

export default function TwoColumnLayout({
  leftColumn,
  rightColumn,
  leftColumnWidth = "300px",
  resizable = true,
}: TwoColumnLayoutProps) {
  const [isLeftColumnVisible, setIsLeftColumnVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [leftWidth, setLeftWidth] = useState(leftColumnWidth)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsLeftColumnVisible(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleResize = (e: React.MouseEvent) => {
    if (!resizable) return

    const startX = e.clientX
    const startWidth = parseInt(leftWidth)

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + e.clientX - startX
      if (newWidth >= 200 && newWidth <= 600) {
        setLeftWidth(`${newWidth}px`)
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div className={styles.container}>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsLeftColumnVisible(!isLeftColumnVisible)}
          aria-label={isLeftColumnVisible ? "Close menu" : "Open menu"}
        >
          {isLeftColumnVisible ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Left column */}
      <div
        className={`${styles.leftColumn} ${
          isLeftColumnVisible ? styles.visible : styles.hidden
        }`}
        style={{ width: isMobile ? "100%" : leftWidth }}
      >
        {leftColumn}
      </div>

      {/* Resize handle */}
      {resizable && !isMobile && (
        <div
          className={styles.resizeHandle}
          onMouseDown={handleResize}
          role="separator"
          aria-label="Resize columns"
        />
      )}

      {/* Right column */}
      <div className={styles.rightColumn}>{rightColumn}</div>

      {/* Mobile overlay */}
      {isMobile && isLeftColumnVisible && (
        <div
          className={styles.overlay}
          onClick={() => setIsLeftColumnVisible(false)}
        />
      )}
    </div>
  )
}