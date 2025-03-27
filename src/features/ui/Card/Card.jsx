// src/features/ui/Card/Card.jsx
import React from 'react';
import styles from './Card.module.css';

export const Card = ({ children }) => <div className={styles.card}>{children}</div>;
export const CardContent = ({ children }) => <div className={styles.cardContent}>{children}</div>;