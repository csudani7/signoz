import React from 'react';

import { ActionMode } from '../Layouts/Pipeline';
import { ModeAndConfigWrapper } from './styles';

function ModeAndConfiguration({
	isActionMode,
	verison,
}: ModeAndConfigurationType): JSX.Element {
	const actionMode = isActionMode === ActionMode.Editing;

	return (
		<ModeAndConfigWrapper>
			Mode: <span>{actionMode ? 'Editing' : 'Viewing'}</span>
			<div>Configuration Version: {verison}</div>
		</ModeAndConfigWrapper>
	);
}

export interface ModeAndConfigurationType {
	isActionMode: string;
	verison: string | number;
}

export default ModeAndConfiguration;
