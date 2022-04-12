import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import createClass from 'create-react-class';

import TextFieldValidated, {
	ITextFieldValidatedProps,
} from './TextFieldValidated';

export default {
	title: 'Controls/TextFieldValidated',
	component: TextFieldValidated,
	parameters: {
		docs: {
			description: {
				component: TextFieldValidated.peek.description,
			},
		},
	},
} as Meta;

const style = {
	marginBottom: '10px',
};

export const Basic: Story<ITextFieldValidatedProps> = (args) => {
	return <TextFieldValidated {...args} />;
};

export const Debounced: Story<ITextFieldValidatedProps> = (args) => {
	const [value, setValue] = useState('');

	return (
		<div>
			<TextFieldValidated
				{...args}
				style={style}
				value={value}
				onChangeDebounced={(value) => setValue(value)}
				Error={value === 'foo' ? null : 'Please enter "foo"'}
			/>
		</div>
	);
};

export const ErrorTypes: Story<ITextFieldValidatedProps> = (args) => {
	const [value, setValue] = useState('');

	return (
		<div>
			<TextFieldValidated
				{...args}
				style={style}
				value={value}
				onChangeDebounced={() => {}}
				Error={'This is an error'}
			/>
			<TextFieldValidated
				{...args}
				style={style}
				value={value}
				onChangeDebounced={() => {}}
				Error={null}
				Info={'This is an info'}
			/>
			<TextFieldValidated
				{...args}
				style={style}
				value={value}
				onChangeDebounced={() => {}}
				Error={null}
				special={{
					borderColor: 'success',
					message: 'This is a special with `success` text and border',
					textColor: 'success',
				}}
			/>
			<TextFieldValidated
				{...args}
				style={style}
				value={value}
				onChangeDebounced={() => {}}
				Error={null}
				special={{
					borderColor: 'primary',
					message: 'This is a special in the style of an Info',
					textColor: 'info',
				}}
			/>
			<TextFieldValidated
				{...args}
				style={style}
				value={value}
				onChangeDebounced={() => {}}
				Error={null}
				special={{
					borderColor: 'success',
					message:
						'This is a disappearing special with `success` text and border',
					textColor: 'success',
					disappearing: true,
				}}
			/>
		</div>
	);
};
