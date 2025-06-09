import { ReactNode } from 'react'
import styles from './ElementWrapper.module.css'
import { toKebabCase } from '../utils/helpers'

interface ElementWrapperProps {
  label: string
  tailwind: string
  children: ReactNode
}

export default function ElementWrapper({
  label,
  tailwind,
  children,
}: ElementWrapperProps) {
  const kebabCaseLabel = toKebabCase(label)
  return (
    <div
      className={`${kebabCaseLabel}-collapse element-wrapper ${styles['element-wrapper']} ${tailwind}`}
    >
      <p className={`collapse-btn ${styles['collapse-btn']}`}>collapse</p>
      <span className={styles.beforeLabel}>{label}</span>
      {children}
    </div>
  )
}
