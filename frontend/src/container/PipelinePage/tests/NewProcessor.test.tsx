import { render } from '@testing-library/react';
import { FormInstance } from 'antd';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import i18n from 'ReactI18';
import store from 'store';

import AddNewProcessor from '../PipelineListsView/AddNewProcessor';

beforeAll(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: jest.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(),
			removeListener: jest.fn(),
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		})),
	});
});

const data = {
	id: 1,
	text: 'some text',
};

describe('PipelinePage', () => {
	it('should render AddNewProcessor', () => {
		const ref = React.createRef<FormInstance>();
		const setActionType = jest.fn();
		const setProcessorDataSource = jest.fn();
		const handleModalCancelAction = jest.fn();
		const selectedProcessorData = data;
		const isActionType = 'add-processor';

		const { asFragment } = render(
			<MemoryRouter>
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<AddNewProcessor
							isActionType={isActionType}
							setActionType={setActionType}
							selectedProcessorData={selectedProcessorData}
							processorDataSource={[]}
							setProcessorDataSource={setProcessorDataSource}
							formRef={ref}
							handleModalCancelAction={handleModalCancelAction}
						/>
					</I18nextProvider>
				</Provider>
			</MemoryRouter>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
