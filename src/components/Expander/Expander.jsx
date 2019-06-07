import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	getFirst,
	findTypes,
	omitProps,
} from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Collapsible from '../Collapsible/Collapsible';
import * as reducers from './Expander.reducers';

const cx = lucidClassNames.bind('&-Expander');

const { any, bool, func, node, object, oneOf, string } = PropTypes;

const Expander = createClass({
	displayName: 'Expander',

	statics: {
		peek: {
			description: `
				This is a container that provides a toggle that controls when the
				content is shown.
			`,
			categories: ['layout'],
			madeFrom: ['ChevronIcon'],
		},
	},

	components: {
		Label: createClass({
			displayName: 'Expander.Label',
			statics: {
				peek: {
					description: `
						Renders a \`<span>\` to be shown next to the expander icon.
					`,
				},
			},
			propName: 'Label',
			propTypes: {
				children: node`
					Used to identify the purpose of this switch to the user -- can be any
					renderable content.
				`,
			},
		}),
		AdditionalLabelContent: createClass({
			displayName: 'Expander.AdditionalLabelContent',
			statics: {
				peek: {
					description: `
						Renders a \`<span>\` to be shown next to the expander label.
					`,
				},
			},
			propName: 'AdditionalLabelContent',
			propTypes: {
				children: node`
					Used to display additional information or/and actions next to expander label.
				`,
			},
		}),
	},

	reducers,

	propTypes: {
		children: node`
			Expandable content.
		`,

		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		isExpanded: bool`
			Indicates that the component is in the "expanded" state when true and in
			the "unexpanded" state when false.
		`,

		onToggle: func`
			Called when the user clicks on the component's header.  Signature:
			\`(isExpanded, { event, props }) => {}\`
		`,

		style: object`
			Passed through to the root element.
		`,

		Label: any`
			Child element whose children represents content to be shown next to the
			expander icon.
		`,

		AdditionalLabelContent: node`
			Child element whose children respresent content to be shown inside
			Expander.Label and to the right of it
		`,

		kind: oneOf(['simple', 'highlighted'])`
			Renders different variants of Expander. 'simple' is default.
			'highlighted' is more prominant.
		`,
	},

	getDefaultProps() {
		return {
			isExpanded: false,
			onToggle: _.noop,
			kind: 'simple',
		};
	},

	componentWillReceiveProps(nextProps) {
		const currentLabel = _.get(
			getFirst(this.props, Expander.Label),
			'props.children',
			null
		);
		const nextLabel = _.get(
			getFirst(nextProps, Expander.Label),
			'props.children',
			null
		);

		if (currentLabel !== nextLabel) {
			this._labelKey++;
		}
	},

	componentWillMount() {
		this._labelKey = 0;
	},

	render() {
		const {
			children,
			className,
			isExpanded,
			style,
			kind,
			...passThroughs
		} = this.props;

		const labelChildProp = _.first(
			_.map(findTypes(this.props, Expander.Label), 'props')
		);

		const additionalLabelContentChildProp = _.first(
			_.map(findTypes(this.props, Expander.AdditionalLabelContent), 'props')
		);

		return (
			<div
				{...omitProps(passThroughs, Expander)}
				className={cx(
					'&',
					{
						'&-is-expanded': isExpanded,
						'&-kind-highlighted': kind === 'highlighted',
					},
					className
				)}
				style={style}
			>
				<header className={cx('&-header')}>
					<div className={cx('&-header-toggle')} onClick={this.handleToggle}>
						<span className={cx('&-icon')}>
							<ChevronIcon direction={isExpanded ? 'up' : 'down'} />
						</span>
						{labelChildProp && (
							<span className={cx('&-text')}>{labelChildProp.children}</span>
						)}
					</div>
					{additionalLabelContentChildProp && (
						<div className={cx('&-additional-content')}>
							{additionalLabelContentChildProp.children}
						</div>
					)}
				</header>
				<Collapsible
					isExpanded={isExpanded}
					rootType='section'
					className={cx('&-content')}
				>
					{children}
				</Collapsible>
			</div>
		);
	},

	handleToggle(event) {
		this.props.onToggle(!this.props.isExpanded, {
			event,
			props: this.props,
		});
	},
});

export default buildHybridComponent(Expander);
export { Expander as ExpanderDumb };
