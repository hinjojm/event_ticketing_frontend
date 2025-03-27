// src/features/ui/Select/Select.jsx
import React from 'react';
import styles from './Select.module.css';

export const Select = ({ children }) => <select className={styles.select}>{children}</select>;
export const SelectTrigger = ({ children }) => <div className={styles.selectTrigger}>{children}</div>;
export const SelectValue = ({ children }) => <div className={styles.selectValue}>{children}</div>;
export const SelectContent = ({ children }) => <div className={styles.selectContent}>{children}</div>;
export const SelectItem = ({ children }) => <div className={styles.selectItem}>{children}</div>;