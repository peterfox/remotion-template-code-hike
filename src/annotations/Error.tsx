import {InlineAnnotation, AnnotationHandler, InnerToken} from 'codehike/code';
import {interpolate, useCurrentFrame} from 'remotion';
import {useThemeColors} from '../calculate-metadata/theme';

export const errorInline: AnnotationHandler = {
	name: 'error',
	transform: (annotation: InlineAnnotation) => {
		const {query, lineNumber, data} = annotation;
		return [
			annotation,
			{
				name: 'error-message',
				query,
				fromLineNumber: lineNumber,
				toLineNumber: lineNumber,
				data,
			},
		];
	},
	Inline: ({children}) => (
		<span
			style={{
				// @ts-expect-error - React types
				'--decoration': 'underline wavy red',
			}}
		>
			{children}
		</span>
	),
	Token: (props) => {
		return (
			<InnerToken
				merge={props}
				style={{
					textDecoration: 'var(--decoration)',
				}}
			/>
		);
	},
};

export const errorMessage: AnnotationHandler = {
	name: 'error-message',
	Block: ({annotation, children}) => {
		const frame = useCurrentFrame();
		const opacity = interpolate(frame, [25, 35], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
		const themeColors = useThemeColors();

		return (
			<>
				{children}
				<div
					style={{
						opacity,
						borderLeft: '4px solid red',
						marginLeft: '-1rem',
						backgroundColor: themeColors.editor.lineHighlightBackground,
						padding: '1rem 2rem',
						marginTop: '0.5rem',
						whiteSpace: 'pre-wrap',
						color: themeColors.editor.foreground,
					}}
				>
					{annotation.data.children || annotation.query}
				</div>
			</>
		);
	},
};
