import {AbsoluteFill, Series, useVideoConfig} from 'remotion';
import {ProgressBar} from './ProgressBar';
import {CodeTransition} from './CodeTransition';
import {HighlightedCode} from 'codehike/code';
import {ThemeColors, ThemeProvider} from './calculate-metadata/theme';
import {useMemo} from 'react';
import {RefreshOnCodeChange} from './ReloadOnCodeChange';

export type Props = {
	steps: HighlightedCode[] | null;
	themeColors: ThemeColors | null;
};

export const Main = ({steps, themeColors}: Props) => {
	if (!steps) {
		throw new Error('Steps are not defined');
	}

	const {durationInFrames} = useVideoConfig();
	const stepDuration = durationInFrames / steps.length;
	const transitionDuration = 30;

	if (!themeColors) {
		throw new Error('Theme colors are not defined');
	}

	const outerStyle: React.CSSProperties = useMemo(() => {
		return {
			backgroundColor: themeColors.background,
		};
	}, [themeColors]);

	const style: React.CSSProperties = useMemo(() => {
		return {
			padding: '84px 48px',
		};
	}, []);

	return (
		<ThemeProvider themeColors={themeColors}>
			<AbsoluteFill style={outerStyle}>
				<ProgressBar steps={steps} />
				<AbsoluteFill style={style}>
					<Series>
						{steps.map((step, index) => (
							<Series.Sequence
								key={index}
								layout="none"
								durationInFrames={stepDuration}
								name={step.meta}
							>
								<CodeTransition
									oldCode={steps[index - 1]}
									newCode={step}
									durationInFrames={transitionDuration}
								/>
							</Series.Sequence>
						))}
					</Series>
				</AbsoluteFill>
			</AbsoluteFill>
			<RefreshOnCodeChange />
		</ThemeProvider>
	);
};
