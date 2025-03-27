// src/features/ui/Input/Input.jsx
import React from 'react';
import styles from './Input.module.css';

export const Input = ({ placeholder, type = "text" }) => <input className={styles.input} type={type} placeholder={placeholder} />;