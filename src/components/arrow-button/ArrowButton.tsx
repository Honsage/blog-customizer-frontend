import { useState } from 'react';
import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

export type ArrowButtonProps = {
	isFormOpen: boolean;
	/** Функция для обработки открытия/закрытия формы */
	toggleForm: () => void;
};

export const ArrowButton = ({ isFormOpen, toggleForm }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={toggleForm}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isFormOpen })}
		>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isFormOpen })}
			/>
		</div>
	);
};
