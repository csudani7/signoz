import { Button, Divider, Form, Input, Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { RefObject, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import TagInput from '../components/TagInput';
import { ActionType } from '../Layouts';
import PiplinesSearchSection from '../Layouts/PiplinesSearchSection';
import { PipelineColumn } from '.';
import { addPipelinefieldLists } from './config';
import { FormLabelStyle, ModalButtonWrapper, ModalTitle } from './styles';
import { getRecordIndex } from './utils';

function AddNewPipline({
	isActionType,
	setActionType,
	selectedRecord,
	pipelineDataSource,
	setPipelineDataSource,
	formRef,
	handleModalCancelAction,
}: AddNewPiplineProps): JSX.Element {
	const [form] = Form.useForm();
	const { t } = useTranslation('pipeline');
	const [count, setCount] = useState(3);
	const [tagsListData, setTagsListData] = useState<PipelineColumn['tags']>();

	const isEdit = useMemo(() => isActionType === 'edit-pipeline', [isActionType]);
	const isAdd = useMemo(() => isActionType === 'add-pipeline', [isActionType]);

	useEffect(() => {
		if (isEdit) {
			form.setFieldsValue({
				name: selectedRecord?.name,
				tags: selectedRecord?.tags,
			});
			setTagsListData(selectedRecord?.tags);
		} else {
			setTagsListData([]);
		}
	}, [form, isEdit, selectedRecord?.name, selectedRecord?.tags]);

	const onFinish = (values: PipelineColumn): void => {
		const operatorsData = Array({
			name: values.operators,
		});

		const newData = {
			orderid: count.toString(),
			key: uuid(),
			editedBy: '',
			filter: '',
			lastEdited: new Date().toDateString(),
			name: values.name,
			tags: tagsListData,
			operators: operatorsData,
		};

		if (isEdit) {
			const findRecordIndex = getRecordIndex(
				pipelineDataSource,
				selectedRecord,
				'name' as never,
			);
			const updatedPipelineData = {
				...pipelineDataSource[findRecordIndex],
				name: values.name,
				tags: tagsListData,
			};

			const tempData = pipelineDataSource?.map((data) =>
				data.name === selectedRecord?.name ? updatedPipelineData : data,
			);
			setPipelineDataSource(tempData as Array<PipelineColumn>);
			formRef?.current?.resetFields();
		} else {
			setTagsListData([]);
			setCount((prevState: number) => (prevState + 1) as number);
			setPipelineDataSource(
				(pre: PipelineColumn[]) => [...pre, newData] as PipelineColumn[],
			);
			formRef?.current?.resetFields();
		}
		setActionType(undefined);
	};

	const onCancelHandler = (): void => {
		setActionType(undefined);
		formRef?.current?.resetFields();
	};

	return (
		<Modal
			title={
				<ModalTitle level={4}>
					{isEdit
						? `${t('edit_pipeline')} : ${selectedRecord?.name}`
						: t('create_pipeline')}
				</ModalTitle>
			}
			centered
			open={isEdit || isAdd}
			width={800}
			footer={null}
			onCancel={onCancelHandler}
		>
			<Divider plain />
			<div style={{ marginTop: '1.563rem' }}>
				<span>{t('filter')}</span>
				<div style={{ marginTop: '0.313rem' }}>
					<PiplinesSearchSection />
				</div>
			</div>
			<Form
				form={form}
				layout="vertical"
				style={{ marginTop: '1.25rem' }}
				onFinish={onFinish}
				ref={formRef}
			>
				{addPipelinefieldLists.map((i) => {
					if (i.id === 3) {
						return (
							<Form.Item
								required={false}
								name={i.name}
								label={i.fieldName}
								key={i.id}
								rules={[
									{
										required: true,
									},
								]}
							>
								<Input.TextArea
									rows={3}
									name={i.fieldName}
									placeholder={
										isEdit
											? `This is a pipeline to edit ${selectedRecord?.name}`
											: i.placeholder
									}
								/>
							</Form.Item>
						);
					}
					if (i.id === 2) {
						return (
							<Form.Item
								required={false}
								label={<FormLabelStyle>{i.fieldName}</FormLabelStyle>}
								key={i.id}
								name={i.name}
							>
								<TagInput
									setTagsListData={setTagsListData}
									tagsListData={tagsListData as []}
									placeHolder={i.fieldName}
								/>
							</Form.Item>
						);
					}
					return (
						<Form.Item
							required={false}
							label={<FormLabelStyle>{i.fieldName}</FormLabelStyle>}
							key={i.id}
							rules={[
								{
									required: true,
								},
							]}
							name={i.name}
						>
							<Input name={i.fieldName} placeholder={i.placeholder} />
						</Form.Item>
					);
				})}
				<Divider plain />
				<Form.Item>
					<ModalButtonWrapper>
						<Button key="submit" type="primary" htmlType="submit">
							{isEdit ? t('update') : t('create')}
						</Button>
						<Button key="cancel" onClick={handleModalCancelAction}>
							{t('cancel')}
						</Button>
					</ModalButtonWrapper>
				</Form.Item>
			</Form>
		</Modal>
	);
}

interface AddNewPiplineProps {
	isActionType: string;
	setActionType: (actionType?: ActionType) => void;
	selectedRecord: PipelineColumn | undefined;
	pipelineDataSource: Array<PipelineColumn>;
	setPipelineDataSource: (
		value: React.SetStateAction<Array<PipelineColumn>>,
	) => void;
	formRef: RefObject<FormInstance>;
	handleModalCancelAction: VoidFunction;
}

export default AddNewPipline;
