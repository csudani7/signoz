type ProcessorType = {
	key: string;
	value: string;
	label: string;
	title?: string;
	disabled?: boolean;
};

export const processorTypes: Array<ProcessorType> = [
	{ key: 'grok_parser', value: 'grok_parser', label: 'Grok' },
	{ key: 'json_parser', value: 'json_parser', label: 'Json Parser' },
	{ key: 'regex_parser', value: 'regex_parser', label: 'Regex' },
	{ key: 'add', value: 'add', label: 'Add' },
	{ key: 'remove', value: 'remove', label: 'Remove' },
	{ key: 'trace_parser', value: 'trace_parser', label: 'Trace Parser' },
	// { key: 'retain', value: 'retain', label: 'Retain' }, @Chintan - Commented as per Nitya's suggestion
	{ key: 'move', value: 'move', label: 'Move' },
	{ key: 'copy', value: 'copy', label: 'Copy' },
];

export const DEFAULT_PROCESSOR_TYPE = processorTypes[0].value;

export type ProcessorFormField = {
	id: number;
	fieldName: string;
	placeholder: string;
	name: string;
	rules?: Array<{ [key: string]: boolean }>;
	initialValue?: string;
};

export const processorFields: { [key: string]: Array<ProcessorFormField> } = {
	grok_parser: [
		{
			id: 1,
			fieldName: 'Name of Grok Processor',
			placeholder: 'processor_name_placeholder',
			name: 'name',
		},
		{
			id: 2,
			fieldName: 'Pattern',
			placeholder: 'processor_pattern_placeholder',
			name: 'pattern',
		},
		{
			id: 3,
			fieldName: 'Grok Parse From',
			placeholder: 'processor_parsefrom_placeholder',
			name: 'parse_from', // optional
			rules: [],
			initialValue: 'body',
		},
		{
			id: 4,
			fieldName: 'Grok Parse To',
			placeholder: 'processor_parseto_placeholder',
			name: 'parse_to', // optional
			rules: [],
			initialValue: 'attributes',
		},
		{
			id: 5,
			fieldName: 'Grok On Error',
			placeholder: 'processor_onerror_placeholder',
			name: 'on_error', // optional
			rules: [],
			initialValue: 'send',
		},
	],
	json_parser: [
		{
			id: 1,
			fieldName: 'Name of Json Parser Processor',
			placeholder: 'processor_name_placeholder',
			name: 'name',
		},
		{
			id: 2,
			fieldName: 'Json Parse From',
			placeholder: 'processor_parsefrom_placeholder',
			name: 'parse_from',
			initialValue: 'body',
		},
		{
			id: 3,
			fieldName: 'Json Parse To',
			placeholder: 'processor_parseto_placeholder',
			name: 'parse_to',
			initialValue: 'attributes',
		},
	],
	regex_parser: [
		{
			id: 1,
			fieldName: 'Name of Regex Processor',
			placeholder: 'processor_name_placeholder',
			name: 'name',
		},
		{
			id: 2,
			fieldName: 'Define Regex',
			placeholder: 'processor_regex_placeholder',
			name: 'regex',
		},
		{
			id: 3,
			fieldName: 'Regex Parse From',
			placeholder: 'processor_parsefrom_placeholder',
			name: 'parse_from', // optional
			rules: [],
			initialValue: 'body',
		},
		{
			id: 4,
			fieldName: 'Regex Parse To',
			placeholder: 'processor_parseto_placeholder',
			name: 'parse_to', // optional
			rules: [],
			initialValue: 'attributes',
		},
		{
			id: 5,
			fieldName: 'Regex On Error',
			placeholder: 'processor_onerror_placeholder',
			name: 'on_error', // optional
			rules: [],
			initialValue: 'send',
		},
	],
	add: [
		{
			id: 1,
			fieldName: 'Name of Add Processor',
			placeholder: 'processor_name_placeholder',
			name: 'name',
		},
		{
			id: 2,
			fieldName: 'Field',
			placeholder: 'processor_field_placeholder',
			name: 'field',
		},
		{
			id: 3,
			fieldName: 'Value',
			placeholder: 'processor_value_placeholder',
			name: 'value',
		},
	],
	remove: [
		{
			id: 1,
			fieldName: 'Name of Remove Processor',
			placeholder: 'processor_name_placeholder',
			name: 'name',
		},
		{
			id: 2,
			fieldName: 'Field',
			placeholder: 'processor_field_placeholder',
			name: 'field',
		},
	],
	trace_parser: [
		{
			id: 1,
			fieldName: 'Name of Trace Parser Processor',
			placeholder: 'processor_name_placeholder',
			name: 'name',
		},
		{
			id: 2,
			fieldName: 'Trace Id Parce From',
			placeholder: 'processor_trace_id_placeholder',
			name: 'traceId',
		},
		{
			id: 3,
			fieldName: 'Span id Parse From',
			placeholder: 'processor_span_id_placeholder',
			name: 'spanId',
		},
		{
			id: 4,
			fieldName: 'Trace flags parse from',
			placeholder: 'processor_trace_flags_placeholder',
			name: 'traceFlags',
		},
	],
	retain: [
		{
			id: 1,
			fieldName: 'Name of Retain Processor',
			placeholder: 'processor_name_placeholder',
			name: 'name',
		},
		{
			id: 2,
			fieldName: 'Fields',
			placeholder: 'processor_fields_placeholder',
			name: 'fields',
		},
	],
	move: [
		{
			id: 1,
			fieldName: 'Name of Move Processor',
			placeholder: 'processor_name_placeholder',
			name: 'name',
		},
		{
			id: 2,
			fieldName: 'From',
			placeholder: 'processor_from_placeholder',
			name: 'from',
		},
		{
			id: 3,
			fieldName: 'To',
			placeholder: 'processor_to_placeholder',
			name: 'to',
		},
	],
	copy: [
		{
			id: 1,
			fieldName: 'Name of Copy Processor',
			placeholder: 'processor_name_placeholder',
			name: 'name',
		},
		{
			id: 2,
			fieldName: 'From',
			placeholder: 'processor_from_placeholder',
			name: 'from',
		},
		{
			id: 3,
			fieldName: 'To',
			placeholder: 'processor_to_placeholder',
			name: 'to',
		},
	],
};
