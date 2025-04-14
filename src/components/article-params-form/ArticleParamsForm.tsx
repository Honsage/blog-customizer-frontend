import React, { useState, useRef, SyntheticEvent } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Spacing } from '../spacing';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Select } from '../select';
import { Text } from '../text';
import { useClose } from '../close/useClose';
import { fontFamilyOptions, fontSizeOptions, fontColors,
		 backgroundColors, contentWidthArr, OptionType,
		 ArticleStateType, defaultArticleState
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export type FormProps = {
	onChange: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({ onChange }: FormProps) => {
	const defaultStateForm = useRef<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement | null>(null);

	const [isFormOpen, setFormOpen] = useState<boolean>(false);

	const [fontFamily, setFontFamily] = useState<OptionType>(defaultStateForm.current.fontFamilyOption);
	const [fontSize, setFontSize] = useState<OptionType>(defaultStateForm.current.fontSizeOption);
	const [fontColor, setFontColor] = useState<OptionType>(defaultStateForm.current.fontColor);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(defaultStateForm.current.backgroundColor);
	const [contentWidth, setContentWidth] = useState<OptionType>(defaultStateForm.current.contentWidth);

	useClose({
		isOpen: isFormOpen,
		onClose: () => setFormOpen(false),
		rootRef: asideRef
	});

	const toggleFormVisibility = () => {
		setFormOpen((st) => !st);
	};

	function changer(func: React.Dispatch<React.SetStateAction<OptionType>>) {
		return (option: OptionType) => {
			func(option);
		}
	}

	const changeFontFamily = changer(setFontFamily);
	const changeFontSize = changer(setFontSize);
	const changeFontColor = changer(setFontColor);
	const changeBackgroundColor = changer(setBackgroundColor);
	const changeContentWidth = changer(setContentWidth);

	const handleOnSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		onChange({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth
		});
	};

	const handleOnReset = () => {
		onChange(defaultStateForm.current);

		setFontFamily(defaultStateForm.current.fontFamilyOption);
		setFontSize(defaultStateForm.current.fontSizeOption);
		setFontColor(defaultStateForm.current.fontColor);
		setBackgroundColor(defaultStateForm.current.backgroundColor);
		setContentWidth(defaultStateForm.current.contentWidth);
	};

	return (
		<div ref={asideRef}>
			<ArrowButton toggleForm={toggleFormVisibility} isFormOpen={isFormOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen
				})}>
				<form className={styles.form} onSubmit={handleOnSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Spacing size={50} />
					<Select
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={changeFontFamily}
						title='шрифт'
					/>
					<Spacing size={50} />
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={changeFontSize}
						title='размер шрифта'
					/>
					<Spacing size={50} />
					<Select
						options={fontColors}
						selected={fontColor}
						onChange={changeFontColor}
						title='цвет шрифта'
					/>
					<Spacing size={50} />
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						onChange={changeBackgroundColor}
						title='цвет фона'
					/>
					<Spacing size={50} />
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={changeContentWidth}
						title='ширина контента'
					/>
					<Spacing size={207} />
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={handleOnReset}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
