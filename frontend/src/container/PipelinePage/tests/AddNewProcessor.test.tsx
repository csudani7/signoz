import { render } from '@testing-library/react';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import i18n from 'ReactI18';
import store from 'store';

import { pipelineMockData } from '../mocks/pipeline';
import AddNewProcessor from '../PipelineListsView/AddNewProcessor';
import { matchMedia } from './AddNewPipeline.test';

beforeAll(() => {
	matchMedia();
});

const selectedProcessorData = {
	id: '1',
	orderId: 1,
	type: 'grok',
	name: 'grok use common',
	output: 'grokusecommon',
};
describe('PipelinePage container test', () => {
	it('should render AddNewProcessor section', () => {
		const setActionType = jest.fn();
		const isActionType = 'add-processor';

		const { asFragment } = render(
			<MemoryRouter>
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<AddNewProcessor
							isActionType={isActionType}
							setActionType={setActionType}
							selectedProcessorData={selectedProcessorData}
							setShowSaveButton={jest.fn()}
							expandedPipelineData={pipelineMockData[0]}
							setExpandedPipelineData={jest.fn()}
						/>
					</I18nextProvider>
				</Provider>
			</MemoryRouter>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
