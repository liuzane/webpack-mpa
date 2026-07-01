// 基础模块
import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// 第三方组件
import { Input, Form } from 'antd';

// 公共组件
import ComplexTable from '@/components/ComplexTable';


const EditableContext = React.createContext(null);


const EditableRow = ({ index, ...props }) => {
  const [ form ] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  rules,
  handleSave,
  ...restProps
}) => {
  const [ editing, setEditing ] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [ editing ]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={rules}
      >
        <Input ref={inputRef} onPressEnter={save}
onBlur={save}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    onSave: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSave = (row) => {
    const { onSave } = this.props;
    onSave && onSave(row);
  };

  render() {
    const { columns, ...restProps } = this.props;

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const newColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          rules: col.rules,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <ComplexTable
        components={components}
        rowClassName={() => 'editable-row'}
        columns={newColumns}
        {...restProps}
      />
    );
  }
}

export default EditableTable;