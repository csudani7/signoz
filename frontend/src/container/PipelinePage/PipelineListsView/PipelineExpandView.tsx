import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useIsDarkMode } from 'hooks/useDarkMode';
import React, { useCallback } from 'react';
import update from 'react-addons-update';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';

import { tableComponents } from '../config';
import { ActionType } from '../Layouts';
import { ModalFooterTitle } from '../styles';
import { AlertMessage, SubPiplineColums } from '.';
import {
	CopyFilledIcon,
	FooterButton,
	IconListStyle,
	ListDataStyle,
	ProcessorIndexIcon,
	SmallDeleteFilledIcon,
	SmallEditOutlinedIcon,
	StyledTable,
} from './styles';
import { getElementFromArray } from './utils';

function PipelineExpandView({
	dragActionHandler,
	handleAlert,
	processorDataSource,
	setProcessorDataSource,
	setActionType,
	handleProcessorEditAction,
}: PipelineExpandViewProps): JSX.Element {
	const { t } = useTranslation(['pipeline']);
	const isDarkMode = useIsDarkMode();

	const handleDelete = (record: SubPiplineColums) => (): void => {
		const findElement = getElementFromArray(processorDataSource, record, 'id');
		setProcessorDataSource(findElement);
	};

	const handleProcessorDeleteAction = (record: SubPiplineColums) => (): void => {
		handleAlert({
			title: `${t('delete_processor')} : ${record.text}?`,
			descrition: t('delete_processor_description'),
			buttontext: t('delete'),
			onOkClick: handleDelete(record),
		});
	};

	const subcolumns: ColumnsType<SubPiplineColums> = [
		{
			title: '',
			dataIndex: 'id',
			key: 'id',
			width: 30,
			align: 'right',
			render: (index: number): JSX.Element => (
				<ProcessorIndexIcon size="small">{index + 1}</ProcessorIndexIcon>
			),
		},
		{
			title: '',
			dataIndex: 'text',
			key: 'list',
			width: 10,
			render: (item: string): JSX.Element => <ListDataStyle>{item}</ListDataStyle>,
		},
		{
			title: '',
			dataIndex: 'action',
			key: 'action',
			width: 10,
			render: (_value, record): JSX.Element => (
				<IconListStyle>
					<span key="list-edit">
						<SmallEditOutlinedIcon onClick={handleProcessorEditAction(record)} />
					</span>
					<span key="list-view">
						<SmallDeleteFilledIcon onClick={handleProcessorDeleteAction(record)} />
					</span>
					<span key="list-copy">
						<CopyFilledIcon />
					</span>
				</IconListStyle>
			),
		},
		{
			title: '',
			dataIndex: 'dragAction',
			key: 'drag-action',
			width: 10,
			render: dragActionHandler,
		},
	];

	const moveProcessorRow = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const rawData = processorDataSource;
			const dragRows = processorDataSource?.[dragIndex];
			if (processorDataSource) {
				const updatedRows = update(processorDataSource, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragRows],
					],
				});
				if (dragRows) {
					handleAlert({
						title: t('reorder_processor'),
						descrition: t('reorder_processor_description'),
						buttontext: t('reorder'),
						onOkClick: (): void => setProcessorDataSource(updatedRows),
						onCancelClick: (): void => setProcessorDataSource(rawData),
					});
				}
			}
		},
		[processorDataSource, handleAlert, setProcessorDataSource, t],
	);

	const onClickHandler = (): void => {
		setActionType(ActionType.AddProcessor);
	};

	const footer = (): JSX.Element => (
		<FooterButton type="link" onClick={onClickHandler}>
			<PlusCircleOutlined />
			<ModalFooterTitle>{t('add_new_processor')}</ModalFooterTitle>
		</FooterButton>
	);

	return (
		<DndProvider backend={HTML5Backend}>
			<StyledTable
				isDarkMode={isDarkMode}
				showHeader={false}
				columns={subcolumns}
				size="small"
				components={tableComponents}
				dataSource={processorDataSource}
				pagination={false}
				onRow={(
					_record: SubPiplineColums,
					index?: number,
				): React.HTMLAttributes<unknown> => {
					const attr = {
						index,
						moveRow: moveProcessorRow,
					};
					return attr as React.HTMLAttributes<unknown>;
				}}
				footer={footer}
			/>
		</DndProvider>
	);
}

interface PipelineExpandViewProps {
	dragActionHandler: () => JSX.Element;
	handleAlert: (props: AlertMessage) => void;
	processorDataSource: Array<SubPiplineColums>;
	setProcessorDataSource: (value: Array<SubPiplineColums> | undefined) => void;
	setActionType: (actionType?: ActionType) => void;
	handleProcessorEditAction: (record: SubPiplineColums) => () => void;
}

export default PipelineExpandView;
