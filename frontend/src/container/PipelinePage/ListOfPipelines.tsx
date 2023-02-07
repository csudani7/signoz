import {
	CopyFilled,
	DeleteFilled,
	DownOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
	EyeFilled,
	HolderOutlined,
	PlusCircleOutlined,
	PlusOutlined,
	RightOutlined,
} from '@ant-design/icons';
import {
	Avatar,
	Button,
	Modal,
	Space,
	Switch,
	Table,
	Tag,
	Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import DraggableTableRow from 'components/DraggableTableRow';
import { themeColors } from 'constants/theme';
import React, { useCallback, useState } from 'react';
import update from 'react-addons-update';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';

import {
	iconStyle,
	modalFooterStyle,
	modalTitleStyle,
	sublistDataStyle,
} from './config';
import Pipline from './Pipeline';
import Processor from './Processor';
import {
	AlertContentWrapper,
	Container,
	ContainerHead,
	ModalFooterTitle,
} from './styles';
import { pipelineData } from './utils';

function ListOfPipelines({
	isActionType,
	setActionType,
}: {
	isActionType: string | undefined;
	setActionType: (b: string | undefined) => void;
}): JSX.Element {
	const [dataSource, setDataSource] = useState<Array<PipelineColumnType>>(
		pipelineData,
	);
	const [childDataSource, setChildDataSource] = useState<
		Array<SubPiplineColumsType>
	>();
	const [activeExpRow, setActiveExpRow] = React.useState<Array<string>>();
	const [selectedRecord, setSelectedRecord] = useState<string>('');
	const { t } = useTranslation(['common']);

	const [modal, contextHolder] = Modal.useModal();
	const { Text } = Typography;

	const handleAlert = useCallback(
		({
			title,
			descrition,
			buttontext,
			onCancelClick,
			onOkClick,
		}: {
			title: string;
			descrition: string;
			buttontext: string;
			onCancelClick?: () => void;
			onOkClick?: () => void;
		}) => {
			modal.confirm({
				title: (
					<Typography.Title level={1} style={modalTitleStyle}>
						{title}
					</Typography.Title>
				),
				icon: <ExclamationCircleOutlined />,
				content: <AlertContentWrapper>{descrition}</AlertContentWrapper>,
				okText: <Text>{buttontext}</Text>,
				cancelText: <Text>{t('cancel')}</Text>,
				onOk: onOkClick,
				onCancel: onCancelClick,
			});
		},
		[Text, modal, t],
	);

	const handlePipelineEditAction = (record: PipelineColumnType): void => {
		setActionType('edit-pipeline');
		setSelectedRecord(record.pipelineName);
	};

	const columns: ColumnsType<PipelineColumnType> = [
		{
			title: '',
			dataIndex: 'id',
			key: 'id',
			render: (i: number): JSX.Element => (
				<Avatar style={{ background: themeColors.navyBlue }} size="small">
					{i}
				</Avatar>
			),
		},
		{
			title: 'Pipeline Name',
			dataIndex: 'pipelineName',
			key: 'pipelineName',
		},
		{
			title: 'Filters',
			dataIndex: 'filter',
			key: 'filter',
		},
		{
			title: 'Tags',
			dataIndex: 'tags',
			key: 'tags',
			render: (value): React.ReactNode =>
				value?.map((tag: string) => (
					<Tag color="blue" key={tag}>
						{tag}
					</Tag>
				)),
		},
		{
			title: 'Last Edited',
			dataIndex: 'lastEdited',
			key: 'lastEdited',
		},
		{
			title: 'Edited By',
			dataIndex: 'editedBy',
			key: 'editedBy',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			render: (_value, record): JSX.Element => (
				<Space size="middle">
					<span>
						<EditOutlined
							style={iconStyle}
							onClick={(): void => handlePipelineEditAction(record)}
						/>
					</span>
					<span>
						<EyeFilled style={iconStyle} />
					</span>
					<span>
						<DeleteFilled
							onClick={(): void =>
								handleAlert({
									title: `${t('delete_pipeline')} : ${record.pipelineName}?`,
									descrition: t('delete_pipeline_description'),
									buttontext: t('delete'),
								})
							}
							style={iconStyle}
						/>
					</span>
				</Space>
			),
		},
		{
			title: '',
			dataIndex: 'action',
			key: 'action',
			render: (): JSX.Element => (
				<div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
					<span>
						<Switch />
					</span>
					<span style={{ cursor: 'move' }}>
						<HolderOutlined style={iconStyle} />
					</span>
				</div>
			),
		},
	];

	const components = {
		body: {
			row: DraggableTableRow,
		},
	};

	const moveRow = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const dragRow = dataSource[dragIndex];
			const updatedRow = update(dataSource, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragRow],
				],
			});

			if (dragRow) {
				handleAlert({
					title: t('reorder_pipeline'),
					descrition: t('reorder_pipeline_description'),
					buttontext: t('reorder'),
					onOkClick: (): void => setDataSource(updatedRow),
					onCancelClick: (): void => setDataSource(dataSource),
				});
			}
		},
		[dataSource, handleAlert, t],
	);

	const moveProcessorRow = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const dragRows = childDataSource?.[dragIndex];
			if (childDataSource) {
				const updatedRows = update(childDataSource, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragRows],
					],
				});
				if (dragRows) {
					handleAlert({
						title: t('reorder_pipeline'),
						descrition: t('reorder_pipeline_description'),
						buttontext: t('reorder'),
						onOkClick: (): void => setChildDataSource(updatedRows),
						onCancelClick: (): void => setChildDataSource(childDataSource),
					});
				}
			}
		},
		[childDataSource, handleAlert, t],
	);

	// eslint-disable-next-line react/no-unstable-nested-components
	function FooterData(): React.ReactElement {
		return (
			<div>
				<Button
					type="link"
					onClick={(): void => setActionType('add-pipeline')}
					style={modalFooterStyle}
					icon={<PlusOutlined />}
				>
					{t('add_new_pipeline')}
				</Button>
			</div>
		);
	}

	const handleProcessorEditAction = (record: string): void => {
		setActionType('edit-processor');
		setSelectedRecord(record);
	};

	const subcolumns: ColumnsType<SubPiplineColumsType> = [
		{
			title: '',
			dataIndex: 'id',
			key: 'id',
			render: (index: number): JSX.Element => (
				<Avatar style={sublistDataStyle} size="small">
					{index}
				</Avatar>
			),
		},
		{
			title: '',
			dataIndex: 'text',
			key: 'list',
			// eslint-disable-next-line sonarjs/no-identical-functions, @typescript-eslint/no-explicit-any
			render: (item: any): JSX.Element => (
				<div style={{ margin: '5px', padding: '5px' }}>{item}</div>
			),
		},
		{
			title: '',
			dataIndex: 'action',
			key: 'action',
			render: (_value, record): JSX.Element => (
				<div style={{ display: 'flex', gap: '16px' }}>
					<span key="list-edit">
						<EditOutlined
							style={iconStyle}
							onClick={(): void => handleProcessorEditAction(record.text)}
						/>
					</span>
					<span key="list-view">
						<DeleteFilled style={iconStyle} />
					</span>
					<span key="list-copy">
						<CopyFilled style={iconStyle} />
					</span>
				</div>
			),
		},
		{
			title: '',
			dataIndex: 'action',
			key: 'action',
			// eslint-disable-next-line sonarjs/no-identical-functions
			render: (): JSX.Element => (
				<div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
					<span>
						<Switch />
					</span>
					<span style={{ cursor: 'move' }}>
						<HolderOutlined style={iconStyle} />
					</span>
				</div>
			),
		},
	];

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const expandedRow = (): JSX.Element => (
		<ContainerHead>
			<DndProvider backend={HTML5Backend}>
				<Table
					showHeader={false}
					columns={subcolumns}
					components={components}
					dataSource={childDataSource}
					pagination={false}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					onRow={(_record, index): React.HTMLAttributes<any> => {
						const attr = {
							index,
							moveRow: moveProcessorRow,
						};
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						return attr as React.HTMLAttributes<any>;
					}}
				/>
				<Button
					type="link"
					style={modalFooterStyle}
					onClick={(): void => setActionType('add-processor')}
				>
					<PlusCircleOutlined />
					<ModalFooterTitle>{t('add_new_processor')}</ModalFooterTitle>
				</Button>
			</DndProvider>
		</ContainerHead>
	);

	return (
		<div>
			{contextHolder}
			<Pipline
				isActionType={isActionType}
				setActionType={setActionType}
				selectedRecord={selectedRecord}
			/>
			<Processor
				isActionType={isActionType}
				setActionType={setActionType}
				selectedRecord={selectedRecord}
			/>
			<Container>
				<DndProvider backend={HTML5Backend}>
					<Table
						columns={columns}
						expandedRowRender={expandedRow}
						expandable={{
							// eslint-disable-next-line react/no-unstable-nested-components
							expandIcon: ({ expanded, onExpand, record }): JSX.Element =>
								expanded ? (
									<DownOutlined onClick={(e): void => onExpand(record, e)} />
								) : (
									<RightOutlined onClick={(e): void => onExpand(record, e)} />
								),
							expandedRowKeys: activeExpRow,
							onExpand: (expanded, record): void => {
								const keys = [];
								if (expanded) {
									keys.push(record.id);
								}
								setActiveExpRow(keys);
								const processorData = record.description.map((item, index): {
									id: number;
									text: string;
								} => ({
									id: index,
									text: item,
								}));
								setChildDataSource(processorData);
							},
						}}
						components={components}
						dataSource={dataSource.map((item) => ({
							...item,
							key: item.id,
						}))}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						onRow={(_record, index): React.HTMLAttributes<any> => {
							const attr = {
								index,
								moveRow,
							};
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							return attr as React.HTMLAttributes<any>;
						}}
						// eslint-disable-next-line react/no-unstable-nested-components
						footer={(): React.ReactElement => <FooterData />}
					/>
				</DndProvider>
			</Container>
		</div>
	);
}

export interface PipelineColumnType {
	id: string;
	key: number | string;
	pipelineName: string;
	filter: string;
	tags: Array<string>;
	lastEdited: string;
	editedBy: string;
	description: Array<string>;
}

export interface SubPiplineColumsType {
	id: number;
	text: string;
}
export default ListOfPipelines;
