import { Form } from 'antd';
import TagInput from 'container/PipelinePage/components/TagInput';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PipelineColumn } from '../..';
import { ProcessorFormField } from '../../AddNewProcessor/config';
import { FormLabelStyle } from '../styles';

function ProcessorTags({
	fieldData,
	setTagsListData,
	tagsListData,
}: ProcessorTagsProps): JSX.Element {
	const { t } = useTranslation('pipeline');

	return (
		<Form.Item
			required={false}
			label={<FormLabelStyle>{fieldData.fieldName}</FormLabelStyle>}
			key={fieldData.id}
			name={fieldData.name}
		>
			<TagInput
				setTagsListData={setTagsListData}
				tagsListData={tagsListData as []}
				placeHolder={t(fieldData.placeholder)}
			/>
		</Form.Item>
	);
}

interface ProcessorTagsProps {
	fieldData: ProcessorFormField;
	setTagsListData: (tags: Array<string>) => void;
	tagsListData: PipelineColumn['tags'];
}
export default ProcessorTags;